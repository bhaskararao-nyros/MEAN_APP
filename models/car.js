var mongoose = require('mongoose');

var carsSchema = new mongoose.Schema({
  name: { type: String },
  price: { type: Number },
  mileage: { type: Number },
  manufactured: { type: Number },
  weight: { type: Number },
  engine_cap: { type: Number },
  image: { type: String },
  checked: { type: Boolean },
    }, {
  timestamps: true
});

module.exports = mongoose.model('cars', carsSchema);