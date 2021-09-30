import pino from 'pino';
import { IConfiguration } from 'cross-cutting/config';

const envToLogLevel = new Map([
  ['dev', 'debug'],
  ['production', 'info'],
  ['test', 'error'],
]);

export type ILogger = pino.Logger;

export const makeLogger = (config: IConfiguration): ILogger => {
  const env = config.serverConfig.env || 'dev';
  const level = envToLogLevel.get(env);
  const options: pino.LoggerOptions = { level };

  if (env !== 'production') {
    options.prettyPrint = true;
  }

  return pino(options);
};
