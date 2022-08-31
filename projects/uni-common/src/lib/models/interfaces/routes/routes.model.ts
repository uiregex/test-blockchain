import { UniRoutesProd } from './routes-prod.model';
import { UniRoutesMock } from './routes-mock.model';


export interface UniRoutes {
  prod: UniRoutesProd;
  mock: UniRoutesMock;
}
