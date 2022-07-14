use crate::Principal;
use common::canister_api::ic_impl::ManagementApi;
use common::canister_api::{CanisterStatusResponse, IManagementApi};
use common::errors::ServiceResult;
use log::debug;
use std::sync::Arc;

pub struct MonitorService {
    pub management_api: Arc<dyn IManagementApi>,
}

impl Default for MonitorService {
    fn default() -> Self {
        MonitorService {
            management_api: Arc::new(ManagementApi::default()),
        }
    }
}

impl MonitorService {
    pub async fn get_canister_status(
        &self,
        canister_id: Principal,
    ) -> ServiceResult<CanisterStatusResponse> {
        debug!("canister_id= {:?}", canister_id);
        let result = self.management_api.canister_status(canister_id).await;
        match result {
            Ok(response) => Ok(response),
            Err(response) => Err(response.into()),
        }
    }
}
