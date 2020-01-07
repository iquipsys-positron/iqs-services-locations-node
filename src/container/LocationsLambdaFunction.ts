import { Descriptor } from 'pip-services3-commons-node';
import { CommandableLambdaFunction } from 'pip-services3-aws-node';
import { LocationsServiceFactory } from '../build/LocationsServiceFactory';

export class LocationsLambdaFunction extends CommandableLambdaFunction {
    public constructor() {
        super("locations", "Map locations function");
        this._dependencyResolver.put('controller', new Descriptor('iqs-services-locations', 'controller', 'default', '*', '*'));
        this._factories.add(new LocationsServiceFactory());
    }
}

export const handler = new LocationsLambdaFunction().getHandler();