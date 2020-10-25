'use strict'

const User = require("../../model/User")

module.exports = async ctx => {
    const { id } = ctx.params;
    const { n } = await User.deleteOne({ _id: id });
    if (n === 0) {
        ctx.body = {
            message: `${id} not found!`
        }
        ctx.status = 404;
    } else {
        ctx.status = 200;
    }
}