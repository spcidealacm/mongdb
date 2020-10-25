'use strict'

const mongoose = require("mongoose");

module.exports = (ctx, next) => {
    try {
        const { id } = ctx.params;
        const ObjectId = new mongoose.Types.ObjectId(id);
        ctx.params.id = ObjectId;
    } catch (error) {
        ctx.body = {
            message: error.message,
        }
        ctx.status = 400
        return;
    }
    return next();
}