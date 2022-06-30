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
  const StateExportData = IDL.Record({ 'state_data' : IDL.Vec(IDL.Nat8) });
  const ErrorInfo = IDL.Record({ 'code' : IDL.Nat32, 'message' : IDL.Text });
  const StateExportResponse = IDL.Variant({
    'Ok' : StateExportData,
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
    'rewards_sent' : IDL.Nat,
    'paid_amount' : IDL.Nat,
    'top_10_users_open_box_count' : IDL.Vec(IDL.Nat64),
    'sending_count' : IDL.Nat64,
    'quotas_sent' : IDL.Vec(IDL.Tuple(IDL.Nat64, IDL.Nat64)),
    'open_box_count' : IDL.Nat64,
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
  const BooleanActorResponse = IDL.Variant({
    'Ok' : IDL.Bool,
    'Err' : ErrorInfo,
  });
  const QuotaType = IDL.Variant({ 'LenEq' : IDL.Nat8, 'LenGte' : IDL.Nat8 });
  const OpenBox = IDL.Record({
    'open_box_rewards' : IDL.Nat,
    'open_box_quotas' : IDL.Vec(QuotaType),
  });
  const OpenBoxResponse = IDL.Variant({ 'Ok' : OpenBox, 'Err' : ErrorInfo });
  const AdminResponse = IDL.Variant({ 'Ok' : IDL.Text, 'Err' : ErrorInfo });
  const GuaranteedResponse = IDL.Variant({
    'Ok' : IDL.Vec(IDL.Tuple(QuotaType, IDL.Nat32)),
    'Err' : ErrorInfo,
  });
  const BlindBoxDto = IDL.Record({
    'user' : IDL.Principal,
    'box_id' : IDL.Nat64,
    'created_at' : IDL.Nat64,
    'quota_type' : QuotaType,
    'price' : IDL.Nat,
  });
  const LastSentQuotasDto = IDL.Record({
    'quota_type_3' : IDL.Vec(BlindBoxDto),
    'quota_type_4' : IDL.Vec(BlindBoxDto),
  });
  const LastSentQuotasResponse = IDL.Variant({
    'Ok' : LastSentQuotasDto,
    'Err' : ErrorInfo,
  });
  const PriceResponse = IDL.Variant({ 'Ok' : IDL.Nat, 'Err' : ErrorInfo });
  return IDL.Service({
    'export_state' : IDL.Func([], [StateExportResponse], []),
    'get_state_size' : IDL.Func([], [Result], ['query']),
    'get_stats' : IDL.Func([], [GetStatsResponse], ['query']),
    'get_wasm_info' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(IDL.Text, IDL.Text))],
        ['query'],
      ),
    'http_request' : IDL.Func([HttpRequest], [HttpResponse], ['query']),
    'load_state' : IDL.Func([StateExportData], [BooleanActorResponse], []),
    'open_box' : IDL.Func([IDL.Nat32], [OpenBoxResponse], []),
    'query_admin' : IDL.Func([], [AdminResponse], ['query']),
    'query_guaranteed' : IDL.Func([], [GuaranteedResponse], ['query']),
    'query_last_sent_quotas' : IDL.Func(
        [IDL.Nat64],
        [LastSentQuotasResponse],
        ['query'],
      ),
    'query_price' : IDL.Func([], [PriceResponse], ['query']),
    'set_box_min_price' : IDL.Func([IDL.Nat], [BooleanActorResponse], []),
    'set_box_price' : IDL.Func([IDL.Nat], [BooleanActorResponse], []),
    'task_send_quota' : IDL.Func([], [BooleanActorResponse], []),
    'task_send_reward' : IDL.Func([], [BooleanActorResponse], []),
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
