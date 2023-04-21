import { Environment } from '@abp/ng.core';

const baseUrl = 'http://localhost:4200';

export const environment = {
  production: true,
  application: {
    baseUrl,
    name: 'LMS',
    logoUrl: '',
  },
  oAuthConfig: {
    issuer: 'https://localhost:44340/',
    redirectUri: baseUrl,
    clientId: 'LMS_App',
    responseType: 'code',
    scope: 'offline_access LMS',
    requireHttps: true
  },
  apis: {
    default: {
      url: 'https://localhost:44360',
      rootNamespace: 'LMS',
    },
  },
} as Environment;
