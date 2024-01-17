import { iConfig } from "./interface/iConfig.ts";
import { loglevel } from "./interface/iLogger.ts";
import { ClientBuilder } from "npm:@commercetools/sdk-client-v2";
import { ApiRoot, createApiBuilderFromCtpClient } from "npm:@commercetools/platform-sdk";
import { userAgentMiddleware } from "./middlewares/userAgentMiddleware.ts";
import { iOptions } from "./interface/isdk.ts";
import { refreshAuthMiddleware } from "./middlewares/refreshAuthMiddleware.ts";
import { apiHttpMiddleware } from "./middlewares/httpMiddleware.ts";
import { ClientCredentialsAuthMiddleware } from "./middlewares/ClientCredentialsAuthMiddleware.ts";
import { passwordflowAuthMiddleware } from "./middlewares/passwordflowAuthMiddleware.ts";
import { anonymousAuthMiddleware } from "./middlewares/anonymousAuthMiddleware.ts";
import { passwordflowStoreAuthMiddleware } from "./middlewares/passwordflowStoreAuthMiddleware.ts";

export class sdkClient {
  protected _config: iConfig;
  protected _projectKey: string;
  protected _verbose: loglevel;

  constructor(config: iConfig, verbose: loglevel = loglevel.quiet) {
    this._config = config;
    this._projectKey = config.project_key;
    this._verbose = verbose;
  }

  public withClientCredentials(): ApiRoot {
    if (this._verbose === loglevel.verbose) {
      const client = new ClientBuilder()
        .withProjectKey(this._config.project_key)
        .withClientCredentialsFlow(ClientCredentialsAuthMiddleware(this._config))
        .withHttpMiddleware(apiHttpMiddleware(this._config))
        .withUserAgentMiddleware(userAgentMiddleware)
        .withLoggerMiddleware() // include the logger middleware
        .build();
      return createApiBuilderFromCtpClient(client)
    }
    const client = new ClientBuilder()
      .withProjectKey(this._config.project_key)
      .withClientCredentialsFlow(ClientCredentialsAuthMiddleware(this._config))
      .withHttpMiddleware(apiHttpMiddleware(this._config))
      .withUserAgentMiddleware(userAgentMiddleware)
      .build();
    return createApiBuilderFromCtpClient(client)
  }

  public withUsernamePassword(options: iOptions): ApiRoot {
    if (this._verbose === loglevel.verbose) {
      const client = new ClientBuilder()
        .withProjectKey(this._projectKey)
        .withPasswordFlow(passwordflowAuthMiddleware(this._config, options))
        .withHttpMiddleware(apiHttpMiddleware(this._config))
        .withUserAgentMiddleware(userAgentMiddleware)
        .withLoggerMiddleware() // include the logger middleware
        .build();
      return createApiBuilderFromCtpClient(client);
    }
    const client = new ClientBuilder()
      .withProjectKey(this._projectKey)
      .withPasswordFlow(passwordflowAuthMiddleware(this._config, options))
      .withHttpMiddleware(apiHttpMiddleware(this._config))
      .withUserAgentMiddleware(userAgentMiddleware)
      .build();
    return createApiBuilderFromCtpClient(client);
  }

  public withUsernamePasswordStore(options: iOptions): ApiRoot {
    if (this._verbose === loglevel.verbose) {
      const client = new ClientBuilder()
        .withProjectKey(this._projectKey)
        .withPasswordFlow(passwordflowStoreAuthMiddleware(this._config, options))
        .withHttpMiddleware(apiHttpMiddleware(this._config))
        .withUserAgentMiddleware(userAgentMiddleware)
        .withLoggerMiddleware() // include the logger middleware
        .build()
      console.log(client)
      return createApiBuilderFromCtpClient(client);
    }
    const client = new ClientBuilder()
      .withProjectKey(this._projectKey)
      .withPasswordFlow(passwordflowStoreAuthMiddleware(this._config, options))
      .withHttpMiddleware(apiHttpMiddleware(this._config))
      .withUserAgentMiddleware(userAgentMiddleware)
      .build();
    return createApiBuilderFromCtpClient(client);
  }

  public withAnonymous(options: iOptions): ApiRoot {
    if (this._verbose === loglevel.verbose) {
      const client = new ClientBuilder()
      .withProjectKey(this._projectKey)
      .withAnonymousSessionFlow(anonymousAuthMiddleware(this._config, options))
      .withHttpMiddleware(apiHttpMiddleware(this._config))
      .withUserAgentMiddleware(userAgentMiddleware)
      .withLoggerMiddleware() // include the logger middleware
      .build();
    return createApiBuilderFromCtpClient(client);
    }
    const client = new ClientBuilder()
      .withProjectKey(this._projectKey)
      .withAnonymousSessionFlow(anonymousAuthMiddleware(this._config, options))
      .withHttpMiddleware(apiHttpMiddleware(this._config))
      .withUserAgentMiddleware(userAgentMiddleware)
      .build();
    return createApiBuilderFromCtpClient(client);
  }

  public withRefreshToken(options: iOptions): ApiRoot {
    if (this._verbose === loglevel.verbose) {
      const client = new ClientBuilder()
        .withProjectKey(this._projectKey)
        .withRefreshTokenFlow(refreshAuthMiddleware(this._config, options))
        .withHttpMiddleware(apiHttpMiddleware(this._config))
        .withUserAgentMiddleware(userAgentMiddleware)
        .withLoggerMiddleware() // include the logger middleware
        .build();
      return createApiBuilderFromCtpClient(client);
    }
    const client = new ClientBuilder()
      .withProjectKey(this._projectKey)
      .withRefreshTokenFlow(refreshAuthMiddleware(this._config, options))
      .withHttpMiddleware(apiHttpMiddleware(this._config))
      .withUserAgentMiddleware(userAgentMiddleware)
      .build();
    return createApiBuilderFromCtpClient(client);
  }
}

export { ApiRoot } from "npm:@commercetools/platform-sdk"
export * from "npm:@commercetools/platform-sdk"

