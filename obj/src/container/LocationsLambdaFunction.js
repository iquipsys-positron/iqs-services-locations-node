"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const pip_services3_aws_node_1 = require("pip-services3-aws-node");
const LocationsServiceFactory_1 = require("../build/LocationsServiceFactory");
class LocationsLambdaFunction extends pip_services3_aws_node_1.CommandableLambdaFunction {
    constructor() {
        super("locations", "Map locations function");
        this._dependencyResolver.put('controller', new pip_services3_commons_node_1.Descriptor('iqs-services-locations', 'controller', 'default', '*', '*'));
        this._factories.add(new LocationsServiceFactory_1.LocationsServiceFactory());
    }
}
exports.LocationsLambdaFunction = LocationsLambdaFunction;
exports.handler = new LocationsLambdaFunction().getHandler();
//# sourceMappingURL=LocationsLambdaFunction.js.map