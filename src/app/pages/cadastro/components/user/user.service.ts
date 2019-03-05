import { Injectable } from '@angular/core';
import { RequestService } from '../../../../shared/services/request.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../../../shared/models/user-model';

@Injectable()
export class UserService extends RequestService {

    constructor(http: HttpClient){
        super(http, "users")
    }

    importFromJsonPlaceholderAPI(){
        return this.http.get('https://jsonplaceholder.typicode.com/users') as Observable<any>;
    }

    saveImportFromJsonPlaceHolderAPI(list: User[]){
        return this.http.post(`${this.url}/importFromJsonPlaceHolder`, list) as Observable<any>;
    }

    getAllByFilter(filters: any): Observable<any> {
        let parameters = new HttpParams();

        if(filters.onlyDebt){
            parameters = parameters.append('onlyDebt', filters.onlyDebt);
        }

        return this.http.get(`${this.url}/allByFilter`, {params: parameters}) as Observable<any>;
    }
}