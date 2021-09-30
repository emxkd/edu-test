import { AppServer } from 'drivers/rest-api/server';
import {
  Config,
  // makeLogger,
  // ILogger,
} from 'cross-cutting';

export async function registerRoutes(
  server: AppServer,
  config: Config
): Promise<AppServer> {
  server.get('/health', (request, reply) => {
    reply.code(200).send({ statusCode: 200, payload: 'Ok' });
  });

  return server;
}
