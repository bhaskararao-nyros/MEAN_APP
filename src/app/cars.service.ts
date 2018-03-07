import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CarsService {
	url = "http://10.90.90.55:3000";

  constructor(private http: Http) { }

  // GET CARS ON LOAD
  getCarsList() {
  	return this.http.get(this.url+"/getCars")
	  .map(res => res.json());
  }

  // SAVE TO SLIDER LIST
  saveToSlider(car) {
    var url = this.url+"/addToSlider";
    return this.http.post(url,car)
	  .map(res => res.json());
  }

  // GET SLIDER CARS ON LOAD
  getSliderCars() {
  	return this.http.get(this.url+"/getSliderCars")
	  .map(res => res.json());
  }

  delAllCompareCars() {
    return this.http.get(this.url+"/removeAllCompCars")
    .map(res => res.json());
  }

  toggleCheck(car) {
    var url = this.url+"/toggleChkBox";
    return this.http.post(url,car)
    .map(res => res.json());
  }

  delSliderCar(car) {
    var url = this.url+"/delSlideCar";
    return this.http.post(url,car)
    .map(res => res.json());
  }
}
