import {Given, Then, When} from "@cucumber/cucumber";
import {CanisterReinstallOptions, reinstall_all} from "../../src/tasks";
import {exec} from "shelljs";
import * as logger from "node-color-log";
import {canister} from "@deland-labs/ic-dev-kit";
import {createDICPActor} from "../../src/scripts/declarations";
import {Principal} from "@dfinity/principal";


export const createActor = (token, user?: string) => {
    switch (token) {
        case "dicp":
            return createDICPActor(user);
        default:
            throw new Error(`Stopping use this to create no token canister`);
    }
}

Then(/^Sleep for "([^"]*)" secs.$/, async function (sec: string) {
    // sleep for secs
    await new Promise(resolve => setTimeout(resolve, parseFloat(sec) * 1000));
});

export const reinstall_canisters = async (names: string[]): Promise<void> => {
    const canisters = {};
    for (const name of names) {
        canisters[name] = true;
    }
    const reinstallOptions: CanisterReinstallOptions = {
        build: false,
        init: false,
        one_by_one: false,
        canisters: {
            monitor: true
        }
    }

    console.info(`Reinstalling canisters: ${JSON.stringify(canisters)}`);

    await reinstall_all(reinstallOptions);
}

Given(/^Reinstall canisters$/,
    async function (data) {
        const target_canisters = data.rows();
        const names: string[] = [];
        for (const item of target_canisters) {
            names.push(item[0]);
        }
        await reinstall_canisters(names);
    });
When(/^canister "([^"]*)" is down$/, async function (canister_name: string) {
    await canister.uninstall_code(canister_name);
});

When(/^stop canister "([^"]*)"$/, async function (name) {
    await canister_stop(name);
});
Then(/^start canister "([^"]*)"$/, async function (name) {
    await canister_start(name);
});


export const canister_stop = (name: string) => {
    const result = exec(`dfx canister stop ${name}`);
    logger.debug(`Stopping canister ${name}`);
}
export const canister_start = (name: string) => {
    const result = exec(`dfx canister start ${name}`);
    logger.debug(`Starting canister ${name}`);
}


export const addMonitorAsController = async (name?: string) => {
    // add main identity as controller of all canisters
    let monitorId = Principal.fromText(canister.get_id('monitor'));
    if (name) {
        const update_result = exec(
            `dfx canister update-settings ${name} --add-controller ${monitorId}`
        );
        if (update_result.code !== 0) {
            throw new Error(update_result.stderr);
        }
    } else {
        const update_result = exec(
            `dfx canister update-settings --all --add-controller ${monitorId}`
        );
        if (update_result.code !== 0) {
            throw new Error(update_result.stderr);
        }
    }

};
