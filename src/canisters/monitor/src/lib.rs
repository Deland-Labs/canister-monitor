mod service;
#[path = "../../../common/common_actor/src/actor.rs"]
mod shared_actor;

use crate::service::MonitorService;
use candid::{candid_method, CandidType, Deserialize, Principal};
use common::canister_api::ic_impl::CanisterIdRequest;
use common::canister_api::CanisterStatusResponse;
use common::errors::{CommonError, ErrorInfo, ServiceResult};
use common::ic_logger::ICLogger;
use common::permissions::must_be_monitor;
use ic_cdk::api;
use ic_cdk::api::call::CallResult;
use ic_cdk::call;
use ic_cdk_macros::*;
use log::info;
use std::sync::Once;
use std::vec::Vec;

#[update(name = "get_canister_status")]
#[candid_method(update, rename = "get_canister_status")]
async fn get_canister_status(canister_id: Principal) -> GetCanisterStatusResponse {
    let user = api::caller();
    let result = must_be_monitor(&user);
    if result.is_err() {
        return GetCanisterStatusResponse::new(Err(result.err().unwrap().into()));
    }
    let _service = MonitorService::default();
    let result: CallResult<(CanisterStatusResponse,)> = call(
        Principal::management_canister(),
        "canister_status",
        (CanisterIdRequest {
            canister_id: canister_id.clone(),
        },),
    )
    .await;

    let result_dto = CanisterStatusResponseDto::new(canister_id, result.unwrap().0);

    GetCanisterStatusResponse::new(Ok(result_dto))
}

#[update(name = "get_canister_status_list")]
#[candid_method(update, rename = "get_canister_status_list")]
async fn get_canister_status_list(canister_ids: Vec<Principal>) -> GetCanisterStatusListResponse {
    let user = api::caller();
    let result = must_be_monitor(&user);
    if result.is_err() {
        return GetCanisterStatusListResponse::new(Err(result.err().unwrap().into()));
    }
    let _service = MonitorService::default();
    let mut list: Vec<GetCanisterStatusResponse> = vec![];
    for canister_id in canister_ids {
        let result: CallResult<(CanisterStatusResponse,)> = call(
            Principal::management_canister(),
            "canister_status",
            (CanisterIdRequest {
                canister_id: canister_id.clone(),
            },),
        )
        .await;

        match result {
            Ok(result) => list.push(GetCanisterStatusResponse::new(Ok(
                CanisterStatusResponseDto::new(canister_id, result.0),
            ))),
            Err(err) => list.push(GetCanisterStatusResponse::new(Err(
                CommonError::CanisterCallError {
                    rejection_code: format!("{:?}", err.0),
                    message: err.1,
                },
            ))),
        };
    }
    GetCanisterStatusListResponse::new(Ok(list))
}

#[derive(Deserialize, CandidType, Clone, PartialEq, Eq, Debug)]
pub struct CanisterStatusResponseDto {
    canister: Principal,
    detail: CanisterStatusResponse,
}

impl CanisterStatusResponseDto {
    pub fn new(canister: Principal, detail: CanisterStatusResponse) -> Self {
        Self { canister, detail }
    }
}

#[derive(CandidType)]
pub enum GetCanisterStatusResponse {
    Ok(CanisterStatusResponseDto),
    Err(ErrorInfo),
}

impl GetCanisterStatusResponse {
    pub fn new(result: ServiceResult<CanisterStatusResponseDto>) -> GetCanisterStatusResponse {
        match result {
            Ok(canister_status) => GetCanisterStatusResponse::Ok(canister_status),
            Err(err) => GetCanisterStatusResponse::Err(err.into()),
        }
    }
}

#[derive(CandidType)]
pub enum GetCanisterStatusListResponse {
    Ok(Vec<GetCanisterStatusResponse>),
    Err(ErrorInfo),
}

impl GetCanisterStatusListResponse {
    pub fn new(
        result: ServiceResult<Vec<GetCanisterStatusResponse>>,
    ) -> GetCanisterStatusListResponse {
        match result {
            Ok(canisters_status) => GetCanisterStatusListResponse::Ok(canisters_status),
            Err(err) => GetCanisterStatusListResponse::Err(err.into()),
        }
    }
}

#[init]
#[candid_method(init)]
#[cfg(feature = "dev_env")]
fn init_function() {
    info!("init function called");

    guard_func().unwrap();
}

#[init]
#[candid_method(init)]
#[cfg(not(feature = "dev_env"))]
fn init_function() {
    info!("init function called");
    guard_func().unwrap();
}

static INIT: Once = Once::new();

fn guard_func() -> Result<(), String> {
    INIT.call_once(|| {
        ICLogger::init("monitor");
    });
    Ok(())
}
candid::export_service!();

#[query(name = "__get_candid_interface_tmp_hack")]
#[candid_method(query, rename = "__get_candid_interface_tmp_hack")]
fn __export_did_tmp_() -> String {
    __export_service()
}
