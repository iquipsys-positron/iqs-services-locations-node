import { IStringIdentifiable } from 'pip-services3-commons-node';

export class LocationV1 implements IStringIdentifiable {
    public id: string;
    public org_id: string;
    public name: string;
    public pos: any; // GeoJSON
}