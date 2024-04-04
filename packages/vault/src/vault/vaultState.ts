import {
  ChainAddress,
  ChainOperationArgs,
  ChainSignablePayload,
  ChainSpecificArgs,
  ChainSpecificPayload,
  FromBip39MnemonicWordsProps,
  Network
} from '@palladxyz/key-management'
import { GetPassphrase } from '@palladxyz/key-management'
import { AccountInfo, Mina, SubmitTxArgs } from '@palladxyz/mina-core'
import { Multichain } from '@palladxyz/multi-chain-core'
import { ProviderConfig } from '@palladxyz/providers'

import {
  CredentialName,
  SingleCredentialState,
  StoredCredential
} from '../credentials'
import { KeyAgentName, KeyAgents, SingleKeyAgentState } from '../keyAgent'
import { NetworkName } from '../network-info'
import {
  initialObjectState,
  ObjectName,
  ObjectsStore,
  SingleObjectState,
  StoredObject
} from '../objects'
import { SearchQuery } from '../utils/utils'
import { AuthorizationState, ZkAppUrl } from '../web-provider'

// Note: this is the full state of the account not just 'MINA' tokens
type CurrentWallet = {
  singleKeyAgentState: SingleKeyAgentState | undefined
  credential: SingleCredentialState
  accountInfo: Record<string, AccountInfo> // string here is token ticker
  transactions: Record<string, Mina.TransactionBody[]> // string here is token ticker
}

type CurrentWalletPayload = {
  keyAgentName: string
  credentialName: string
  currentAccountIndex: number
  currentAddressIndex: number
}

export type GlobalVaultState = {
  keyAgentName: string
  credentialName: string
  currentAccountIndex: number
  currentAddressIndex: number
  chain: Network
  walletNetwork: Multichain.MultiChainNetworks
  walletName: string
  knownAccounts: string[]
  chainIds: string[]
  objects: ObjectsStore
}

type CreateWalletReturn = {
  mnemonic: string[]
}

export type GlobalVaultActions = {
  setChain: (chain: Network) => void
  setKnownAccounts: (address: string) => void
  getCurrentWallet: () => CurrentWallet
  setCurrentWallet: (payload: CurrentWalletPayload) => void
  _syncAccountInfo: (
    providerConfig: ProviderConfig,
    publicKey: ChainAddress
  ) => Promise<void>
  _syncTransactions: (
    providerConfig: ProviderConfig,
    publicKey: ChainAddress
  ) => Promise<void>
  _syncWallet: () => Promise<void>
  getCurrentNetwork: () => string
  switchNetwork: (networkName: NetworkName) => Promise<void>
  getCredentials: (query: SearchQuery, props: string[]) => StoredCredential[]
  getWalletAccountInfo: () => unknown
  getWalletTransactions: () => unknown[]
  sign: (
    signable: ChainSignablePayload,
    args: ChainOperationArgs,
    getPassphrase: GetPassphrase
  ) => Promise<unknown>
  constructTx: (
    transaction: Mina.TransactionBody,
    kind: Mina.TransactionKind
  ) => unknown
  submitTx: (submitTxArgs: SubmitTxArgs) => Promise<unknown>
  createWallet: (strength?: number) => CreateWalletReturn
  restoreWallet: <T extends ChainSpecificPayload>(
    payload: T,
    args: ChainSpecificArgs,
    network: string,
    { mnemonicWords, getPassphrase }: FromBip39MnemonicWordsProps,
    keyAgentName: KeyAgentName,
    keyAgentType: KeyAgents,
    credentialName: CredentialName
  ) => Promise<void>
  restartWallet: () => void
  // web provider APIs
  getAccounts: () => string[]
  getBalance: (ticker?: string) => number
  getChainId: () => string
  getObject: (name: ObjectName) => StoredObject | typeof initialObjectState
  searchObjs(query: SearchQuery, props?: string[]): StoredObject[]
  setObj: (objectState: SingleObjectState) => void
  removeObject: (name: ObjectName) => void
  setzkAppPermission: ({
    origin,
    authorizationState
  }: {
    origin: ZkAppUrl
    authorizationState: AuthorizationState
  }) => void
  removezkAppPermission: ({ origin }: { origin: ZkAppUrl }) => void
  // await MinaProvider.init(opts, [])
  //getProvider: (opts: ChainProviderOptions, authorizedMethods?: string[] | undefined, externalEmitter?: EventEmitter | undefined) => Promise<MinaProvider>
}

export type GlobalVaultStore = GlobalVaultState & GlobalVaultActions
