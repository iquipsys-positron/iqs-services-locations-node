"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_rpc_node_1 = require("pip-services3-rpc-node");
class LocationsHttpServiceV1 extends pip_services3_rpc_node_1.CommandableHttpService {
    constructor() {
        super('v1/locations');
        this._dependencyResolver.put('controller', new pip_services3_commons_node_1.Descriptor('iqs-services-locations', 'controller', 'default', '*', '1.0'));
    }
}
exports.LocationsHttpServiceV1 = LocationsHttpServiceV1;
//# sourceMappingURL=LocationsHttpServiceV1.js.map