'use strict'

const User = require("../../model/User")

module.exports = async ctx => {
    const { body } = ctx.request;

    const user = new User(body);
    const { _id } = await user.save();
    ctx.status = 201;

    ctx.body = {
        message: "user created",
        id: _id,
    }
}