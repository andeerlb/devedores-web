import { Geolocation } from './geolocation-model';

export class Address {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: Geolocation
}
