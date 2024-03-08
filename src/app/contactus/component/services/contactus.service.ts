import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ContactusService {
  baseUrl = environment.baseUrl + 'contactus/';

  constructor(private http: HttpClient) {}

  send(contactus: any) {
    return this.http.post(this.baseUrl + 'send', contactus);
  }

  getAllData() {
    return this.http.get(this.baseUrl + 'getAllData');
  }

  getData(id: any) {
    return this.http.get(this.baseUrl + 'getAllData/' + id);
  }

  getQuestionWithRepayes() {
    return this.http.get(this.baseUrl + 'getQuestionWithReplayes');
  }
}
