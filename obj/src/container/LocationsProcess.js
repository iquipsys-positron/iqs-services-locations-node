"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_container_node_1 = require("pip-services3-container-node");
const pip_services3_rpc_node_1 = require("pip-services3-rpc-node");
const LocationsServiceFactory_1 = require("../build/LocationsServiceFactory");
class LocationsProcess extends pip_services3_container_node_1.ProcessContainer {
    constructor() {
        super("locations", "Map locations microservice");
        this._factories.add(new LocationsServiceFactory_1.LocationsServiceFactory);
        this._factories.add(new pip_services3_rpc_node_1.DefaultRpcFactory);
    }
}
exports.LocationsProcess = LocationsProcess;
//# sourceMappingURL=LocationsProcess.js.map