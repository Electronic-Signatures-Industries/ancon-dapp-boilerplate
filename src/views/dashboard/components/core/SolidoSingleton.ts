import { Issuer } from 'did-jwt-vc';
import { MiddlewareOptions } from '@/libs';
import { Resolver } from 'did-resolver';


export class SolidoSingleton {
  public static props: MiddlewareOptions;
  public static setProps(props: MiddlewareOptions) {
    SolidoSingleton.props = props;
  }
  public static getProps(): Promise<MiddlewareOptions> {
    return new Promise((resolve, reject) => {
      if (!!SolidoSingleton.props) {
        resolve(SolidoSingleton.props);
      }
    });
  }
}
