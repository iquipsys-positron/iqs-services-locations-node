import { IReferences } from 'pip-services3-commons-node';
import { ProcessContainer } from 'pip-services3-container-node';
import { DefaultRpcFactory } from 'pip-services3-rpc-node';

import { LocationsServiceFactory } from '../build/LocationsServiceFactory';

export class LocationsProcess extends ProcessContainer {

    public constructor() {
        super("locations", "Map locations microservice");
        this._factories.add(new LocationsServiceFactory);
        this._factories.add(new DefaultRpcFactory);
    }

}
