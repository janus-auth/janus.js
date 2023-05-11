// service/src/keychain.mts
import { subtle } from "node:crypto";
var keychainFactory = async () => {
  const ecdsa = await subtle.generateKey(
    {
      name: "ECDSA",
      namedCurve: "P-384"
    },
    false,
    ["sign", "verify"]
  );
  return {
    ecdsa
  };
};

// routes/hello/route.mts
var helloRoute = {
  method: "GET",
  path: "/",
  handler: async (stream, headers) => {
    stream.respond({
      "content-type": "text/html; charset=utf-8",
      ":status": 200
    });
    stream.end("<h1>Hello World</h1>");
  }
};

// routes/system/canary/canary.handler.mts
var canaryHandlerFactory = (keychain2) => {
  return async (stream, headers) => {
    stream.respond({
      "content-type": "application/json; charset=utf-8",
      ":status": 200
    });
    console.log({ keychain: keychain2 });
    stream.end("<h1>Canary</h1>");
  };
};

// routes/system/canary/canary.route.mts
var canaryRouteFactory = (keychain2) => {
  const canaryHandler = canaryHandlerFactory(keychain2);
  return {
    method: "GET",
    path: "/canary",
    handler: canaryHandler
  };
};

// libs/router/src/notFound.route.mts
var notFoundRoute = {
  method: "GET",
  path: "*",
  handler: async (stream, headers) => {
    stream.respond({
      "content-type": "text/html; charset=utf-8",
      ":status": 404
    });
    stream.end("<h1>Route not found</h1>");
  }
};

// libs/router/src/factory.mts
var routerFactory = (routes2, notFoundRoute2 = notFoundRoute) => {
  const routerMap = /* @__PURE__ */ new Map();
  for (const route of routes2) {
    routerMap.set(route.path, route);
  }
  return async (stream, headers) => {
    const path = headers[":path"]?.split("?")[0] ?? "/";
    const route = routerMap.get(path) ?? notFoundRoute2;
    return await route.handler(stream, headers);
  };
};

// service/src/routes.mts
var keychain = await keychainFactory();
var canaryRoute = await canaryRouteFactory(keychain);
var routes = [helloRoute, canaryRoute];
var routeHandler = routerFactory(routes);

// service/src/index.mts
import { readFile } from "node:fs/promises";
import { createSecureServer, createServer } from "node:http2";
import { env } from "node:process";
var isProd = env.NODE_ENV === "production";
var port = Number(env.PORT) || 8443;
var server = isProd ? createServer() : createSecureServer({
  key: await readFile("localhost-privkey.pem"),
  cert: await readFile("localhost-cert.pem")
});
server.on("error", (err) => console.error(err));
server.on("stream", async (stream, headers) => {
  await routeHandler(stream, headers);
});
server.listen(port);
