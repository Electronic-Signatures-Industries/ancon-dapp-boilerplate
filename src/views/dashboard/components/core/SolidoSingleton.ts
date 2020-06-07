import { MiddlewareOptions, XDVMiddleware } from '@/libs';


export class SolidoSingleton {
  public static props: MiddlewareOptions | XDVMiddleware;
  public static setProps(props: MiddlewareOptions | XDVMiddleware) {
    SolidoSingleton.props = props;
  }
  public static getProps(): Promise<MiddlewareOptions | XDVMiddleware> {
    return new Promise((resolve, reject) => {
      if (!!SolidoSingleton.props) {
        resolve(SolidoSingleton.props);
      }
    });
  }
}
