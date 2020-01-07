"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let _ = require('lodash');
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const LocationsCommandSet_1 = require("./LocationsCommandSet");
class LocationsController {
    constructor() {
        this._dependencyResolver = new pip_services3_commons_node_2.DependencyResolver(LocationsController._defaultConfig);
    }
    configure(config) {
        this._dependencyResolver.configure(config);
    }
    setReferences(references) {
        this._dependencyResolver.setReferences(references);
        this._persistence = this._dependencyResolver.getOneRequired('persistence');
    }
    getCommandSet() {
        if (this._commandSet == null)
            this._commandSet = new LocationsCommandSet_1.LocationsCommandSet(this);
        return this._commandSet;
    }
    getLocations(correlationId, filter, paging, callback) {
        this._persistence.getPageByFilter(correlationId, filter, paging, callback);
    }
    getLocationById(correlationId, id, callback) {
        this._persistence.getOneById(correlationId, id, callback);
    }
    fixLocation(location) {
        if (_.isString(location.pos))
            location.pos = JSON.parse(location.pos);
    }
    createLocation(correlationId, location, callback) {
        this.fixLocation(location);
        this._persistence.create(correlationId, location, callback);
    }
    updateLocation(correlationId, location, callback) {
        this.fixLocation(location);
        this._persistence.update(correlationId, location, callback);
    }
    deleteLocationById(correlationId, id, callback) {
        this._persistence.deleteById(correlationId, id, callback);
    }
}
exports.LocationsController = LocationsController;
LocationsController._defaultConfig = pip_services3_commons_node_1.ConfigParams.fromTuples('dependencies.persistence', 'iqs-services-locations:persistence:*:*:1.0');
//# sourceMappingURL=LocationsController.js.map