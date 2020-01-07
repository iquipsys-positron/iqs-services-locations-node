let _ = require('lodash');
let async = require('async');
let assert = require('chai').assert;

import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';

import { LocationV1 } from '../../src/data/version1/LocationV1';

import { ILocationsPersistence } from '../../src/persistence/ILocationsPersistence';

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
let LOCATION3: LocationV1 = {
    id: '3',
    org_id: '2',
    name: 'Location 3',
    pos: { type: 'Point', coordinates: [32, -111] }
};

export class LocationsPersistenceFixture {
    private _persistence: ILocationsPersistence;
    
    constructor(persistence) {
        assert.isNotNull(persistence);
        this._persistence = persistence;
    }

    private testCreateLocations(done) {
        async.series([
        // Create one location
            (callback) => {
                this._persistence.create(
                    null,
                    LOCATION1,
                    (err, location) => {
                        assert.isNull(err);

                        assert.isObject(location);
                        assert.equal(location.name, LOCATION1.name);
                        assert.equal(location.org_id, LOCATION1.org_id);
                        assert.isNotNull(location.pos);

                        callback();
                    }
                );
            },
        // Create another location
            (callback) => {
                this._persistence.create(
                    null,
                    LOCATION2,
                    (err, location) => {
                        assert.isNull(err);

                        assert.isObject(location);
                        assert.equal(location.name, LOCATION2.name);
                        assert.equal(location.org_id, LOCATION2.org_id);
                        assert.isNotNull(location.pos);

                        callback();
                    }
                );
            },
        // Create yet another location
            (callback) => {
                this._persistence.create(
                    null,
                    LOCATION3,
                    (err, location) => {
                        assert.isNull(err);

                        assert.isObject(location);
                        assert.equal(location.name, LOCATION3.name);
                        assert.equal(location.org_id, LOCATION3.org_id);
                        assert.isNotNull(location.pos);

                        callback();
                    }
                );
            }
        ], done);
    }
                
    public testCrudOperations(done) {
        let location1: LocationV1;

        async.series([
        // Create items
            (callback) => {
                this.testCreateLocations(callback);
            },
        // Get all locations
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    new FilterParams(),
                    new PagingParams(),
                    (err, page) => {
                        assert.isNull(err);

                        assert.isObject(page);
                        assert.lengthOf(page.data, 3);

                        location1 = page.data[0];

                        callback();
                    }
                );
            },
        // Update the location
            (callback) => {
                location1.name = 'Updated location 1';

                this._persistence.update(
                    null,
                    location1,
                    (err, location) => {
                        assert.isNull(err);

                        assert.isObject(location);
                        assert.equal(location.name, 'Updated location 1');
                        assert.equal(location.id, location1.id);

                        callback();
                    }
                );
            },
        // Delete location
            (callback) => {
                this._persistence.deleteById(
                    null,
                    location1.id,
                    (err) => {
                        assert.isNull(err);

                        callback();
                    }
                );
            },
        // Try to get delete location
            (callback) => {
                this._persistence.getOneById(
                    null,
                    location1.id,
                    (err, location) => {
                        assert.isNull(err);

                        assert.isNull(location || null);

                        callback();
                    }
                );
            }
        ], done);
    }

    testGetWithFilter(done) {
        async.series([
        // Create locations
            (callback) => {
                this.testCreateLocations(callback);
            },
        // Get locations filtered by tags
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    FilterParams.fromValue({
                        search: '1'
                    }),
                    new PagingParams(),
                    (err, locations) => {
                        assert.isNull(err);

                        assert.isObject(locations);
                        assert.lengthOf(locations.data, 1);

                        callback();
                    }
                );
            },
        // Get locations except certain ids
            (callback) => {
                this._persistence.getPageByFilter(
                    null,
                    FilterParams.fromValue({
                        org_id: '1'
                    }),
                    new PagingParams(),
                    (err, locations) => {
                        assert.isNull(err);

                        assert.isObject(locations);
                        assert.lengthOf(locations.data, 2);

                        callback();
                    }
                );
            }
        ], done);
    }

}
