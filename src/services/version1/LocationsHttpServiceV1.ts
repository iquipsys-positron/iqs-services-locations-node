import { Descriptor } from 'pip-services3-commons-node';
import { CommandableHttpService } from 'pip-services3-rpc-node';

export class LocationsHttpServiceV1 extends CommandableHttpService {
    public constructor() {
        super('v1/locations');
        this._dependencyResolver.put('controller', new Descriptor('iqs-services-locations', 'controller', 'default', '*', '1.0'));
    }
}