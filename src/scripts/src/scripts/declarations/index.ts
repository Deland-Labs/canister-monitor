import {createActor as createBlindBoxCanister} from "~/declarations/blind_box";
import {createActor as createExchangeCanister} from "~/declarations/exchange";
import {createActor as createDICP} from "~/declarations/dicp";
import {createActor as createARK} from "~/declarations/ark";
import {createActor as createMintable} from "~/declarations/token_mintable";
import {createActor as createRegistrar} from "~/declarations/registrar";
import {createActor as createMonitor} from "~/declarations/monitor";
import {canister, identity} from '@deland-labs/ic-dev-kit'
import {Principal} from "@dfinity/principal";
import logger from "node-color-log";

const createBlindBoxActor = (user?: string) => {
    const canisterId = canister.get_id("blind_box");
    if (user === undefined) {
        return createBlindBoxCanister(canisterId, {
            agentOptions: {host: identity.identityFactory.getDefaultHost()},
        });
    }
    const identityInfo = identity.identityFactory.getIdentity(user)!;

    return createBlindBoxCanister(canisterId, {
        agentOptions: identityInfo.agentOptions,
    });
};

const createExchangeActor = (user?: string) => {
    const canisterId = canister.get_id("exchange");
    if (user === undefined) {
        return createExchangeCanister(canisterId, {
            agentOptions: {host: identity.identityFactory.getDefaultHost()},
        });
    }
    const identityInfo = identity.identityFactory.getIdentity(user)!;
    return createExchangeCanister(canisterId, {
        agentOptions: identityInfo.agentOptions,
    });
};

const createDICPActor = (user?: string) => {
    const canisterId = canister.get_id("dicp");
    if (user === undefined) {
        return createDICP(canisterId, {
            agentOptions: {host: identity.identityFactory.getDefaultHost()},
        });
    }
    const identityInfo = identity.identityFactory.getIdentity(user)!;
    return createDICP(canisterId, {
        agentOptions: identityInfo.agentOptions,
    });
};

// create ark actor
const createARKActor = (user?: string) => {
    const canisterId = canister.get_id("ark");
    if (user === undefined) {
        return createARK(canisterId, {
            agentOptions: {host: identity.identityFactory.getDefaultHost()},
        });
    }
    const identityInfo = identity.identityFactory.getIdentity(user)!;
    return createARK(canisterId, {
        agentOptions: identityInfo.agentOptions,
    });
};
const createMintableActor = (user?: string) => {
    const canisterId = canister.get_id("token_mintable");
    if (user === undefined) {
        return createMintable(canisterId, {
            agentOptions: {host: identity.identityFactory.getDefaultHost()},
        });
    }
    const identityInfo = identity.identityFactory.getIdentity(user)!;
    return createMintable(canisterId, {
        agentOptions: identityInfo.agentOptions,
    });
};

const createRegistrarActor = (user?: string) => {
    const canisterId = canister.get_id("registrar");
    if (user === undefined) {
        return createRegistrar(canisterId, {
            agentOptions: {host: identity.identityFactory.getDefaultHost()},
        });
    }
    const identityInfo = identity.identityFactory.getIdentity(user)!;
    return createRegistrar(canisterId, {
        agentOptions: identityInfo.agentOptions,
    });
};

const createMonitorActor = (user?: string) => {
    const canisterId = canister.get_id("monitor");
    logger.debug("canisterId=", canisterId);
    if (user === undefined) {
        return createMonitor(canisterId, {
            agentOptions: {host: identity.identityFactory.getDefaultHost()},
        });
    }
    const identityInfo = identity.identityFactory.getIdentity(user)!;
    return createMonitor(canisterId, {
        agentOptions: identityInfo.agentOptions,
    });
};

export {
    createBlindBoxActor,
    createExchangeActor,
    createDICPActor,
    createARKActor,
    createMintableActor,
    createRegistrarActor,
    createMonitorActor
};
