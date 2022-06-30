use super::*;
use crate::canister_api::{
    call_canister_by_id_as_icns_result, CanisterStatusResponse, IManagementApi,
};
use crate::errors::ActorResult;
use crate::Principal;

#[derive(Debug, Default)]
pub struct ManagementApi {}

#[derive(CandidType, Debug, Clone, Deserialize)]
pub struct CanisterIdRequest {
    #[serde(rename = "canister_id")]
    pub canister_id: Principal,
}

#[async_trait]
impl IManagementApi for ManagementApi {
    async fn canister_status(&self, canister_id: Principal) -> ActorResult<CanisterStatusResponse> {
        let management_id = Principal::management_canister();
        call_canister_by_id_as_icns_result(
            management_id.clone(),
            "canister_status",
            (CanisterIdRequest {
                canister_id: canister_id.clone(),
            },),
        )
        .await
    }
}
