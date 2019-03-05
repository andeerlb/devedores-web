import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as env } from '../../../environments/environment';

@Injectable()
export abstract class RequestService {

    env: any;
    path: string;
    url: string;
    constructor(protected http: HttpClient, path: string) {
        this.env = env;
        this.path = path;
        this.url = `${env.api}/${path}`;
    }

    save(entity: any): Observable<any> {
        return entity.id ? this.update(entity) : this.create(entity);
    }
    
    getAll(): Observable<any> {
        return this.http.get(`${this.url}/all`) as Observable<any>;
    }
    
    getOne(id: any): Observable<any> {
        let parameters = new HttpParams();
        parameters = parameters.append('id', id);
        return this.http.get(this.url, {params: parameters}) as Observable<any>;
    }
    
    delete(entity: any): Observable<any> {
        let parameters = new HttpParams();
        parameters = parameters.append('id', entity.id);
        return this.http.delete(this.url, {params: parameters}) as Observable<any>;
    }

    private create(entity: any): Observable<any> {
        return this.http.post(this.url, entity) as Observable<any>;
    }

    private update(entity: any): Observable<any> {
        return this.http.put(`${this.url}/${entity.id}`, entity) as Observable<any>;
    }
}
