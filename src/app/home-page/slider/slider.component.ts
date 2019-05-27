import { Component, OnInit } from '@angular/core';
import { ProductService } from './slider.service';
import { Slider } from './slider';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
  providers:[ProductService]
})
export class SliderComponent implements OnInit {

  constructor(private _service: ProductService) { }
  sliderList: Slider[];

  ngOnInit() {
    this._service.getAllProducts().subscribe(data=>this.sliderList=data);
  }

}
