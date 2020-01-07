import { CommandSet } from 'pip-services3-commons-node';
import { ILocationsController } from './ILocationsController';
export declare class LocationsCommandSet extends CommandSet {
    private _logic;
    constructor(logic: ILocationsController);
    private makeGetLocationsCommand;
    private makeGetLocationByIdCommand;
    private makeCreateLocationCommand;
    private makeUpdateLocationCommand;
    private makeDeleteLocationByIdCommand;
}
