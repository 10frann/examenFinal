import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Productos } from '../../interfaces/productos';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  productos:Productos[] = []
  currentPage = 1;
  totalProductos = 0;

  constructor(private service:AuthService) {}

  ngOnInit(): void {
   this.getProductos();
  }
  getProductos(){
    this.service.getProducts().subscribe((data) => {
      this.totalProductos = data.length
      const startIndex = (this.currentPage - 1) * 8;
      const endIndex = Math.min(startIndex + 8, this.totalProductos);
      this.productos = data.splice(startIndex, endIndex);
    })
  }
  loadNextPage(): void {
    const nextPage = this.currentPage+1;
    if (nextPage <= Math.ceil(this.totalProductos / 8)){
      this.currentPage++;
      this.getProductos();
    }
  }
  loadPreviusPage(): void{
    if (this.currentPage>1){
      this.currentPage--;
      this.getProductos();
    }
  }
}
