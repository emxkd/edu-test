import { Server, IncomingMessage, ServerResponse } from 'http';
import fastify, {
  FastifyInstance,
  FastifyRequest,
  FastifyReply,
} from 'fastify';

import { Config, makeLogger, ILogger } from 'cross-cutting';
import { registerPlugins } from 'drivers/rest-api/register-plugins';
import { registerMiddleware } from 'drivers/rest-api/register-middleware';
import { registerRoutes } from 'drivers/rest-api/register-routes';

export type Request = IncomingMessage;
export type Response = ServerResponse;
export type AppServer = FastifyInstance<Server, Request, Response>;

async function internalErrorHandler(
  error: Error,
  req: FastifyRequest,
  reply: FastifyReply
) {
  const res: any = {
    statusCode: 500,
    errorMessage: 'Internal Server Error',
  };

  if (error.message) {
    res.errorReason = error.message;
  }
  req.log.error(error.message);
  reply.status(500);
  reply.send(res);
}

export async function createServer(config: Config, appLogger: ILogger) {
  const logger = config.serverConfig.env === 'test' ? false : appLogger;
  const server: AppServer = fastify({ logger, ignoreTrailingSlash: true });

  registerPlugins(server, config);
  registerMiddleware(server);
  server.setErrorHandler(internalErrorHandler);
  await registerRoutes(server, config);

  return server;
}

export async function startServer(
  server: AppServer,
  config: Config,
  logger: ILogger
) {
  await server.ready();
  await server.listen(config.serverConfig.port, '0.0.0.0');
  logger.info(`Server started on port ${config.serverConfig.port}`);
  if (config.isDev) {
    logger.info(server.printRoutes());
  }
}

if (require.main === module) {
  const config = new Config();
  const logger = makeLogger(config);

  createServer(config, logger)
    .then((server) => {
      startServer(server, config, logger);
    })
    .catch((e) => {
      console.log('failed', e);
    });
}
