import cors from 'fastify-cors';
import compress from 'fastify-compress';
import middie from 'middie';
import multipart from 'fastify-multipart';

import { Config } from 'cross-cutting';
import { AppServer } from 'drivers/rest-api/server';

export function registerPlugins(server: AppServer, config: Config): AppServer {
  let origin: Array<RegExp | string> | string = [];
  if (config.isProd) {
    origin.push(/\.edustack\.ai$/);
    origin.push(/localhost:*/);
  } else {
    origin = '*';
  }
  server.register(cors, { origin });
  server.register(middie);
  server.register(multipart);

  server.register(compress, { global: true });

  return server;
}
