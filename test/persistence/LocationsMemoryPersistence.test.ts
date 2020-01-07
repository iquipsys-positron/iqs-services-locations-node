import { ConfigParams } from 'pip-services3-commons-node';

import { LocationsMemoryPersistence } from '../../src/persistence/LocationsMemoryPersistence';
import { LocationsPersistenceFixture } from './LocationsPersistenceFixture';

suite('LocationsMemoryPersistence', ()=> {
    let persistence: LocationsMemoryPersistence;
    let fixture: LocationsPersistenceFixture;
    
    setup((done) => {
        persistence = new LocationsMemoryPersistence();
        persistence.configure(new ConfigParams());
        
        fixture = new LocationsPersistenceFixture(persistence);
        
        persistence.open(null, done);
    });
    
    teardown((done) => {
        persistence.close(null, done);
    });
        
    test('CRUD Operations', (done) => {
        fixture.testCrudOperations(done);
    });

    test('Get with Filters', (done) => {
        fixture.testGetWithFilter(done);
    });

});