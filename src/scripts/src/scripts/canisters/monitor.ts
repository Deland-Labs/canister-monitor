import {ReInstallOptions} from "~/utils/canister";
import { canister } from '@deland-labs/ic-dev-kit'

const build = () => {
    canister.build('monitor')
}

const reinstall_by_dfx = async () => {
    await canister.reinstall_code('monitor')
}
const init = () => {
}

export const reinstall = async (options?: ReInstallOptions) => {
    if (options?.build) {
        build()
    }
    await reinstall_by_dfx()

    if (options?.init) {
        init()
    }
}
