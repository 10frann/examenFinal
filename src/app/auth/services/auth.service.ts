import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Productos } from '../interfaces/productos';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnInit{

  private logueado:boolean;
  private email:string = "apruebo.angular@mail.com"
  private password:string = "RooT"
  private endPoint = "https://fakestoreapi.com/products";

  constructor(private http:HttpClient) {
    this.logueado = false;
  }

  ngOnInit(): void {
    this.getProducts()
  }

  getProducts():Observable<Productos[]>{
    return this.http.get<Productos[]>(this.endPoint)
  }

  getProduct(id: Number):Observable<Productos>{
    return this.http.get<Productos>(`${this.endPoint}/${id}`)
  }

  login(email:string, password:string){
    if(this.email===email && this.password===password){
      this.logueado = true;
    } else {
      this.logueado = false;
    }
    return of(this.logueado)
  }
  estarLogueado():boolean{
    return this.logueado
  }
  logout():void{
    this.logueado = false
  }
}
