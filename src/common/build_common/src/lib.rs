use anyhow::{Ok, Result};
use env_file_reader::read_file;
use vergen::{vergen, Config};

pub fn generate_envs() -> Result<()> {
    // Generate the default 'cargo:' instruction output

    // generate git info
    vergen(Config::default())?;

    println!("rerun-if-env-changed=MONITOR_CANISTER_ENV");
    let env = if let Some(env) = option_env!("MONITOR_CANISTER_ENV") {
        env
    } else {
        "dev"
    };
    println!("load env: {}", env);
    println!("warning={}", env);

    // enable features dev_env if env is dev
    if env == "dev" {
        println!("cargo:rustc-cfg=features=\"dev_env\"");
    }

    // load env files
    let env_parts = vec!["canister_ids", "config", "principals"];
    for env_part in env_parts {
        let env_variables = read_file(format!("../../env_configs/{}.{}.env", env, env_part))?;
        for (key, value) in env_variables {
            println!("cargo:rustc-env={}={}", key, value.replace("\n", "||||"));
        }
    }

    Ok(())
}
