import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { IGetter } from 'pip-services3-data-node';
import { IWriter } from 'pip-services3-data-node';

import { LocationV1 } from '../data/version1/LocationV1';

export interface ILocationsPersistence extends IGetter<LocationV1, string>, IWriter<LocationV1, string> {
    getPageByFilter(correlationId: string, filter: FilterParams, paging: PagingParams, 
        callback: (err: any, page: DataPage<LocationV1>) => void): void;

    getOneById(correlationId: string, id: string, 
        callback: (err: any, item: LocationV1) => void): void;

    create(correlationId: string, item: LocationV1, 
        callback: (err: any, item: LocationV1) => void): void;

    update(correlationId: string, item: LocationV1, 
        callback: (err: any, item: LocationV1) => void): void;

    deleteById(correlationId: string, id: string,
        callback: (err: any, item: LocationV1) => void): void;
}
