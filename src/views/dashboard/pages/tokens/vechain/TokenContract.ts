import BigNumber from 'bignumber.js';
import { interval } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Wallet } from 'xdvplatform-wallet';

export class TokenContract {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    private signer: Wallet,
    private contract: any,
    public defaultAccount: string,
  ) {
  }

  subscribe() {
    return interval(60 * 1000)
      .pipe(
        mergeMap(() => this.contract.methods.balanceOf(this.defaultAccount))
      );
  }

  async send(address: string, amountInWei: string) {
    await this.contract.methods.approve(this.contract.address, (10 * 1e18).toFixed()).call();
    return this.contract.methods.transfer(address, new BigNumber(amountInWei).toFixed())
      .request({
        gasPriceCoef: 128,
        gas: 285_000,
        from: this.defaultAccount
      });
  }


  async balance(address: string) {
    return this.contract.methods.balanceOf(address)
  }
}