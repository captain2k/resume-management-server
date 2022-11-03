import { Injectable } from '@nestjs/common';
import { ConfidentialClientApplication, Configuration } from '@azure/msal-node';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AzureService {
  private msal: ConfidentialClientApplication;

  constructor(private readonly config: ConfigService) {
    const azureConfig: Configuration = {
      auth: {
        clientId: this.config.get<string>('CLIENT_ID'),
        authority:
          this.config.get<string>('CLOUD_INSTANCE') +
          this.config.get<string>('TENANT_ID'),
        clientSecret: this.config.get<string>('CLIENT_SECRET'),
      },
      system: {
        loggerOptions: {
          loggerCallback(loglevel, message, containsPii) {
            console.log(message);
          },
          piiLoggingEnabled: false,
          logLevel: 2,
        },
      },
    };

    this.msal = new ConfidentialClientApplication(azureConfig);
  }

  async verify(token: string) {
    return this.msal.acquireTokenByCode({
      code: token,
      scopes: ['User.Read'],
      redirectUri: 'http://localhost:5173',
    });
  }
}
