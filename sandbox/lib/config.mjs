// Where the sandbox pieces live. Override any of them with environment variables.
const env = process.env;

export const config = {
  // The eSignet service (API, discovery, token, userinfo). Its issuer is this URL.
  esignetUrl: env.ESIGNET_URL || 'http://localhost:8080',
  // MOSIP's mock identity system, where the seed script creates the personas.
  mockIdentityUrl: env.MOCK_IDENTITY_URL || 'http://localhost:8082',
  // The adapter: serves prototypes and is the OIDC client's redirect target.
  adapterPort: Number(env.ADAPTER_PORT || 4400),
  adapterUrl: env.ADAPTER_URL || 'http://localhost:' + (env.ADAPTER_PORT || 4400),
  clientId: env.XSTACK_CLIENT_ID || 'xstack-kestria-sandbox',
  // OIDC prompt sent to eSignet: 'consent' shows its consent screen every time.
  prompt: env.ESIGNET_PROMPT || 'consent'
};
