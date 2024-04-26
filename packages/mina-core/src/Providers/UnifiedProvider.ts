import type { TransactionBody } from "../Mina"
import type { HealthCheckResponse } from "./Provider"
import type { AccountInfo, AccountInfoArgs } from "./account-info-provider"
import type {
  TransactionsByAddressesArgs,
  TransactionsByIdsArgs,
} from "./chain-history-provider"
import type { DaemonStatus } from "./daemon-status-provider"
import type { TxStatus, TxStatusArgs } from "./tx-status-provider"
import type { SubmitTxArgs, SubmitTxResult } from "./tx-submit-provider"

export type UnifiedMinaProviderConfig = {
  nodeUrl: string
  archiveUrl: string
}

export interface UnifiedMinaProviderType {
  changeNetwork?(nodeUrl: string, archiveUrl: string): Promise<void>
  destroy?(): Promise<void>

  // Methods related to ProviderNode
  getAccountInfo(
    args: AccountInfoArgs,
  ): Promise<Record<string, AccountInfo> | undefined>
  getTransactionStatus?(args: TxStatusArgs): Promise<TxStatus | undefined>
  submitTransaction(args: SubmitTxArgs): Promise<SubmitTxResult | undefined>

  // Methods related to ProviderArchive
  getTransactions(
    args: TransactionsByAddressesArgs,
  ): Promise<TransactionBody[] | undefined>
  getTransaction?(
    args: TransactionsByIdsArgs,
  ): Promise<TransactionBody[] | undefined>

  getDaemonStatus?(): Promise<DaemonStatus>

  // healthCheck
  healthCheck?(): Promise<HealthCheckResponse>

  provider?: UnifiedMinaProviderType
}
