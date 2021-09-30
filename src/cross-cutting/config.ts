import S from 'fluent-json-schema';
import envSchema from 'env-schema';

require('dotenv-flow').config({
  path: 'environments',
  node_env: process.env.NODE_ENV || 'dev',
});

const serverSchema = S.object()
  .prop('port', S.number().required())
  .prop('apiPrefixV1', S.string().required())
  .prop('authSecret', S.string().required())
  .prop('env', S.string().enum(['dev', 'test', 'production']).required());

const configurationSchema = S.object().prop('serverConfig', serverSchema);

interface IServerConfig {
  port: number;
  authSecret: string;
  apiPrefixV1: string;
  env: string;
}

export interface IConfiguration {
  serverConfig: IServerConfig;
  isTest: boolean;
  isProd: boolean;
  isDev: boolean;
}

export class Config implements IConfiguration {
  constructor() {
    this.validate();
  }

  get serverConfig(): IServerConfig {
    return {
      port: Number(process.env.PORT) || 3003,
      apiPrefixV1: process.env.API_PREFIX_V1 || 'dummy1/v1',
      authSecret: process.env.AUTH_SECRET || 'dev-sample-secret',
      env: process.env.NODE_ENV,
    } as IServerConfig;
  }

  get isTest(): boolean {
    return process.env.NODE_ENV === 'test';
  }
  get isProd(): boolean {
    return process.env.NODE_ENV === 'production';
  }
  get isDev(): boolean {
    return process.env.NODE_ENV === 'dev';
  }

  private validate(): void {
    envSchema({
      data: {
        serverConfig: this.serverConfig,
      },
      schema: configurationSchema,
    });
  }
}
