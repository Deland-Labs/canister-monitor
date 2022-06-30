export const idlFactory = ({ IDL }) => {
  const CanisterNames = IDL.Variant({
    'DICP' : IDL.Null,
    'Registrar' : IDL.Null,
    'ArkToken' : IDL.Null,
    'Exchange' : IDL.Null,
    'BlindBox' : IDL.Null,
  });
  const InitArgs = IDL.Record({
    'dev_named_canister_ids' : IDL.Vec(IDL.Tuple(CanisterNames, IDL.Principal)),
  });
  const ErrorInfo = IDL.Record({ 'code' : IDL.Nat32, 'message' : IDL.Text });
  const BooleanActorResponse = IDL.Variant({
    'Ok' : IDL.Bool,
    'Err' : ErrorInfo,
  });
  const OrderId = IDL.Record({ 'id' : IDL.Nat });
  const CancelOrder = IDL.Record({ 'order_id' : OrderId });
  const CancelOrderResponse = IDL.Variant({
    'Ok' : CancelOrder,
    'Err' : ErrorInfo,
  });
  const OrderTargetUser = IDL.Variant({
    'TRUE' : IDL.Principal,
    'FALSE' : IDL.Null,
  });
  const CreateNameOrderRequest = IDL.Record({
    'name' : IDL.Text,
    'price' : IDL.Nat,
    'order_target_user' : OrderTargetUser,
  });
  const CreateOrder = IDL.Record({ 'order_id' : IDL.Nat });
  const CreateOrderResponse = IDL.Variant({
    'Ok' : CreateOrder,
    'Err' : ErrorInfo,
  });
  const QuotaType = IDL.Variant({ 'LenEq' : IDL.Nat8, 'LenGte' : IDL.Nat8 });
  const CreateQuotaOrderRequest = IDL.Record({
    'diff' : IDL.Nat32,
    'quota_type' : QuotaType,
    'price' : IDL.Nat,
    'order_target_user' : OrderTargetUser,
  });
  const StateExportData = IDL.Record({ 'state_data' : IDL.Vec(IDL.Nat8) });
  const StateExportResponse = IDL.Variant({
    'Ok' : StateExportData,
    'Err' : ErrorInfo,
  });
  const OrderTypeName = IDL.Record({
    'name' : IDL.Opt(IDL.Text),
    'length' : IDL.Opt(IDL.Nat8),
  });
  const ConditionOrderTypeName = IDL.Variant({
    'All' : IDL.Null,
    'None' : IDL.Null,
    'Filter' : OrderTypeName,
  });
  const PriceRange = IDL.Record({ 'max' : IDL.Nat, 'min' : IDL.Nat });
  const OrderTypeQuota = IDL.Record({ 'length' : IDL.Opt(IDL.Nat8) });
  const ConditionOrderTypeQuota = IDL.Variant({
    'All' : IDL.Null,
    'None' : IDL.Null,
    'Filter' : OrderTypeQuota,
  });
  const GetMarketOrdersQuery = IDL.Record({
    'only_my_sale' : IDL.Bool,
    'order_type_name' : ConditionOrderTypeName,
    'price_range' : IDL.Opt(PriceRange),
    'order_type_quota' : ConditionOrderTypeQuota,
  });
  const GetPageInput = IDL.Record({
    'offset' : IDL.Nat64,
    'limit' : IDL.Nat64,
  });
  const OrderState = IDL.Variant({
    'InTrading' : IDL.Null,
    'OnSale' : IDL.Null,
    'Sending' : IDL.Null,
    'Cancelled' : IDL.Null,
    'Created' : IDL.Null,
    'InCancelling' : IDL.Null,
    'Completed' : IDL.Null,
  });
  const OrderType = IDL.Variant({
    'Name' : IDL.Text,
    'Quota' : IDL.Record({
      'quota_total_diff' : IDL.Nat32,
      'quota_left_diff' : IDL.Nat32,
      'quota_type' : QuotaType,
    }),
  });
  const UserOrderDto = IDL.Record({
    'user' : IDL.Principal,
    'created_at' : IDL.Nat64,
    'state' : OrderState,
    'order_type' : OrderType,
    'order_id' : IDL.Nat,
    'price' : IDL.Nat,
    'completed_at' : IDL.Opt(IDL.Nat64),
    'order_target_user' : OrderTargetUser,
  });
  const FindOrdersFuzzyResponse = IDL.Variant({
    'Ok' : IDL.Vec(UserOrderDto),
    'Err' : ErrorInfo,
  });
  const GetMyOrdersQuery = IDL.Record({
    'only_my_sale' : IDL.Bool,
    'order_type_name' : ConditionOrderTypeName,
    'order_state' : IDL.Vec(OrderState),
    'order_type_quota' : ConditionOrderTypeQuota,
  });
  const FindMyOrdersResponse = IDL.Variant({
    'Ok' : IDL.Vec(UserOrderDto),
    'Err' : ErrorInfo,
  });
  const FindOrderResponse = IDL.Variant({
    'Ok' : UserOrderDto,
    'Err' : ErrorInfo,
  });
  const ICNSError = IDL.Variant({
    'RemoteError' : ErrorInfo,
    'InvalidQuotaDiff' : IDL.Null,
    'OrderPriceZeroError' : IDL.Null,
    'UserOrderOperationExpirationTimeError' : IDL.Null,
    'BoxPriceSettingError' : IDL.Null,
    'OrderOwnerError' : IDL.Null,
    'OrderTargetUserError' : IDL.Null,
    'OrderDiffZeroError' : IDL.Null,
    'OrderStatusError' : IDL.Null,
    'PermissionDenied' : IDL.Null,
    'OrderNotFoundError' : IDL.Null,
    'BoxRewardSettingError' : IDL.Null,
    'ValueShouldBeInRangeError' : IDL.Record({
      'max' : IDL.Nat64,
      'min' : IDL.Nat64,
      'field' : IDL.Text,
    }),
    'InvalidPriceRangeError' : IDL.Null,
    'Unauthorized' : IDL.Null,
    'NotQuotaOrder' : IDL.Null,
    'OrderTargetUserSelfError' : IDL.Null,
    'Unknown' : IDL.Null,
    'OrderInsufficientQuotaError' : IDL.Null,
    'OrderPriceMaxError' : IDL.Null,
    'InvalidQuotaLeftDiffError' : IDL.Null,
    'CanisterCallError' : IDL.Record({
      'message' : IDL.Text,
      'rejection_code' : IDL.Text,
    }),
    'NotNameOrder' : IDL.Null,
    'NoMoreTaskError' : IDL.Null,
    'UserOrderSumMaxError' : IDL.Null,
  });
  const Result = IDL.Variant({ 'Ok' : IDL.Nat64, 'Err' : ICNSError });
  const Stats = IDL.Record({
    'user_count' : IDL.Nat64,
    'cycles_balance' : IDL.Nat64,
    'last_name_len_order_price' : IDL.Vec(IDL.Tuple(IDL.Nat64, IDL.Nat)),
    'name_orders_total_amount' : IDL.Nat,
    'last_quota_gte_order_price' : IDL.Vec(IDL.Tuple(IDL.Nat64, IDL.Nat)),
    'order_cancelled_count' : IDL.Nat64,
    'trading_name_orders' : IDL.Nat64,
    'next_order_id' : IDL.Nat,
    'trading_quota_orders' : IDL.Nat64,
    'quota_orders_total_amount' : IDL.Nat,
    'order_completed_count' : IDL.Nat64,
  });
  const GetStatsResponse = IDL.Variant({ 'Ok' : Stats, 'Err' : ErrorInfo });
  const HttpRequest = IDL.Record({
    'url' : IDL.Text,
    'method' : IDL.Text,
    'body' : IDL.Vec(IDL.Nat8),
    'headers' : IDL.Vec(IDL.Tuple(IDL.Text, IDL.Text)),
  });
  const Token = IDL.Record({
    'key' : IDL.Text,
    'sha256' : IDL.Opt(IDL.Vec(IDL.Nat8)),
    'index' : IDL.Nat,
    'content_encoding' : IDL.Text,
  });
  const CallbackStrategy = IDL.Record({
    'token' : Token,
    'callback' : IDL.Func([], [], []),
  });
  const StreamingStrategy = IDL.Variant({ 'Callback' : CallbackStrategy });
  const HttpResponse = IDL.Record({
    'body' : IDL.Vec(IDL.Nat8),
    'headers' : IDL.Vec(IDL.Tuple(IDL.Text, IDL.Text)),
    'streaming_strategy' : IDL.Opt(StreamingStrategy),
    'status_code' : IDL.Nat16,
  });
  const QuotaOrderDto = IDL.Record({
    'user' : IDL.Principal,
    'total_diff' : IDL.Nat32,
    'created_at' : IDL.Nat64,
    'left_diff' : IDL.Nat32,
    'quota_type' : QuotaType,
    'order_id' : IDL.Nat,
    'price' : IDL.Nat,
    'completed_at' : IDL.Opt(IDL.Nat64),
    'order_target_user' : OrderTargetUser,
  });
  const NameOrderDto = IDL.Record({
    'name' : IDL.Text,
    'user' : IDL.Principal,
    'created_at' : IDL.Nat64,
    'order_id' : IDL.Nat,
    'price' : IDL.Nat,
    'completed_at' : IDL.Opt(IDL.Nat64),
    'order_target_user' : OrderTargetUser,
  });
  const OrderList = IDL.Record({
    'quota_order_list' : IDL.Vec(QuotaOrderDto),
    'name_order_list' : IDL.Vec(NameOrderDto),
  });
  const LastCompletedOrderResponse = IDL.Variant({
    'Ok' : OrderList,
    'Err' : ErrorInfo,
  });
  return IDL.Service({
    'buy_name' : IDL.Func([IDL.Nat], [BooleanActorResponse], []),
    'buy_quota' : IDL.Func([IDL.Nat, IDL.Nat32], [BooleanActorResponse], []),
    'cancel_order' : IDL.Func([IDL.Nat], [CancelOrderResponse], []),
    'create_name_order' : IDL.Func(
        [CreateNameOrderRequest],
        [CreateOrderResponse],
        [],
      ),
    'create_quota_order' : IDL.Func(
        [CreateQuotaOrderRequest],
        [CreateOrderResponse],
        [],
      ),
    'export_state' : IDL.Func([], [StateExportResponse], []),
    'get_market_orders' : IDL.Func(
        [GetMarketOrdersQuery, GetPageInput],
        [FindOrdersFuzzyResponse],
        ['query'],
      ),
    'get_my_orders' : IDL.Func(
        [GetMyOrdersQuery, GetPageInput],
        [FindMyOrdersResponse],
        ['query'],
      ),
    'get_order_details' : IDL.Func([OrderId], [FindOrderResponse], ['query']),
    'get_state_size' : IDL.Func([], [Result], ['query']),
    'get_stats' : IDL.Func([], [GetStatsResponse], ['query']),
    'get_wasm_info' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(IDL.Text, IDL.Text))],
        ['query'],
      ),
    'http_request' : IDL.Func([HttpRequest], [HttpResponse], ['query']),
    'load_state' : IDL.Func([StateExportData], [BooleanActorResponse], []),
    'query_last_completed_orders' : IDL.Func(
        [IDL.Nat64],
        [LastCompletedOrderResponse],
        ['query'],
      ),
    'task_order_match_after' : IDL.Func([], [BooleanActorResponse], []),
  });
};
export const init = ({ IDL }) => {
  const CanisterNames = IDL.Variant({
    'DICP' : IDL.Null,
    'Registrar' : IDL.Null,
    'ArkToken' : IDL.Null,
    'Exchange' : IDL.Null,
    'BlindBox' : IDL.Null,
  });
  const InitArgs = IDL.Record({
    'dev_named_canister_ids' : IDL.Vec(IDL.Tuple(CanisterNames, IDL.Principal)),
  });
  return [IDL.Opt(InitArgs)];
};
