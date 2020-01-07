let _ = require('lodash');
let async = require('async');
let restify = require('restify');
let assert = require('chai').assert;

import { ConfigParams } from 'pip-services3-commons-node';
import { Descriptor } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';

import { LocationV1 } from '../../../src/data/version1/LocationV1';
import { LocationsMemoryPersistence } from '../../../src/persistence/LocationsMemoryPersistence';
import { LocationsController } from '../../../src/logic/LocationsController';
import { LocationsHttpServiceV1 } from '../../../src/services/version1/LocationsHttpServiceV1';

let httpConfig = ConfigParams.fromTuples(
    "connection.protocol", "http",
    "connection.host", "localhost",
    "connection.port", 3000
);

let LOCATION1: LocationV1 = {
    id: '1',
    org_id: '1',
    name: 'Location 1',
    pos: { type: 'Point', coordinates: [32, -110] }
};
let LOCATION2: LocationV1 = {
    id: '2',
    org_id: '1',
    name: 'Location 2',
    pos: { type: 'Point', coordinates: [33, -110] }
};

suite('LocationsHttpServiceV1', ()=> {    
    let service: LocationsHttpServiceV1;
    let rest: any;

    suiteSetup((done) => {
        let persistence = new LocationsMemoryPersistence();
        let controller = new LocationsController();

        service = new LocationsHttpServiceV1();
        service.configure(httpConfig);

        let references: References = References.fromTuples(
            new Descriptor('iqs-services-locations', 'persistence', 'memory', 'default', '1.0'), persistence,
            new Descriptor('iqs-services-locations', 'controller', 'default', 'default', '1.0'), controller,
            new Descriptor('iqs-services-locations', 'service', 'http', 'default', '1.0'), service
        );
        controller.setReferences(references);
        service.setReferences(references);

        service.open(null, done);
    });
    
    suiteTeardown((done) => {
        service.close(null, done);
    });

    setup(() => {
        let url = 'http://localhost:3000';
        rest = restify.createJsonClient({ url: url, version: '*' });
    });
    
    
    test('CRUD Operations', (done) => {
        let location1, location2;

        async.series([
        // Create one location
            (callback) => {
                rest.post('/v1/locations/create_location',
                    {
                        location: LOCATION1
                    },
                    (err, req, res, location) => {
                        assert.isNull(err);

                        assert.isObject(location);
                        assert.equal(location.name, LOCATION1.name);
                        assert.equal(location.org_id, LOCATION1.org_id);
                        assert.isNotNull(location.pos);

                        location1 = location;

                        callback();
                    }
                );
            },
        // Create another location
            (callback) => {
                rest.post('/v1/locations/create_location', 
                    {
                        location: LOCATION2
                    },
                    (err, req, res, location) => {
                        assert.isNull(err);

                        assert.isObject(location);
                        assert.equal(location.name, LOCATION2.name);
                        assert.equal(location.org_id, LOCATION2.org_id);
                        assert.isNotNull(location.pos);
                    
                        location2 = location;

                        callback();
                    }
                );
            },
        // Get all locations
            (callback) => {
                rest.post('/v1/locations/get_locations',
                    {},
                    (err, req, res, page) => {
                        assert.isNull(err);

                        assert.isObject(page);
                        assert.lengthOf(page.data, 2);

                        callback();
                    }
                );
            },
        // Update the location
            (callback) => {
                location1.name = 'Updated location 1';

                rest.post('/v1/locations/update_location',
                    { 
                        location: location1
                    },
                    (err, req, res, location) => {
                        assert.isNull(err);

                        assert.isObject(location);
                        assert.equal(location.name, 'Updated location 1');
                        assert.equal(location.id, location1.id);

                        location1 = location;

                        callback();
                    }
                );
            },
        // Delete location
            (callback) => {
                rest.post('/v1/locations/delete_location_by_id',
                    {
                        location_id: location1.id
                    },
                    (err, req, res, result) => {
                        assert.isNull(err);

                        //assert.isNull(result);

                        callback();
                    }
                );
            },
        // Try to get delete location
            (callback) => {
                rest.post('/v1/locations/get_location_by_id',
                    {
                        location_id: location1.id
                    },
                    (err, req, res, result) => {
                        assert.isNull(err);

                        //assert.isNull(result);

                        callback();
                    }
                );
            }
        ], done);
    });
});