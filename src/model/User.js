'use strict';

const mongoose = require("mongoose");

const UserSchema = {
    "name": String,
    "age": Number
}

module.exports = mongoose.model("User", UserSchema);