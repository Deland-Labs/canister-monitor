import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export type CanisterStatus = { 'stopped' : null } |
  { 'stopping' : null } |
  { 'running' : null };
export interface CanisterStatusResponse {
  'status' : CanisterStatus,
  'freezing_threshold' : bigint,
  'memory_size' : bigint,
  'cycles' : bigint,
  'settings' : DefiniteCanisterSettings,
  'module_hash' : [] | [Array<number>],
}
export interface CanisterStatusResponseDto {
  'detail' : CanisterStatusResponse,
  'canister' : Principal,
}
export interface DefiniteCanisterSettings {
  'freezing_threshold' : bigint,
  'controllers' : Array<Principal>,
  'memory_allocation' : bigint,
  'compute_allocation' : bigint,
}
export interface ErrorInfo { 'code' : number, 'message' : string }
export type GetCanisterStatusListResponse = {
    'Ok' : Array<CanisterStatusResponseDto>
  } |
  { 'Err' : ErrorInfo };
export type GetCanisterStatusResponse = { 'Ok' : CanisterStatusResponseDto } |
  { 'Err' : ErrorInfo };
export interface _SERVICE {
  'get_canister_status' : ActorMethod<[Principal], GetCanisterStatusResponse>,
  'get_canister_status_list' : ActorMethod<
    [Array<Principal>],
    GetCanisterStatusListResponse,
  >,
}
