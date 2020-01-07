let _ = require('lodash');

import { ConfigParams } from 'pip-services3-commons-node';
import { IConfigurable } from 'pip-services3-commons-node';
import { IReferences } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';
import { IReferenceable } from 'pip-services3-commons-node';
import { DependencyResolver } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { DataPage } from 'pip-services3-commons-node';
import { ICommandable } from 'pip-services3-commons-node';
import { CommandSet } from 'pip-services3-commons-node';

import { LocationV1 } from '../data/version1/LocationV1';
import { ILocationsPersistence } from '../persistence/ILocationsPersistence';
import { ILocationsController } from './ILocationsController';
import { LocationsCommandSet } from './LocationsCommandSet';

export class LocationsController implements  IConfigurable, IReferenceable, ICommandable, ILocationsController {
    private static _defaultConfig: ConfigParams = ConfigParams.fromTuples(
        'dependencies.persistence', 'iqs-services-locations:persistence:*:*:1.0'
    );

    private _dependencyResolver: DependencyResolver = new DependencyResolver(LocationsController._defaultConfig);
    private _persistence: ILocationsPersistence;
    private _commandSet: LocationsCommandSet;

    public configure(config: ConfigParams): void {
        this._dependencyResolver.configure(config);
    }

    public setReferences(references: IReferences): void {
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired<ILocationsPersistence>('persistence');
    }

    public getCommandSet(): CommandSet {
        if (this._commandSet == null)
            this._commandSet = new LocationsCommandSet(this);
        return this._commandSet;
    }
    
    public getLocations(correlationId: string, filter: FilterParams, paging: PagingParams, 
        callback: (err: any, page: DataPage<LocationV1>) => void): void {
        this._persistence.getPageByFilter(correlationId, filter, paging, callback);
    }

    public getLocationById(correlationId: string, id: string, 
        callback: (err: any, location: LocationV1) => void): void {
        this._persistence.getOneById(correlationId, id, callback);
    }

    private fixLocation(location: LocationV1): void {
        if (_.isString(location.pos))
            location.pos = JSON.parse(location.pos);
    }

    public createLocation(correlationId: string, location: LocationV1, 
        callback: (err: any, location: LocationV1) => void): void {
        this.fixLocation(location);
        this._persistence.create(correlationId, location, callback);
    }

    public updateLocation(correlationId: string, location: LocationV1, 
        callback: (err: any, location: LocationV1) => void): void {
        this.fixLocation(location);
        this._persistence.update(correlationId, location, callback);
    }

    public deleteLocationById(correlationId: string, id: string,
        callback: (err: any, location: LocationV1) => void): void {  
        this._persistence.deleteById(correlationId, id, callback);
    }

}
