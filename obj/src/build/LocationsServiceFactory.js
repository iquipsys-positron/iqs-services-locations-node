"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pip_services3_components_node_1 = require("pip-services3-components-node");
const pip_services3_commons_node_1 = require("pip-services3-commons-node");
const LocationsMongoDbPersistence_1 = require("../persistence/LocationsMongoDbPersistence");
const LocationsFilePersistence_1 = require("../persistence/LocationsFilePersistence");
const LocationsMemoryPersistence_1 = require("../persistence/LocationsMemoryPersistence");
const LocationsController_1 = require("../logic/LocationsController");
const LocationsHttpServiceV1_1 = require("../services/version1/LocationsHttpServiceV1");
class LocationsServiceFactory extends pip_services3_components_node_1.Factory {
    constructor() {
        super();
        this.registerAsType(LocationsServiceFactory.MemoryPersistenceDescriptor, LocationsMemoryPersistence_1.LocationsMemoryPersistence);
        this.registerAsType(LocationsServiceFactory.FilePersistenceDescriptor, LocationsFilePersistence_1.LocationsFilePersistence);
        this.registerAsType(LocationsServiceFactory.MongoDbPersistenceDescriptor, LocationsMongoDbPersistence_1.LocationsMongoDbPersistence);
        this.registerAsType(LocationsServiceFactory.ControllerDescriptor, LocationsController_1.LocationsController);
        this.registerAsType(LocationsServiceFactory.HttpServiceDescriptor, LocationsHttpServiceV1_1.LocationsHttpServiceV1);
    }
}
exports.LocationsServiceFactory = LocationsServiceFactory;
LocationsServiceFactory.Descriptor = new pip_services3_commons_node_1.Descriptor("iqs-services-locations", "factory", "default", "default", "1.0");
LocationsServiceFactory.MemoryPersistenceDescriptor = new pip_services3_commons_node_1.Descriptor("iqs-services-locations", "persistence", "memory", "*", "1.0");
LocationsServiceFactory.FilePersistenceDescriptor = new pip_services3_commons_node_1.Descriptor("iqs-services-locations", "persistence", "file", "*", "1.0");
LocationsServiceFactory.MongoDbPersistenceDescriptor = new pip_services3_commons_node_1.Descriptor("iqs-services-locations", "persistence", "mongodb", "*", "1.0");
LocationsServiceFactory.ControllerDescriptor = new pip_services3_commons_node_1.Descriptor("iqs-services-locations", "controller", "default", "*", "1.0");
LocationsServiceFactory.HttpServiceDescriptor = new pip_services3_commons_node_1.Descriptor("iqs-services-locations", "service", "http", "*", "1.0");
//# sourceMappingURL=LocationsServiceFactory.js.map