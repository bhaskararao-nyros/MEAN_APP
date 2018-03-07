import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CarsService } from './cars.service';
import { NgxCarousel } from 'ngx-carousel';

// declare var jquery:any;
declare var $ :any;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
	public cars = [];
	public slider_cars = [{'image':'car'},{'image':'car'},{'image':'car'},{'image':'car'}];
	public dup_slider_cars = [];
	public carouselOne: NgxCarousel;
	public checkedCar:boolean = false;
	public showDown:boolean = false;
	public showCompareBlk:boolean = false;
	public showComparePage:boolean = true;
	public showDetailsPage:boolean = false;
	// public slideIndex;
 

	constructor(private carsService: CarsService) { }

	ngOnInit() {

		console.log(this.showComparePage);
		// GET CARS LIST
		this.carsService.getCarsList().subscribe(result => {
			// console.log(result);
			this.cars = result;
		});

		// GET SLIDER CARS
		this.carsService.getSliderCars().subscribe(result => {
			// console.log(result);

			for(var i = 0 ; i < result.length ; i++) {
				this.dup_slider_cars.push(result[i].car_id);
			}
			console.log(this.dup_slider_cars);

			if (result.length >= 3) {
				this.slider_cars = [];
				for(var i = 0 ; i < result.length ; i++) {
					this.slider_cars.push(result[i].car_id);
				}
				var Obj = {'image':'car'};
				this.slider_cars.push(Obj);
				// console.log(this.slider_cars);
				setTimeout(() => {
		      $('.slick_slider').slick({infinite: false,});
		    }, 0);
			}

			if (result.length === 2) {
				this.slider_cars = [];
				for(var i = 0 ; i < result.length ; i++) {
					this.slider_cars.push(result[i].car_id);
				}
				var Obj = {'image':'car'};
				for(var j = 0 ; j < 2 ; j++) {
					this.slider_cars.push(Obj);
				}
				// console.log(this.slider_cars);
				setTimeout(() => {
		      $('.slick_slider').slick({infinite: false,});
		    }, 0);
			}

			if (result.length === 1) {
				this.slider_cars = [];
				for(var i = 0 ; i < result.length ; i++) {
					this.slider_cars.push(result[i].car_id);
				}
				var Obj = {'image':'car'};
				for(var j = 0 ; j < 3 ; j++) {
					this.slider_cars.push(Obj);
				}
				// console.log(this.slider_cars);
				setTimeout(() => {
		      $('.slick_slider').slick({infinite: false,});
		    }, 0);
			}

			if(result.length === 0) {
				setTimeout(() => {
		      $('.slick_slider').slick({infinite: false,});
		    }, 0);
			}
		});
	}
	
	// MOVE CAR TO SLIDER
	moveToSlider(car, event) {
		if (event.target.checked) {

			console.log('---------CHECKBOX CHECKED--------');

			this.carsService.toggleCheck(car).subscribe(result => {
				// console.log(car);
				this.cars = result;
			});

			// MOVE TO SLIDER
			this.carsService.saveToSlider(car).subscribe(result => {

				$('.compare_blk').css('visibility','hidden');
				$('.slick_slider').slick('unslick');
				$('.compare_blk').css('visibility','hidden');

				this.dup_slider_cars = [];
				for(var i = 0 ; i < result.length ; i++) {
					this.dup_slider_cars.push(result[i].car_id);
				}
				console.log(this.dup_slider_cars);

				if (result.length >= 3) {
					this.slider_cars = [];
					for(var i = 0 ; i < result.length ; i++) {
						this.slider_cars.push(result[i].car_id);
					}
					var Obj = {'image':'car'};
					this.slider_cars.push(Obj);
					// console.log(this.slider_cars);
					setTimeout(() => {
			      $('.slick_slider').slick({infinite: false,adaptiveHeight: false});
			      $('.compare_blk').css('visibility','initial');
			    }, 0);
				}

				if (result.length === 2) {
					this.slider_cars = [];
					for(var i = 0 ; i < result.length ; i++) {
						this.slider_cars.push(result[i].car_id);
					}
					var Obj = {'image':'car'};
					for(var j = 0 ; j < 2 ; j++) {
						this.slider_cars.push(Obj);
					}
					// console.log(this.slider_cars);
					setTimeout(() => {
			      $('.slick_slider').slick({infinite: false,});
			      $('.compare_blk').css('visibility','initial');
			    }, 0);
				}

				if (result.length === 1) {
					this.slider_cars = [];
					for(var i = 0 ; i < result.length ; i++) {
						this.slider_cars.push(result[i].car_id);
					}
					var Obj = {'image':'car'};
					for(var j = 0 ; j < 3 ; j++) {
						this.slider_cars.push(Obj);
					}
					// console.log(this.slider_cars);
					setTimeout(() => {
			      $('.slick_slider').slick({infinite: false,});
			      $('.compare_blk').css('visibility','initial');
			    }, 0);
				}

				if(result.length === 0) {
					setTimeout(() => {
			      $('.slick_slider').slick({infinite: false,});
			      $('.compare_blk').css('visibility','initial');
			    }, 0);
				}
			});

			this.showCompareBlk = true;

		} else {

			console.log('----------CHECKBOX UNCHECKED---------');

			// DELETE CAR FROM SLIDER WHEN UNCHECK THE CHECK BOX
			this.carsService.delSliderCar(car).subscribe(result => {
				// console.log(result);
				this.dup_slider_cars = [];
				for(var i = 0 ; i < result.length ; i++) {
					this.dup_slider_cars.push(result[i].car_id);
				}

				$('.compare_blk').css('visibility','hidden');
				$('.slick_slider').slick('unslick');
				$('.compare_blk').css('visibility','hidden');

				if (result.length >= 3) {
					this.slider_cars = [];
					for(var i = 0 ; i < result.length ; i++) {
						this.slider_cars.push(result[i].car_id);
					}
					var Obj = {'image':'car'};
					this.slider_cars.push(Obj);
					setTimeout(() => {
			      $('.slick_slider').slick({infinite: false,adaptiveHeight: false});
			      $('.compare_blk').css('visibility','initial');
			    }, 0);
				}

				if (result.length === 2) {
					this.slider_cars = [];
					for(var i = 0 ; i < result.length ; i++) {
						this.slider_cars.push(result[i].car_id);
					}
					var Obj = {'image':'car'};
					for(var j = 0 ; j < 2 ; j++) {
						this.slider_cars.push(Obj);
					}
					setTimeout(() => {
			      $('.slick_slider').slick({infinite: false,adaptiveHeight: false});
			      $('.compare_blk').css('visibility','initial');
			    }, 0);
				}

				if (result.length === 1) {
					this.slider_cars = [];
					for(var i = 0 ; i < result.length ; i++) {
						this.slider_cars.push(result[i].car_id);
					}
					var Obj = {'image':'car'};
					for(var j = 0 ; j < 3 ; j++) {
						this.slider_cars.push(Obj);
					}
					setTimeout(() => {
			      $('.slick_slider').slick({infinite: false,adaptiveHeight: false});
			      $('.compare_blk').css('visibility','initial');
			    }, 0);
				}

				if(result.length === 0) {

					this.slider_cars = [];
					var Obj = {'image':'car'};
					for(var j = 0 ; j < 4 ; j++) {
						this.slider_cars.push(Obj);
					}

					setTimeout(() => {
			      $('.slick_slider').slick({infinite: false,adaptiveHeight: false});
			      $('.compare_blk').css('visibility','initial');
			    }, 0);
			    this.showCompareBlk = false;
				}
			});

			// TOGGLE CHECK BOX
			this.carsService.toggleCheck(car).subscribe(result => {
				this.cars = result;
			});
			this.showCompareBlk = true;


		}	
	}

	// TOGGLE COMPARE BLOCK
	toggleCompare() {
		this.showCompareBlk = !this.showCompareBlk;
		this.showDown = !this.showDown;
	}

	// CLEAR ALL CARS FROM SLIDER
	delCompareCars() {
		if(confirm("Are you sure to clear all...!")) {
			this.carsService.delAllCompareCars().subscribe(result => {
				console.log(result);
				if (result.status === 'success') {

					$('.compare_blk').css('visibility','hidden');
					$('.slick_slider').slick('unslick');
					$('.compare_blk').css('visibility','hidden');

					this.cars = result.cars;
					this.slider_cars = [];
					this.dup_slider_cars = [];
					var Obj = {'image':'car'};
					for(var i = 0 ; i < 4 ; i++) {
						this.slider_cars.push(Obj);
					}
				}
				setTimeout(() => {
		      $('.slick_slider').slick({infinite: false,});
		      $('.compare_blk').css('visibility','initial');
		    }, 0);
			});
			this.showCompareBlk = false;
		}
	}

	// REMOVE CAR WHEN CLICK ON REMOVE CIRCLE IN THE SLIDER
	removeCar(car) {
		console.log(car);
		this.carsService.delSliderCar(car).subscribe(result => {

			this.dup_slider_cars = [];
			for(var i = 0 ; i < result.length ; i++) {
				this.dup_slider_cars.push(result[i].car_id);
			}

			$('.compare_blk').css('visibility','hidden');
			$('.slick_slider').slick('unslick');
			$('.compare_blk').css('visibility','hidden');
			if (result.length >= 3) {
				this.slider_cars = [];
				for(var i = 0 ; i < result.length ; i++) {
					this.slider_cars.push(result[i].car_id);
				}
				var Obj = {'image':'car'};
				this.slider_cars.push(Obj);
				// console.log(this.slider_cars);
				setTimeout(() => {
		      $('.slick_slider').slick({infinite: false,});
		      $('.compare_blk').css('visibility','initial');
		    }, 0);
			}

			if (result.length === 2) {
				this.slider_cars = [];
				for(var i = 0 ; i < result.length ; i++) {
					this.slider_cars.push(result[i].car_id);
				}
				var Obj = {'image':'car'};
				for(var j = 0 ; j < 2 ; j++) {
					this.slider_cars.push(Obj);
				}
				// console.log(this.slider_cars);
				setTimeout(() => {
		      $('.slick_slider').slick({infinite: false,});
		      $('.compare_blk').css('visibility','initial');
		    }, 0);
			}

			if (result.length === 1) {
				this.slider_cars = [];
				for(var i = 0 ; i < result.length ; i++) {
					this.slider_cars.push(result[i].car_id);
				}
				var Obj = {'image':'car'};
				for(var j = 0 ; j < 3 ; j++) {
					this.slider_cars.push(Obj);
				}
				// console.log(this.slider_cars);
				setTimeout(() => {
		      $('.slick_slider').slick({infinite: false,});
		      $('.compare_blk').css('visibility','initial');
		    }, 0);
			}

			if(result.length === 0) {

				this.slider_cars = [];
				var Obj = {'image':'car'};
				for(var j = 0 ; j < 4 ; j++) {
					this.slider_cars.push(Obj);
				}

				setTimeout(() => {
		      $('.slick_slider').slick({infinite: false,});
		      $('.compare_blk').css('visibility','initial');
		    }, 0);
			}

			if (this.dup_slider_cars.length === 0) {
				this.showCompareBlk = false;
			}
		});

		// TOGGLE CHECK BOX
		this.carsService.toggleCheck(car).subscribe(result => {
			this.cars = result;
		});
	}

	backToCompare() {
		this.showComparePage = true;
		this.showDetailsPage = false; 

		setTimeout(() => {
      $('.slick_slider').slick({infinite: false,});
    }, 0);
	}

	compareNow() {
		this.showComparePage = false;
		this.showDetailsPage = true;
	}

	removeDetailsCar(car) {
		this.carsService.delSliderCar(car).subscribe(result => {
			console.log(result);
			this.dup_slider_cars = [];

			for(var i = 0 ; i < result.length ; i++) {
				this.dup_slider_cars.push(result[i].car_id);
			}

			$('.compare_blk').css('visibility','hidden');
			$('.slick_slider').slick('unslick');
			$('.compare_blk').css('visibility','hidden');
			if (result.length >= 3) {
				this.slider_cars = [];
				for(var i = 0 ; i < result.length ; i++) {
					this.slider_cars.push(result[i].car_id);
				}
				var Obj = {'image':'car'};
				this.slider_cars.push(Obj);
				// console.log(this.slider_cars);
				setTimeout(() => {
		      $('.slick_slider').slick({infinite: false,});
		      $('.compare_blk').css('visibility','initial');
		    }, 0);
			}

			if (result.length === 2) {
				this.slider_cars = [];
				for(var i = 0 ; i < result.length ; i++) {
					this.slider_cars.push(result[i].car_id);
				}
				var Obj = {'image':'car'};
				for(var j = 0 ; j < 2 ; j++) {
					this.slider_cars.push(Obj);
				}
				// console.log(this.slider_cars);
				setTimeout(() => {
		      $('.slick_slider').slick({infinite: false,});
		      $('.compare_blk').css('visibility','initial');
		    }, 0);
			}

			if (result.length === 1) {
				this.slider_cars = [];
				for(var i = 0 ; i < result.length ; i++) {
					this.slider_cars.push(result[i].car_id);
				}
				var Obj = {'image':'car'};
				for(var j = 0 ; j < 3 ; j++) {
					this.slider_cars.push(Obj);
				}
				// console.log(this.slider_cars);
				setTimeout(() => {
		      $('.slick_slider').slick({infinite: false,});
		      $('.compare_blk').css('visibility','initial');
		    }, 0);
			}

			if(result.length === 0) {

				this.slider_cars = [];
				var Obj = {'image':'car'};
				for(var j = 0 ; j < 4 ; j++) {
					this.slider_cars.push(Obj);
				}

				setTimeout(() => {
		      $('.slick_slider').slick({infinite: false,});
		      $('.compare_blk').css('visibility','initial');
		    }, 0);
			}

		});

		// TOGGLE CHECK BOX
		this.carsService.toggleCheck(car).subscribe(result => {
			this.cars = result;
		});
	}
}