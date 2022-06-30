import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export type BooleanActorResponse = { 'Ok' : boolean } |
  { 'Err' : ErrorInfo };
export interface CallbackStrategy {
  'token' : Token,
  'callback' : [Principal, string],
}
export interface CancelOrder { 'order_id' : OrderId }
export type CancelOrderResponse = { 'Ok' : CancelOrder } |
  { 'Err' : ErrorInfo };
export type CanisterNames = { 'DICP' : null } |
  { 'Registrar' : null } |
  { 'ArkToken' : null } |
  { 'Exchange' : null } |
  { 'BlindBox' : null };
export type ConditionOrderTypeName = { 'All' : null } |
  { 'None' : null } |
  { 'Filter' : OrderTypeName };
export type ConditionOrderTypeQuota = { 'All' : null } |
  { 'None' : null } |
  { 'Filter' : OrderTypeQuota };
export interface CreateNameOrderRequest {
  'name' : string,
  'price' : bigint,
  'order_target_user' : OrderTargetUser,
}
export interface CreateOrder { 'order_id' : bigint }
export type CreateOrderResponse = { 'Ok' : CreateOrder } |
  { 'Err' : ErrorInfo };
export interface CreateQuotaOrderRequest {
  'diff' : number,
  'quota_type' : QuotaType,
  'price' : bigint,
  'order_target_user' : OrderTargetUser,
}
export interface ErrorInfo { 'code' : number, 'message' : string }
export type FindMyOrdersResponse = { 'Ok' : Array<UserOrderDto> } |
  { 'Err' : ErrorInfo };
export type FindOrderResponse = { 'Ok' : UserOrderDto } |
  { 'Err' : ErrorInfo };
export type FindOrdersFuzzyResponse = { 'Ok' : Array<UserOrderDto> } |
  { 'Err' : ErrorInfo };
export interface GetMarketOrdersQuery {
  'only_my_sale' : boolean,
  'order_type_name' : ConditionOrderTypeName,
  'price_range' : [] | [PriceRange],
  'order_type_quota' : ConditionOrderTypeQuota,
}
export interface GetMyOrdersQuery {
  'only_my_sale' : boolean,
  'order_type_name' : ConditionOrderTypeName,
  'order_state' : Array<OrderState>,
  'order_type_quota' : ConditionOrderTypeQuota,
}
export interface GetPageInput { 'offset' : bigint, 'limit' : bigint }
export type GetStatsResponse = { 'Ok' : Stats } |
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
export type LastCompletedOrderResponse = { 'Ok' : OrderList } |
  { 'Err' : ErrorInfo };
export interface NameOrderDto {
  'name' : string,
  'user' : Principal,
  'created_at' : bigint,
  'order_id' : bigint,
  'price' : bigint,
  'completed_at' : [] | [bigint],
  'order_target_user' : OrderTargetUser,
}
export interface OrderId { 'id' : bigint }
export interface OrderList {
  'quota_order_list' : Array<QuotaOrderDto>,
  'name_order_list' : Array<NameOrderDto>,
}
export type OrderState = { 'InTrading' : null } |
  { 'OnSale' : null } |
  { 'Sending' : null } |
  { 'Cancelled' : null } |
  { 'Created' : null } |
  { 'InCancelling' : null } |
  { 'Completed' : null };
export type OrderTargetUser = { 'TRUE' : Principal } |
  { 'FALSE' : null };
export type OrderType = { 'Name' : string } |
  {
    'Quota' : {
      'quota_total_diff' : number,
      'quota_left_diff' : number,
      'quota_type' : QuotaType,
    }
  };
export interface OrderTypeName {
  'name' : [] | [string],
  'length' : [] | [number],
}
export interface OrderTypeQuota { 'length' : [] | [number] }
export interface PriceRange { 'max' : bigint, 'min' : bigint }
export interface QuotaOrderDto {
  'user' : Principal,
  'total_diff' : number,
  'created_at' : bigint,
  'left_diff' : number,
  'quota_type' : QuotaType,
  'order_id' : bigint,
  'price' : bigint,
  'completed_at' : [] | [bigint],
  'order_target_user' : OrderTargetUser,
}
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
  'last_name_len_order_price' : Array<[bigint, bigint]>,
  'name_orders_total_amount' : bigint,
  'last_quota_gte_order_price' : Array<[bigint, bigint]>,
  'order_cancelled_count' : bigint,
  'trading_name_orders' : bigint,
  'next_order_id' : bigint,
  'trading_quota_orders' : bigint,
  'quota_orders_total_amount' : bigint,
  'order_completed_count' : bigint,
}
export type StreamingStrategy = { 'Callback' : CallbackStrategy };
export interface Token {
  'key' : string,
  'sha256' : [] | [Array<number>],
  'index' : bigint,
  'content_encoding' : string,
}
export interface UserOrderDto {
  'user' : Principal,
  'created_at' : bigint,
  'state' : OrderState,
  'order_type' : OrderType,
  'order_id' : bigint,
  'price' : bigint,
  'completed_at' : [] | [bigint],
  'order_target_user' : OrderTargetUser,
}
export interface _SERVICE {
  'buy_name' : ActorMethod<[bigint], BooleanActorResponse>,
  'buy_quota' : ActorMethod<[bigint, number], BooleanActorResponse>,
  'cancel_order' : ActorMethod<[bigint], CancelOrderResponse>,
  'create_name_order' : ActorMethod<
    [CreateNameOrderRequest],
    CreateOrderResponse,
  >,
  'create_quota_order' : ActorMethod<
    [CreateQuotaOrderRequest],
    CreateOrderResponse,
  >,
  'export_state' : ActorMethod<[], StateExportResponse>,
  'get_market_orders' : ActorMethod<
    [GetMarketOrdersQuery, GetPageInput],
    FindOrdersFuzzyResponse,
  >,
  'get_my_orders' : ActorMethod<
    [GetMyOrdersQuery, GetPageInput],
    FindMyOrdersResponse,
  >,
  'get_order_details' : ActorMethod<[OrderId], FindOrderResponse>,
  'get_state_size' : ActorMethod<[], Result>,
  'get_stats' : ActorMethod<[], GetStatsResponse>,
  'get_wasm_info' : ActorMethod<[], Array<[string, string]>>,
  'http_request' : ActorMethod<[HttpRequest], HttpResponse>,
  'load_state' : ActorMethod<[StateExportData], BooleanActorResponse>,
  'query_last_completed_orders' : ActorMethod<
    [bigint],
    LastCompletedOrderResponse,
  >,
  'task_order_match_after' : ActorMethod<[], BooleanActorResponse>,
}
