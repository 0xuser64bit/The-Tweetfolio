import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import {
  API_RESOURCES,
  ID_PARAM,
  RESOURCE_PARAM,
  apiPathnameFor,
  handleApiRequest,
} from "../shared/api";
import { projects } from "../shared/content";
import { ERROR_CODES, openapi } from "../shared/openapi";
import { API_BASE, ORIGIN, PAGES, absolute } from "../shared/site";

const spec = openapi as unknown as {
  openapi: string;
  info: Record<string, any>;
  servers: { url: string }[];
  paths: Record<string, Record<string, any>>;
  components: { schemas: Record<string, any> };
};

const paths = Object.keys(spec.paths);

const vercelConfig = JSON.parse(readFileSync("vercel.json", "utf8")) as {
  routes: { src: string; dest?: string; has?: any[] }[];
  rewrites: { source: string; destination: string }[];
  headers: { source: string; headers: { key: string; value: string }[] }[];
};

describe("document shape", () => {
  test("declares OpenAPI 3.1", () => {
    expect(spec.openapi).toBe("3.1.0");
  });

  test("carries the metadata an agent needs to use the API", () => {
    expect(spec.info.title).toBeString();
    expect(spec.info.version).toMatch(/^\d+\.\d+\.\d+$/);
    expect(spec.info.description).toContain("Accept: text/markdown");
    expect(spec.info.contact.url).toBe(ORIGIN);
    expect(spec.servers[0].url).toBe(ORIGIN);
  });

  test("is serialisable and re-parses identically", () => {
    expect(JSON.parse(JSON.stringify(spec))).toEqual(
      JSON.parse(JSON.stringify(spec)),
    );
  });

  test("every operation has a unique operationId and a tag", () => {
    const ids = new Set<string>();
    for (const [path, methods] of Object.entries(spec.paths)) {
      for (const [method, operation] of Object.entries(methods)) {
        expect(operation.operationId, `${method} ${path}`).toBeString();
        expect(ids.has(operation.operationId)).toBe(false);
        ids.add(operation.operationId);
        expect(operation.tags.length).toBeGreaterThan(0);
        expect(operation.summary).toBeString();
      }
    }
  });

  test("only documents read methods, matching the read-only API", () => {
    for (const methods of Object.values(spec.paths)) {
      expect(Object.keys(methods)).toEqual(["get"]);
    }
  });

  test("every $ref resolves to a defined schema", () => {
    const refs = [
      ...JSON.stringify(spec).matchAll(/"#\/components\/schemas\/(\w+)"/g),
    ].map((match) => match[1]);
    expect(refs.length).toBeGreaterThan(0);
    for (const ref of new Set(refs)) {
      expect(spec.components.schemas[ref], ref).toBeDefined();
    }
  });

  test("no schema is defined but unused", () => {
    const body = JSON.stringify(spec);
    for (const name of Object.keys(spec.components.schemas)) {
      expect(body, name).toContain(`#/components/schemas/${name}`);
    }
  });
});

describe("error contract", () => {
  test("ErrorResponse enumerates the codes the code can emit", () => {
    const schema = spec.components.schemas.ErrorResponse;
    expect(schema.properties.error.properties.code.enum).toEqual([
      ...ERROR_CODES,
    ]);
    expect(schema.properties.error.required).toEqual([
      "code",
      "status",
      "message",
      "hint",
      "documentation",
    ]);
  });

  test("every operation documents 405 and 406 with the JSON envelope", () => {
    for (const [path, methods] of Object.entries(spec.paths)) {
      for (const operation of Object.values(methods)) {
        for (const status of ["405", "406"]) {
          const response = operation.responses[status];
          expect(response, `${status} on ${path}`).toBeDefined();
          expect(response.content["application/json"].schema.$ref).toBe(
            "#/components/schemas/ErrorResponse",
          );
        }
      }
    }
  });

  test("documented error examples validate against ErrorResponse", () => {
    const required =
      spec.components.schemas.ErrorResponse.properties.error.required;

    for (const methods of Object.values(spec.paths)) {
      for (const operation of Object.values(methods)) {
        for (const [status, response] of Object.entries<any>(
          operation.responses,
        )) {
          const example = response.content?.["application/json"]?.example;
          if (!example) continue;
          for (const field of required) {
            expect(example.error[field], `${status}.${field}`).toBeDefined();
          }
          expect(example.error.status).toBe(Number(status));
          expect(ERROR_CODES).toContain(example.error.code);
        }
      }
    }
  });
});

describe("spec matches the implementation", () => {
  test("every documented path is routable and returns a 2xx", async () => {
    for (const path of paths) {
      const concrete = path.replace("{slug}", projects[0].slug);
      const segments = concrete
        .replace(API_BASE, "")
        .split("/")
        .filter(Boolean);

      const url = new URL("/api/v1", ORIGIN);
      if (segments[0]) url.searchParams.set(RESOURCE_PARAM, segments[0]);
      if (segments[1]) url.searchParams.set(ID_PARAM, segments[1]);

      const request = new Request(url);
      const response = handleApiRequest(request, apiPathnameFor(request));
      expect(response.status, concrete).toBe(200);
      await response.json();
    }
  });

  test("every implemented resource is documented", () => {
    expect(paths).toContain(API_BASE);
    for (const resource of API_RESOURCES) {
      expect(paths, resource).toContain(`${API_BASE}/${resource}`);
    }
  });

  test("no documented path is missing from the implementation", () => {
    const implemented = new Set([
      API_BASE,
      ...API_RESOURCES.map((resource) => `${API_BASE}/${resource}`),
      `${API_BASE}/projects/{slug}`,
    ]);
    for (const path of paths) expect(implemented, path).toContain(path);
  });

  test("the documented slug pattern matches every real slug", () => {
    const pattern = new RegExp(
      spec.paths[`${API_BASE}/projects/{slug}`].get.parameters[0].schema
        .pattern,
    );
    for (const project of projects) {
      expect(pattern.test(project.slug), project.slug).toBe(true);
    }
  });

  test("the documented example slug exists", () => {
    const example =
      spec.paths[`${API_BASE}/projects/{slug}`].get.parameters[0].example;
    expect(projects.map((project) => project.slug)).toContain(example);
  });
});

describe("the spec is discoverable", () => {
  test("at /openapi.json, with a JSON content type and CORS", () => {
    const entry = vercelConfig.headers.find(
      (header) => header.source === "/openapi.json",
    );
    expect(entry).toBeDefined();

    const keys = Object.fromEntries(
      entry!.headers.map(({ key, value }) => [key, value]),
    );
    expect(keys["Content-Type"]).toBe("application/json; charset=utf-8");
    expect(keys["Access-Control-Allow-Origin"]).toBe("*");
  });

  test("from the API index, llms.txt, and every HTML page", () => {
    const request = new Request(`${ORIGIN}/api/v1`);
    const index = handleApiRequest(request, apiPathnameFor(request));
    expect(index.status).toBe(200);

    for (const { path } of PAGES) {
      const entry = vercelConfig.headers.find(
        (header) => header.source === path,
      );
      const link = entry?.headers.find((header) => header.key === "Link");
      expect(link?.value, path).toContain("/openapi.json");
      expect(link?.value, path).toContain('rel="service-desc"');
    }
  });

  test("as an absolute URL in the error envelope", () => {
    expect(absolute("/openapi.json")).toBe(`${ORIGIN}/openapi.json`);
  });
});
