import { Component, OnInit } from '@angular/core';
import { Productos } from '../../interfaces/productos';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})
export class ProductoComponent implements OnInit{
  producto!:Productos;

  constructor(private service:AuthService, private router:Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      switchMap( ({id}) => this.service.getProduct(id))
    ).subscribe(data => {
      return (!data) ? this.router.navigateByUrl('') 
      : this.producto = data;
    })
  }
}
