const express = require('express');
const router = express.Router();

// Modals
const Cars = require('../models/car');
const Slider_cars = require('../models/slider_car');


router.get('/getCars',(req,res,next)=>{
  Cars.find(function(err, cars) {
    res.json(cars);
  })
});

router.use('/addToSlider',(req,res,next)=>{
  Slider_cars.create({car_id:req.body._id}, function (err, slider_cars) {
	  Slider_cars.find().populate('car_id').exec(function(err, slider_cars1) {
      res.json(slider_cars1);
    });
	});
});

router.get('/getSliderCars',(req,res,next)=>{
  Slider_cars.find().populate('car_id').exec(function(err, slider_cars) {
    res.json(slider_cars);
  })
});

router.get('/removeAllCompCars',(req,res,next)=>{
  Slider_cars.find(function(err, slider_cars) {  
    if (slider_cars) {
      let j = 1, k = slider_cars.length;
      for(let i = 0; i< slider_cars.length; i++) {
        Cars.update({_id:slider_cars[i].car_id},{$set: {checked: false}},{multi: true},function(err1, cars) {
          if (cars) {
            if (j == k ) {
              Slider_cars.remove({}, function(err2, slider_cars1) {
                if (slider_cars1) {
                  Cars.find(function(err3, cars1) {
                    res.json({
                      status:'success',
                      message:'Cars successfully cleared',
                      cars:cars1
                    });
                  });
                }
              });
            } else {
              j++;
            }
          }
        })
      }
    }
  });
});

router.use('/toggleChkBox',(req,res,next)=>{
  Cars.findByIdAndUpdate(req.body._id,{$set: {checked: !req.body.checked}},{new: true},function(err, cars) {
    if (cars) {
      Cars.find(function(err, cars1) {
        res.json(cars1);
      });
    }
  })
});

router.use('/delSlideCar',(req,res,next)=>{
  Slider_cars.remove({car_id:req.body._id}, function(err, slider_cars) {
    if (slider_cars) {
      Slider_cars.find().populate('car_id').exec(function(err, slider_cars) {
        res.json(slider_cars);
      });
    }
  });
});


module.exports = router;