import config from "./anconConfig";

// Keplr extension injects the offline signer that is compatible with cosmJS.
// You can get this offline signer from `window.getOfflineSigner(chainId:string)` after load event.
// And it also injects the helper function to `window.keplr`.
// If `window.getOfflineSigner` or `window.keplr` is null, Keplr extension may be not installed on browser.
export async function createKeplrWallet() {
  //@ts-ignore
  if (!window.getOfflineSigner || !window.keplr) {
    alert("Please install keplr extension");
  } else {
    //@ts-ignore
    if (window.keplr.experimentalSuggestChain) {
      try {
        // Keplr v0.6.4 introduces an experimental feature that supports the feature to suggests the chain from a webpage.
        // cosmoshub-3 is integrated to Keplr so the code should return without errors.
        // The code below is not needed for cosmoshub-3, but may be helpful if you’re adding a custom chain.
        // If the user approves, the chain will be added to the user's Keplr extension.
        // If the user rejects it or the suggested chain information doesn't include the required fields, it will throw an error.
        // If the same chain id is already registered, it will resolve and not require the user interactions.
        //@ts-ignore
        await window.keplr.experimentalSuggestChain(config);

      } catch {
        alert("Failed to suggest the chain");
      }
    } else {
      alert("Please use the recent version of keplr extension");
    }
  }

  // You should request Keplr to enable the wallet.
  // This method will ask the user whether or not to allow access if they haven't visited this website.
  // Also, it will request user to unlock the wallet if the wallet is locked.
  // If you don't request enabling before usage, there is no guarantee that other methods will work.
  //@ts-ignore
  await keplr.enable(config.chainId);
  //@ts-ignore
  const offlineSigner = getOfflineSignerAuto(config.chainId);

  // You can get the address/public keys by `getAccounts` method.
  // It can return the array of address/public key.
  // But, currently, Keplr extension manages only one address/public key pair.
  // XXX: This line is needed to set the sender address for SigningCosmosClient.
  //@ts-ignore
  const accounts = await offlineSigner.getAccounts();

  return ({config, accounts, offlineSigner})
}
