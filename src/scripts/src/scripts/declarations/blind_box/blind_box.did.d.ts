import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export type AdminResponse = { 'Ok' : string } |
  { 'Err' : ErrorInfo };
export interface BlindBoxDto {
  'user' : Principal,
  'box_id' : bigint,
  'created_at' : bigint,
  'quota_type' : QuotaType,
  'price' : bigint,
}
export type BooleanActorResponse = { 'Ok' : boolean } |
  { 'Err' : ErrorInfo };
export interface CallbackStrategy {
  'token' : Token,
  'callback' : [Principal, string],
}
export type CanisterNames = { 'DICP' : null } |
  { 'Registrar' : null } |
  { 'ArkToken' : null } |
  { 'Exchange' : null } |
  { 'BlindBox' : null };
export interface ErrorInfo { 'code' : number, 'message' : string }
export type GetStatsResponse = { 'Ok' : Stats } |
  { 'Err' : ErrorInfo };
export type GuaranteedResponse = { 'Ok' : Array<[QuotaType, number]> } |
  { 'Err' : ErrorInfo };
export interface HttpRequest {
  'url' : string,
  'method' : string,
  'body' : Array<number>,
  'headers' : Array<[string, string]>,
}
export interface HttpResponse {
  'body' : Array<number>,
  'headers' : Array<[string, string]>,
  'streaming_strategy' : [] | [StreamingStrategy],
  'status_code' : number,
}
export type ICNSError = { 'RemoteError' : ErrorInfo } |
  { 'InvalidQuotaDiff' : null } |
  { 'OrderPriceZeroError' : null } |
  { 'UserOrderOperationExpirationTimeError' : null } |
  { 'BoxPriceSettingError' : null } |
  { 'OrderOwnerError' : null } |
  { 'OrderTargetUserError' : null } |
  { 'OrderDiffZeroError' : null } |
  { 'OrderStatusError' : null } |
  { 'PermissionDenied' : null } |
  { 'OrderNotFoundError' : null } |
  { 'BoxRewardSettingError' : null } |
  {
    'ValueShouldBeInRangeError' : {
      'max' : bigint,
      'min' : bigint,
      'field' : string,
    }
  } |
  { 'InvalidPriceRangeError' : null } |
  { 'Unauthorized' : null } |
  { 'NotQuotaOrder' : null } |
  { 'OrderTargetUserSelfError' : null } |
  { 'Unknown' : null } |
  { 'OrderInsufficientQuotaError' : null } |
  { 'OrderPriceMaxError' : null } |
  { 'InvalidQuotaLeftDiffError' : null } |
  { 'CanisterCallError' : { 'message' : string, 'rejection_code' : string } } |
  { 'NotNameOrder' : null } |
  { 'NoMoreTaskError' : null } |
  { 'UserOrderSumMaxError' : null };
export interface InitArgs {
  'dev_named_canister_ids' : Array<[CanisterNames, Principal]>,
}
export interface LastSentQuotasDto {
  'quota_type_3' : Array<BlindBoxDto>,
  'quota_type_4' : Array<BlindBoxDto>,
}
export type LastSentQuotasResponse = { 'Ok' : LastSentQuotasDto } |
  { 'Err' : ErrorInfo };
export interface OpenBox {
  'open_box_rewards' : bigint,
  'open_box_quotas' : Array<QuotaType>,
}
export type OpenBoxResponse = { 'Ok' : OpenBox } |
  { 'Err' : ErrorInfo };
export type PriceResponse = { 'Ok' : bigint } |
  { 'Err' : ErrorInfo };
export type QuotaType = { 'LenEq' : number } |
  { 'LenGte' : number };
export type Result = { 'Ok' : bigint } |
  { 'Err' : ICNSError };
export interface StateExportData { 'state_data' : Array<number> }
export type StateExportResponse = { 'Ok' : StateExportData } |
  { 'Err' : ErrorInfo };
export interface Stats {
  'user_count' : bigint,
  'cycles_balance' : bigint,
  'rewards_sent' : bigint,
  'paid_amount' : bigint,
  'top_10_users_open_box_count' : Array<bigint>,
  'sending_count' : bigint,
  'quotas_sent' : Array<[bigint, bigint]>,
  'open_box_count' : bigint,
}
export type StreamingStrategy = { 'Callback' : CallbackStrategy };
export interface Token {
  'key' : string,
  'sha256' : [] | [Array<number>],
  'index' : bigint,
  'content_encoding' : string,
}
export interface _SERVICE {
  'export_state' : ActorMethod<[], StateExportResponse>,
  'get_state_size' : ActorMethod<[], Result>,
  'get_stats' : ActorMethod<[], GetStatsResponse>,
  'get_wasm_info' : ActorMethod<[], Array<[string, string]>>,
  'http_request' : ActorMethod<[HttpRequest], HttpResponse>,
  'load_state' : ActorMethod<[StateExportData], BooleanActorResponse>,
  'open_box' : ActorMethod<[number], OpenBoxResponse>,
  'query_admin' : ActorMethod<[], AdminResponse>,
  'query_guaranteed' : ActorMethod<[], GuaranteedResponse>,
  'query_last_sent_quotas' : ActorMethod<[bigint], LastSentQuotasResponse>,
  'query_price' : ActorMethod<[], PriceResponse>,
  'set_box_min_price' : ActorMethod<[bigint], BooleanActorResponse>,
  'set_box_price' : ActorMethod<[bigint], BooleanActorResponse>,
  'task_send_quota' : ActorMethod<[], BooleanActorResponse>,
  'task_send_reward' : ActorMethod<[], BooleanActorResponse>,
}
