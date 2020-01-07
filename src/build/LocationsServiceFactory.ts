import { Factory } from 'pip-services3-components-node';
import { Descriptor } from 'pip-services3-commons-node';

import { LocationsMongoDbPersistence } from '../persistence/LocationsMongoDbPersistence';
import { LocationsFilePersistence } from '../persistence/LocationsFilePersistence';
import { LocationsMemoryPersistence } from '../persistence/LocationsMemoryPersistence';
import { LocationsController } from '../logic/LocationsController';
import { LocationsHttpServiceV1 } from '../services/version1/LocationsHttpServiceV1';

export class LocationsServiceFactory extends Factory {
	public static Descriptor = new Descriptor("iqs-services-locations", "factory", "default", "default", "1.0");
	public static MemoryPersistenceDescriptor = new Descriptor("iqs-services-locations", "persistence", "memory", "*", "1.0");
	public static FilePersistenceDescriptor = new Descriptor("iqs-services-locations", "persistence", "file", "*", "1.0");
	public static MongoDbPersistenceDescriptor = new Descriptor("iqs-services-locations", "persistence", "mongodb", "*", "1.0");
	public static ControllerDescriptor = new Descriptor("iqs-services-locations", "controller", "default", "*", "1.0");
	public static HttpServiceDescriptor = new Descriptor("iqs-services-locations", "service", "http", "*", "1.0");
	
	constructor() {
		super();
		this.registerAsType(LocationsServiceFactory.MemoryPersistenceDescriptor, LocationsMemoryPersistence);
		this.registerAsType(LocationsServiceFactory.FilePersistenceDescriptor, LocationsFilePersistence);
		this.registerAsType(LocationsServiceFactory.MongoDbPersistenceDescriptor, LocationsMongoDbPersistence);
		this.registerAsType(LocationsServiceFactory.ControllerDescriptor, LocationsController);
		this.registerAsType(LocationsServiceFactory.HttpServiceDescriptor, LocationsHttpServiceV1);
	}
	
}
