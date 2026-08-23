export const config = { runtime: "edge" };
export default function (req: Request) {
  return new Response("pong");
}
