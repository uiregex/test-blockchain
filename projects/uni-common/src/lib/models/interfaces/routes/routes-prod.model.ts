import { UniRoutesMock } from './routes-mock.model';
import { UniRoutesProdGateways } from './routes-prod-gateways.model';


export interface UniRoutesProd extends UniRoutesMock {
  gateways: Partial<UniRoutesProdGateways>;
}
