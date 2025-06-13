import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { SignupModel } from '../model/signup.model';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  private ENDPOINT = environment.URL.concat("/autorizador/signup");

  constructor(
    private httpClient: HttpClient
  ) {}

  public signup(nome:string, email:string, data:string, telefone:string, senha:string) {
    return this.httpClient.post<SignupModel>(this.ENDPOINT, { nome, email, data, telefone, senha }).pipe(
      tap((response) => {
        sessionStorage.setItem("token", response.token)
      }));
  }

  public signin(identificador:string, senha:string) {
    return this.httpClient.post(this.ENDPOINT, { identificador, senha });
  }

}
