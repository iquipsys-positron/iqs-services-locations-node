import { CommandSet } from 'pip-services3-commons-node';
import { ICommand } from 'pip-services3-commons-node';
import { Command } from 'pip-services3-commons-node';
import { Schema } from 'pip-services3-commons-node';
import { Parameters } from 'pip-services3-commons-node';
import { FilterParams } from 'pip-services3-commons-node';
import { PagingParams } from 'pip-services3-commons-node';
import { ObjectSchema } from 'pip-services3-commons-node';
import { TypeCode } from 'pip-services3-commons-node';
import { FilterParamsSchema } from 'pip-services3-commons-node';
import { PagingParamsSchema } from 'pip-services3-commons-node';

import { LocationV1 } from '../data/version1/LocationV1';
import { LocationV1Schema } from '../data/version1/LocationV1Schema';
import { ILocationsController } from './ILocationsController';

export class LocationsCommandSet extends CommandSet {
    private _logic: ILocationsController;

    constructor(logic: ILocationsController) {
        super();

        this._logic = logic;

        // Register commands to the database
		this.addCommand(this.makeGetLocationsCommand());
		this.addCommand(this.makeGetLocationByIdCommand());
		this.addCommand(this.makeCreateLocationCommand());
		this.addCommand(this.makeUpdateLocationCommand());
		this.addCommand(this.makeDeleteLocationByIdCommand());
    }

	private makeGetLocationsCommand(): ICommand {
		return new Command(
			"get_locations",
			new ObjectSchema(true)
				.withOptionalProperty('filter', new FilterParamsSchema())
				.withOptionalProperty('paging', new PagingParamsSchema()),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let filter = FilterParams.fromValue(args.get("filter"));
                let paging = PagingParams.fromValue(args.get("paging"));
                this._logic.getLocations(correlationId, filter, paging, callback);
            }
		);
	}

	private makeGetLocationByIdCommand(): ICommand {
		return new Command(
			"get_location_by_id",
			new ObjectSchema(true)
				.withRequiredProperty('location_id', TypeCode.String),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let location_id = args.getAsString("location_id");
                this._logic.getLocationById(correlationId, location_id, callback);
            }
		);
	}

	private makeCreateLocationCommand(): ICommand {
		return new Command(
			"create_location",
			new ObjectSchema(true)
				.withRequiredProperty('location', new LocationV1Schema()),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let location = args.get("location");
                this._logic.createLocation(correlationId, location, callback);
            }
		);
	}

	private makeUpdateLocationCommand(): ICommand {
		return new Command(
			"update_location",
			new ObjectSchema(true)
				.withRequiredProperty('location', new LocationV1Schema()),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let location = args.get("location");
                this._logic.updateLocation(correlationId, location, callback);
            }
		);
	}
	
	private makeDeleteLocationByIdCommand(): ICommand {
		return new Command(
			"delete_location_by_id",
			new ObjectSchema(true)
				.withRequiredProperty('location_id', TypeCode.String),
            (correlationId: string, args: Parameters, callback: (err: any, result: any) => void) => {
                let locationId = args.getAsNullableString("location_id");
                this._logic.deleteLocationById(correlationId, locationId, callback);
			}
		);
	}

}