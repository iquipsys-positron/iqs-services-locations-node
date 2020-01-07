import { ConfigParams } from 'pip-services3-commons-node';
import { IConfigurable } from 'pip-services3-commons-node';
import { IReferences } from 'pip-services3-commons-node';
import { IReferenceable } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { ICommandable } from 'pip-services3-commons-node';
import { CommandSet } from 'pip-services3-commons-node';
import { LocationV1 } from '../data/version1/LocationV1';
import { ILocationsController } from './ILocationsController';
export declare class LocationsController implements IConfigurable, IReferenceable, ICommandable, ILocationsController {
    private static _defaultConfig;
    private _dependencyResolver;
    private _persistence;
    private _commandSet;
    configure(config: ConfigParams): void;
    setReferences(references: IReferences): void;
    getCommandSet(): CommandSet;
    getLocations(correlationId: string, filter: FilterParams, paging: PagingParams, callback: (err: any, page: DataPage<LocationV1>) => void): void;
    getLocationById(correlationId: string, id: string, callback: (err: any, location: LocationV1) => void): void;
    private fixLocation;
    createLocation(correlationId: string, location: LocationV1, callback: (err: any, location: LocationV1) => void): void;
    updateLocation(correlationId: string, location: LocationV1, callback: (err: any, location: LocationV1) => void): void;
    deleteLocationById(correlationId: string, id: string, callback: (err: any, location: LocationV1) => void): void;
}
