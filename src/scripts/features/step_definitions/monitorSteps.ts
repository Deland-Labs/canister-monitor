import {DataTable, Given, Then, When} from "@cucumber/cucumber";
import {createMonitorActor} from "../../src/scripts/declarations";
import {identity, dfxJson, canister} from '@deland-labs/ic-dev-kit';
import logger from "node-color-log";
import {Principal} from "@dfinity/principal";
import {addMonitorAsController} from "./utils";
import {assert, expect} from "chai";

Given(/^Check Monitor Status$/, async function () {


    await addMonitorAsController('dicp');
    const actor = await createMonitorActor('icnaming_monitor');
    const targetCanisterId = canister.get_id('dicp')
    logger.debug("dicp:", targetCanisterId);
    const result = await actor.get_canister_status(Principal.fromText(targetCanisterId));
    logger.debug(`result: ${JSON.stringify(result)}`);
    if ('Ok' in result) {
        expect(result.Ok).not.undefined;
    } else {
        assert(false, "failed");
    }
});
Given(/^Check Monitors Status$/, async function () {
    await addMonitorAsController('dicp');
    await addMonitorAsController('monitor');
    const actor = await createMonitorActor('icnaming_monitor');

    let targetCanisterIds = [canister.get_id('dicp'), canister.get_id('monitor')];
    targetCanisterIds = targetCanisterIds.map(a => Principal.fromText(a));
    logger.debug("ids:", targetCanisterIds);
    const result = await actor.get_canister_status_list(targetCanisterIds);
    logger.debug(`result: ${JSON.stringify(result)}`);
    if ('Ok' in result) {
        expect(result.Ok.length).is.gte(2);
    } else {
        assert(false, "failed");
    }
});
