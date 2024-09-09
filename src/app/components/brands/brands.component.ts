import { Component, inject, OnInit } from '@angular/core';
import { BrandsService } from '../../core/services/brands.service';
import { Ibrands } from '../../core/interfaces/ibrands';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit{
  brandsList:Ibrands[]=[];
  private readonly _BrandsService=inject(BrandsService);

  ngOnInit(): void {
    this.getAllBrands();
  }

  getAllBrands():void{
    this._BrandsService.getAllBrands().subscribe({
      next:(res)=>{
        // console.log(res.data);
        this.brandsList=res.data;
      }
      
    })
  }
}
