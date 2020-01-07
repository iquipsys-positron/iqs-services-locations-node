import { DataPage } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { LocationV1 } from '../data/version1/LocationV1';
export interface ILocationsController {
    getLocations(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<LocationV1>) => void): void;
    getLocationById(correlationId: string, location_id: string, callback: (err: any, location: LocationV1) => void): void;
    createLocation(correlationId: string, location: LocationV1, callback: (err: any, location: LocationV1) => void): void;
    updateLocation(correlationId: string, location: LocationV1, callback: (err: any, location: LocationV1) => void): void;
    deleteLocationById(correlationId: string, location_id: string, callback: (err: any, location: LocationV1) => void): void;
}
