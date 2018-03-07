var mongoose = require('mongoose');

var sliderCarSchema = new mongoose.Schema({
  car_id: { type: mongoose.Schema.Types.ObjectId, ref: 'cars' },
    }, {
  timestamps: true
});

module.exports = mongoose.model('slider_car', sliderCarSchema);