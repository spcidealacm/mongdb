'use strict'

const User = require("../../model/User")

module.exports = async ctx => {
    const { id } = ctx.params;
    const res = await User.findOne({ _id: id });

    if (res) {
        ctx.body = res;
    } else {
        ctx.status = 404;
        ctx.body = {
            message: `${id} not found!`
        }
    }
}