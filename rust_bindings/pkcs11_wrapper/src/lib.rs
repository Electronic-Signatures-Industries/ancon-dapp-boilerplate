use wasm_bindgen::prelude::*;


// extern crate pkcs11;

// use std::env;
// use std::path::PathBuf;
// use pkcs11::types::*;
// use pkcs11::Ctx;

// fn pkcs11_module_name() -> PathBuf {
//     let default_path =
//         option_env!("PKCS11_SOFTHSM2_MODULE").unwrap_or("/usr/local/lib/softhsm/libsofthsm2.so");
//     let path = env::var_os("PKCS11_SOFTHSM2_MODULE").unwrap_or_else(|| default_path.into());
//     let path_buf = PathBuf::from(path);

//     if !path_buf.exists() {
//         panic!(
//       "Could not find SoftHSM2 at `{}`. Set the `PKCS11_SOFTHSM2_MODULE` environment variable to \
//        its location.",
//       path_buf.display());
//     }

//     path_buf
// }

#[wasm_bindgen]
pub fn get_info()  {
    // let ctx = Ctx::new_and_initialize(pkcs11_module_name()).unwrap();

    // return ctx.get_info().unwrap();
}