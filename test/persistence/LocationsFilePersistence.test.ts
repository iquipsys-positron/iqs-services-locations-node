import { ConfigParams } from 'pip-services3-commons-node';

import { LocationsFilePersistence } from '../../src/persistence/LocationsFilePersistence';
import { LocationsPersistenceFixture } from './LocationsPersistenceFixture';

suite('LocationsFilePersistence', ()=> {
    let persistence: LocationsFilePersistence;
    let fixture: LocationsPersistenceFixture;
    
    setup((done) => {
        persistence = new LocationsFilePersistence('./data/locations.test.json');

        fixture = new LocationsPersistenceFixture(persistence);

        persistence.open(null, (err) => {
            persistence.clear(null, done);
        });
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