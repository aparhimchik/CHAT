var mongoose = require("mongoose");
var config = require("../config");

mongoose.connect
(
"mongodb://localhost/Kurs"
)

module.exports = mongoose;