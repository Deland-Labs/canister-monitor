export const idlFactory = ({ IDL }) => {
  const CanisterStatus = IDL.Variant({
    'stopped' : IDL.Null,
    'stopping' : IDL.Null,
    'running' : IDL.Null,
  });
  const DefiniteCanisterSettings = IDL.Record({
    'freezing_threshold' : IDL.Nat,
    'controllers' : IDL.Vec(IDL.Principal),
    'memory_allocation' : IDL.Nat,
    'compute_allocation' : IDL.Nat,
  });
  const CanisterStatusResponse = IDL.Record({
    'status' : CanisterStatus,
    'freezing_threshold' : IDL.Nat,
    'memory_size' : IDL.Nat,
    'cycles' : IDL.Nat,
    'settings' : DefiniteCanisterSettings,
    'module_hash' : IDL.Opt(IDL.Vec(IDL.Nat8)),
  });
  const CanisterStatusResponseDto = IDL.Record({
    'detail' : CanisterStatusResponse,
    'canister' : IDL.Principal,
  });
  const ErrorInfo = IDL.Record({ 'code' : IDL.Nat32, 'message' : IDL.Text });
  const GetCanisterStatusResponse = IDL.Variant({
    'Ok' : CanisterStatusResponseDto,
    'Err' : ErrorInfo,
  });
  const GetCanisterStatusListResponse = IDL.Variant({
    'Ok' : IDL.Vec(GetCanisterStatusResponse),
    'Err' : ErrorInfo,
  });
  return IDL.Service({
    'get_canister_status' : IDL.Func(
        [IDL.Principal],
        [GetCanisterStatusResponse],
        [],
      ),
    'get_canister_status_list' : IDL.Func(
        [IDL.Vec(IDL.Principal)],
        [GetCanisterStatusListResponse],
        [],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
