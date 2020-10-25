"use strict";

const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/dbexample', { useNewUrlParser: true, useUnifiedTopology: true });

const UserSchema = {
    "name": String,
    "age": Number
}

module.exports = {
    User: mongoose.model("User", UserSchema),
}