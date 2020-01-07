let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { Descriptor } from 'pip-services3-commons-node';
import { ConfigParams } from 'pip-services3-commons-node';
import { References } from 'pip-services3-commons-node';
import { ConsoleLogger } from 'pip-services3-components-node';

import { LocationV1 } from '../../src/data/version1/LocationV1';
import { LocationsMemoryPersistence } from '../../src/persistence/LocationsMemoryPersistence';
import { LocationsController } from '../../src/logic/LocationsController';
import { LocationsLambdaFunction } from '../../src/container/LocationsLambdaFunction';

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

suite('LocationsLambdaFunction', ()=> {
    let lambda: LocationsLambdaFunction;

    suiteSetup((done) => {
        let config = ConfigParams.fromTuples(
            'logger.descriptor', 'pip-services:logger:console:default:1.0',
            'persistence.descriptor', 'iqs-services-locations:persistence:memory:default:1.0',
            'controller.descriptor', 'iqs-services-locations:controller:default:default:1.0'
        );

        lambda = new LocationsLambdaFunction();
        lambda.configure(config);
        lambda.open(null, done);
    });
    
    suiteTeardown((done) => {
        lambda.close(null, done);
    });
    
    test('CRUD Operations', (done) => {
        var location1, location2;

        async.series([
        // Create one location
            (callback) => {
                lambda.act(
                    {
                        role: 'locations',
                        cmd: 'create_location',
                        location: LOCATION1
                    },
                    (err, location) => {
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
                lambda.act(
                    {
                        role: 'locations',
                        cmd: 'create_location',
                        location: LOCATION2
                    },
                    (err, location) => {
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
                lambda.act(
                    {
                        role: 'locations',
                        cmd: 'get_locations' 
                    },
                    (err, page) => {
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

                lambda.act(
                    {
                        role: 'locations',
                        cmd: 'update_location',
                        location: location1
                    },
                    (err, location) => {
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
                lambda.act(
                    {
                        role: 'locations',
                        cmd: 'delete_location_by_id',
                        location_id: location1.id
                    },
                    (err) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
        // Try to get delete location
            (callback) => {
                lambda.act(
                    {
                        role: 'locations',
                        cmd: 'get_location_by_id',
                        location_id: location1.id
                    },
                    (err, location) => {
                        assert.isNull(err);

                        assert.isNull(location || null);

                        callback();
                    }
                );
            }
        ], done);
    });
});