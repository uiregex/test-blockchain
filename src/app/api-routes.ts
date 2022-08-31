import { UniRoutes } from "uni-common";

export const apiRoutes: Partial<UniRoutes> = Object.freeze({
  prod: {
    gateways: {
      // publicGateWay: '',
      // identityProvider: '',
      // registeredClient: ''
    },
    urls: {
      /** Login urls */
      // loginUrl: '/api/v1/auth',
      // logoutUrl: '/api/v1/logout',

      blocksUrl: "https://api.tzkt.io/v1/blocks",
      blocksCountUrl: "https://api.tzkt.io/v1/blocks/count",
      transactionsUrl: "https://api.tzkt.io/v1/operations/transactions",
      transactionsCountUrl: "https://api.tzkt.io/v1/operations/transactions/count",
    },
  },

  mock: {
    urls: {
      blocksUrl: "https://api.tzkt.io/v1/blocks",
      blocksCountUrl: "https://api.tzkt.io/v1/blocks/count",
      transactionsUrl: "https://api.tzkt.io/v1/operations/transactions",
      transactionsCountUrl: "https://api.tzkt.io/v1/operations/transactions/count",
    },
  },
});
