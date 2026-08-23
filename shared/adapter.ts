export async function runWithAdapter(req: any, res: any, handler: (req: Request) => Response | Promise<Response>) {
  if (req instanceof Request || (req.url && req.headers && typeof req.text === "function")) {
    return handler(req);
  }

  const protocol = req.headers["x-forwarded-proto"] || "https";
  const host = req.headers["x-forwarded-host"] || req.headers.host || "localhost";
  const url = `${protocol}://${host}${req.url}`;
  
  const headers = new Headers();
  for (const [key, value] of Object.entries(req.headers)) {
    if (Array.isArray(value)) {
      value.forEach(v => headers.append(key, v));
    } else if (value) {
      headers.append(key, value as string);
    }
  }

  const webReq = new Request(url, {
    method: req.method,
    headers,
  });

  const webRes = await handler(webReq);
  
  webRes.headers.forEach((value, key) => {
    res.setHeader(key, value);
  });
  res.statusCode = webRes.status;
  
  if (webRes.body) {
    const reader = webRes.body.getReader();
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      res.write(value);
    }
  }
  res.end();
}
