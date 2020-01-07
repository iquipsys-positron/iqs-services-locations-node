import { ConfigParams } from 'pip-services3-commons-node';
import { JsonFilePersister } from 'pip-services3-data-node';
import { LocationsMemoryPersistence } from './LocationsMemoryPersistence';
import { LocationV1 } from '../data/version1/LocationV1';
export declare class LocationsFilePersistence extends LocationsMemoryPersistence {
    protected _persister: JsonFilePersister<LocationV1>;
    constructor(path?: string);
    configure(config: ConfigParams): void;
}
