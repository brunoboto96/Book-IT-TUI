import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Module } from './module.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {
  selectedPost: Module = {
    name: '',
    description: '',
    userId: ''
  };
  data;
  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  constructor(private http: HttpClient, private user: UserService) { }


  addModule(data: FormData): Observable<any> {
    return this.http.post(environment.apiBaseUrl + '/addmodule', data, this.noAuthHeader);
  }

  getAddedModules(id) {
    return this.http.get(environment.apiBaseUrl + '/module/find/userid/'+id, this.noAuthHeader);
  }

  
  getModuleByName(name) {
    return this.http.get(environment.apiBaseUrl + '/module/find/name/'+name, this.noAuthHeader);
  }

  

}
