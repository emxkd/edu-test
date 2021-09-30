import { AppServer } from 'drivers/rest-api/server';

export function registerMiddleware(server: AppServer): AppServer {
  // server.use(customMiddleware);
  return server;
}
