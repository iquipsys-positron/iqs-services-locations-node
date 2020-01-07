"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_commons_node_2 = require("pip-services3-commons-node");
const pip_services3_commons_node_3 = require("pip-services3-commons-node");
const pip_services3_commons_node_4 = require("pip-services3-commons-node");
const pip_services3_commons_node_5 = require("pip-services3-commons-node");
const pip_services3_commons_node_6 = require("pip-services3-commons-node");
const pip_services3_commons_node_7 = require("pip-services3-commons-node");
const pip_services3_commons_node_8 = require("pip-services3-commons-node");
const LocationV1Schema_1 = require("../data/version1/LocationV1Schema");
class LocationsCommandSet extends pip_services3_commons_node_1.CommandSet {
    constructor(logic) {
        super();
        this._logic = logic;
        // Register commands to the database
        this.addCommand(this.makeGetLocationsCommand());
        this.addCommand(this.makeGetLocationByIdCommand());
        this.addCommand(this.makeCreateLocationCommand());
        this.addCommand(this.makeUpdateLocationCommand());
        this.addCommand(this.makeDeleteLocationByIdCommand());
    }
    makeGetLocationsCommand() {
        return new pip_services3_commons_node_2.Command("get_locations", new pip_services3_commons_node_5.ObjectSchema(true)
            .withOptionalProperty('filter', new pip_services3_commons_node_7.FilterParamsSchema())
            .withOptionalProperty('paging', new pip_services3_commons_node_8.PagingParamsSchema()), (correlationId, args, callback) => {
            let filter = pip_services3_commons_node_3.FilterParams.fromValue(args.get("filter"));
            let paging = pip_services3_commons_node_4.PagingParams.fromValue(args.get("paging"));
            this._logic.getLocations(correlationId, filter, paging, callback);
        });
    }
    makeGetLocationByIdCommand() {
        return new pip_services3_commons_node_2.Command("get_location_by_id", new pip_services3_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('location_id', pip_services3_commons_node_6.TypeCode.String), (correlationId, args, callback) => {
            let location_id = args.getAsString("location_id");
            this._logic.getLocationById(correlationId, location_id, callback);
        });
    }
    makeCreateLocationCommand() {
        return new pip_services3_commons_node_2.Command("create_location", new pip_services3_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('location', new LocationV1Schema_1.LocationV1Schema()), (correlationId, args, callback) => {
            let location = args.get("location");
            this._logic.createLocation(correlationId, location, callback);
        });
    }
    makeUpdateLocationCommand() {
        return new pip_services3_commons_node_2.Command("update_location", new pip_services3_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('location', new LocationV1Schema_1.LocationV1Schema()), (correlationId, args, callback) => {
            let location = args.get("location");
            this._logic.updateLocation(correlationId, location, callback);
        });
    }
    makeDeleteLocationByIdCommand() {
        return new pip_services3_commons_node_2.Command("delete_location_by_id", new pip_services3_commons_node_5.ObjectSchema(true)
            .withRequiredProperty('location_id', pip_services3_commons_node_6.TypeCode.String), (correlationId, args, callback) => {
            let locationId = args.getAsNullableString("location_id");
            this._logic.deleteLocationById(correlationId, locationId, callback);
        });
    }
}
exports.LocationsCommandSet = LocationsCommandSet;
//# sourceMappingURL=LocationsCommandSet.js.map