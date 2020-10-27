'use strict'

const mongoose = require("mongoose");
const User = require("../../model/User");
const debug = require("debug")("app:middleware:expendId:");

module.exports = async (ctx) => {
    const { ids, objectIds } = ctx.params;

    debug("ids: %o", ids);
    // debug(`objectIds: ${objectIds}`);

    const res = await User.find({
        _id: { $in: objectIds },
    });

    if (res.length === 0) {
        ctx.body = {
            message: `${ids} not found`,
        };
        ctx.status = 404;
    } else {
        ctx.body = res;
    }
}
