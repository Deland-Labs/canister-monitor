import {DataTable, Given, Then, When} from "@cucumber/cucumber";
import {defaultPVADecimals} from "../../src/scripts/utils/PVADecimals";
import {CanisterReinstallOptions, DFTInitOptions, reinstall_all} from "../../src/tasks";
import {canister, identity, unit} from "@deland-labs/ic-dev-kit";
import logger from "node-color-log";
import * as math from "mathjs";

Given(/^Reinstall dft canisters$/, async (rawTable) => {
    const optionArray: DftInstallOption[] = rawTable.hashes();
    // dft dicp option
    const dftDICPOption = optionArray.find(o => o.key === "dicp");
    const dftWICPInitOptions = dftDICPOption ? parseToDFTInitOptions(dftDICPOption) : undefined;
    // dft ark option
    const dftARKOption = optionArray.find(o => o.key === "ark");
    const dftARKInitOptions = dftARKOption ? parseToDFTInitOptions(dftARKOption) : undefined;
    // dft mintable option
    const dftMintableOptions = optionArray.find(o => o.key === "token_mintable");
    const dftMintableInitOptions = dftMintableOptions ? parseToDFTInitOptions(dftMintableOptions) : undefined;


    // check dftWUSDOption and dftWICPOption is exist
    defaultPVADecimals.setAmountDecimals(Number(dftDICPOption?.decimals) ?? 0);
    defaultPVADecimals.setVolumeDecimals(Number(dftARKInitOptions?.decimals) ?? 0);

    const reinstallOptions: CanisterReinstallOptions = {
        build: false,
        init: true,
        one_by_one: true,
        canisters: {
            dicp: dftWICPInitOptions ? {
                reinstall: true,
                initOptions: dftWICPInitOptions
            } : undefined,

        }
    };
    await reinstall_all(reinstallOptions);
    logger.debug(`option array: ${JSON.stringify(optionArray)}`);
});

interface DftInstallOption {
    key: string;
    name: string;
    symbol: string;
    decimals: string;
    total_supply: string;
    fee_minimum?: string;
    fee_rate?: string;
    rate_decimals?: string;
    owner: string;
    archive?: string;
    threshold?: string;
}

const parseToDFTInitOptions = (option: DftInstallOption): DFTInitOptions => {
    logger.debug(`option is ${JSON.stringify(option)}`);
    logger.debug(identity.identityFactory.getPrincipal(option.owner)!.toText());
    logger.debug(identity.identityFactory.getIdentity(option.owner)!.identity.getPrincipal().toText());
    const decimals = parseInt(option.decimals);
    logger.debug(`decimals: ${option.decimals}`);
    const feeDecimals = parseInt(option.rate_decimals ?? '0');

    return {
        name: String(option.name),
        symbol: String(option.symbol),
        decimals: BigInt(decimals),
        totalSupply: unit.parseToOrigin(math.evaluate(option.total_supply), decimals),
        fee: {
            minimum: Number(unit.parseToOrigin(option.fee_minimum ?? '0', decimals)),
            rate: Number(unit.parseToOrigin(option.fee_rate ?? '0', feeDecimals)),
            rate_decimals: feeDecimals,
        },
        desc: [],
        owner: identity.identityFactory.getPrincipal(option.owner)!.toText(),
        archive: Number(option.archive),
        threshold: Number(option.threshold),
    };
}
