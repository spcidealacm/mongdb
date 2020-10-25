'use strict'

const User = require("../../model/User")

module.exports = async ctx => {
    const { id } = ctx.params;
    const { body } = ctx.request;

    const { n } = await User.updateOne({ _id: id }, { $set: body })

    if (n === 0) {
        ctx.body = {
            message: `${id} not found!`
        }
        ctx.status = 404;
    } else {
        ctx.status = 200;
    }
}