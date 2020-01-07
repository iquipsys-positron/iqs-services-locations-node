import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { IdentifiableMemoryPersistence } from 'pip-services3-data-node';
import { LocationV1 } from '../data/version1/LocationV1';
import { ILocationsPersistence } from './ILocationsPersistence';
export declare class LocationsMemoryPersistence extends IdentifiableMemoryPersistence<LocationV1, string> implements ILocationsPersistence {
    constructor();
    private matchString;
    private matchSearch;
    private composeFilter;
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<LocationV1>) => void): void;
}
