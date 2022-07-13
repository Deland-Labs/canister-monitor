use std::fmt::{Debug};



use async_trait::async_trait;
use candid::{CandidType, Nat, Principal};
use ic_cdk::api::call::RejectionCode;
use ic_cdk::call;
use log::{debug, error};
use serde::{Deserialize, Serialize};



use crate::errors::{ActorResult, CommonError, ErrorInfo};
use crate::named_canister_ids::{get_named_get_canister_id, CanisterNames};



pub mod ic_impl;

async fn call_core<T, TResult>(
    canister_name: CanisterNames,
    method: &str,
    args: T,
    logging: bool,
) -> Result<TResult, CommonError>
    where
        T: candid::utils::ArgumentEncoder,
        TResult: for<'a> Deserialize<'a> + CandidType + Debug,
{
    if logging {
        debug!("Calling {:?}::{}", canister_name, method);
    }
    let canister_id = get_named_get_canister_id(canister_name);
    let call_result: Result<(TResult, ), (RejectionCode, String)> =
        call(canister_id, method, args).await;
    if call_result.is_err() {
        let (code, message) = call_result.err().unwrap();
        let code_string = format!("{:?}", code);
        error!(
            "{:?}::{} failed with code {}: {}",
            canister_name, method, code_string, message
        );
        return Err(CommonError::CanisterCallError {
            message,
            rejection_code: code_string,
        });
    }
    let result = call_result.unwrap();
    if logging {
        debug!(
            "Call canister {:?} with method {} result: {:?}",
            canister_name, method, result
        );
    }
    Ok(result.0)
}

async fn call_core_by_id<T, TResult>(
    canister_id: Principal,
    method: &str,
    args: T,
    logging: bool,
) -> Result<TResult, CommonError>
    where
        T: candid::utils::ArgumentEncoder,
        TResult: for<'a> Deserialize<'a> + CandidType + Debug,
{
    if logging {
        debug!("Calling {:?}::{}", canister_id, method);
    }
    let call_result: Result<(TResult, ), (_, _)> = call(canister_id, method, args).await;
    if call_result.is_err() {
        let (code, message) = call_result.err().unwrap();
        let code_string = format!("{:?}", code);
        error!(
            "{:?}::{} failed with code {}: {}",
            canister_id, method, code_string, message
        );
        return Err(CommonError::CanisterCallError {
            message,
            rejection_code: code_string,
        });
    }
    let result = call_result.unwrap();
    if logging {
        debug!(
            "Call canister {:?} with method {} result: {:?}",
            canister_id, method, result
        );
    }
    Ok(result.0)
}

async fn call_canister_by_id_as_icns_result<T, TResult>(
    canister_id: Principal,
    method: &str,
    args: T,
) -> ActorResult<TResult>
    where
        T: candid::utils::ArgumentEncoder,
        TResult: for<'a> Deserialize<'a> + CandidType + Debug,
{
    let result = call_core_by_id::<T, ActorResult<TResult>>(canister_id, method, args, true).await;
    match result {
        Ok(result) => result,
        Err(error) => Err(ErrorInfo::from(error)),
    }
}

async fn call_canister_as_icns_result<T, TResult>(
    canister_name: CanisterNames,
    method: &str,
    args: T,
) -> ActorResult<TResult>
    where
        T: candid::utils::ArgumentEncoder,
        TResult: for<'a> Deserialize<'a> + CandidType + Debug,
{
    let result = call_core::<T, ActorResult<TResult>>(canister_name, method, args, true).await;
    match result {
        Ok(result) => result,
        Err(error) => Err(ErrorInfo::from(error)),
    }
}

async fn call_canister_as_result<T, TResult>(
    canister_name: CanisterNames,
    method: &str,
    args: T,
) -> ActorResult<TResult>
    where
        T: candid::utils::ArgumentEncoder,
        TResult: for<'a> Deserialize<'a> + CandidType + Debug,
{
    call_core::<T, TResult>(canister_name, method, args, true)
        .await
        .map_err(ErrorInfo::from)
}

async fn call_canister_as_result_no_logging<T, TResult>(
    canister_name: CanisterNames,
    method: &str,
    args: T,
) -> ActorResult<TResult>
    where
        T: candid::utils::ArgumentEncoder,
        TResult: for<'a> Deserialize<'a> + CandidType + Debug,
{
    call_core::<T, TResult>(canister_name, method, args, false)
        .await
        .map_err(ErrorInfo::from)
}

#[async_trait]
pub trait IManagementApi {
    async fn canister_status(&self, canister_id: Principal) -> ActorResult<CanisterStatusResponse>;
}

#[derive(Serialize, Deserialize, CandidType, Clone, PartialEq, Eq, Debug)]
pub enum CanisterStatus {
    #[serde(rename = "running")]
    running,
    #[serde(rename = "stopping")]
    stopping,
    #[serde(rename = "stopped")]
    stopped,
}

#[derive(Deserialize, CandidType, Clone, PartialEq, Eq, Debug)]
pub struct DefiniteCanisterSettings {
    controllers: Vec<Principal>,
    compute_allocation: Nat,
    memory_allocation: Nat,
    freezing_threshold: Nat,
}

#[derive(Deserialize, CandidType, Clone, PartialEq, Eq, Debug)]
pub struct CanisterStatusResponse {
    status: CanisterStatus,
    settings: DefiniteCanisterSettings,
    module_hash: Option<Vec<u8>>,
    memory_size: Nat,
    cycles: Nat,
    freezing_threshold: Nat,
}
