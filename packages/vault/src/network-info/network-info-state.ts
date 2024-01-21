/**
 * Type representing the store's state and actions combined.
 * @typedef {Object} NetworkInfoStore
 */

import { ProviderConfig } from '@palladxyz/providers'

/* Network info store should
- store information related to a specific network that allows a provider to connect to it
     - this could include signing args like mina-signer's "testnet" or "mainnet" -- TODO: consider creating a new type that extends ProviderConfig
*/

export type NetworkName = string
export type NetworkInfoStore = {
  networkInfo: Record<NetworkName, ProviderConfig>
  currentNetworkInfo: ProviderConfig
  setCurrentNetworkInfo: (networkName: NetworkName) => void
  getCurrentNetworkInfo: () => ProviderConfig
  setNetworkInfo: (
    networkName: NetworkName,
    providerConfig: ProviderConfig
  ) => void
  getNetworkInfo: (networkName: NetworkName) => ProviderConfig | undefined
  removeNetworkInfo: (ticker: string) => void
  allNetworkInfo: () => (ProviderConfig | undefined)[]
  clear: () => void
}
