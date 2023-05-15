import createBareServer from '@tomphttp/bare-server-node';
import { fileURLToPath } from "url";
import { createServer as createHttpsServer } from "node:https";
import { createServer as createHttpServer } from "node:http";
import { readFileSync, existsSync } from "node:fs";
import serveStatic from "serve-static";

const bare = createBareServer("/bare/");
const serve = serveStatic(fileURLToPath(new URL("./static/", import.meta.url)), { fallthrough: false });
var server, PORT;
if(existsSync("key.pem") && existsSync("cert.pem")) {
  server = createHttpsServer({
    key: readFileSync("key.pem"),
    cert: readFileSync("cert.pem")
  });
  PORT = 443;
} else { server = createHttpServer(); PORT = (process.env.PORT || 8080);}

server.on("request", (req, res) => {
  if(bare.shouldRoute(req)) return bare.routeRequest(req, res);
    serve(req, res, (err) => {
      res.writeHead(err?.statusCode || 500, null, {
        "Content-Type": "text/plain",
      });
      res.end('Error')
    })
});

server.on("upgrade", (req, socket, head) => {
  if(bare.shouldRoute(req, socket, head)) bare.routeUpgrade(req, socket, head); else socket.end();
});

server.on('listening', () => {
  const addr = server.address();

  console.log(`Server running on port ${addr.port}`)
  console.log('');
  console.log('You can now view it in your browser.')
  console.log(`Local: http://${addr.family === 'IPv6' ? `[${addr.address}]` : addr.address}:${addr.port}`);
  try { console.log(`On Your Network: http://${address.ip()}:${addr.port}`); } catch (err) {/* Can't find LAN interface */};
  if(process.env.REPL_SLUG && process.env.REPL_OWNER) console.log(`Replit: https://${process.env.REPL_SLUG}.${process.env.REPL_OWNER}.repl.co`);
});

server.listen({ port: PORT })