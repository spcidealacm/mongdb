'use strict'

const mongoose = require("mongoose");

const MAX_NUMBER_IDS = 10;

module.exports = (ctx, next) => {
    let { ids } = ctx.params;
    ids = ids.split(",");
    const objectIds = [];

    if (ids.length > MAX_NUMBER_IDS) {
        ctx.throw(400, `Over ${MAX_NUMBER_IDS} ids`);
    }

    for (let i = 0; i < ids.length; i++) {
        try {
            const id = new mongoose.Types.ObjectId(ids[i]);
            objectIds.push(id);
            for (let j = i + 1; j < ids.length; j++) {
                if (ids[i] === ids[j]) {
                    ctx.throw(400, `ids[${i}] and ids[${j}] are same.`);
                }
            }
        } catch (error) {
            ctx.body = {
                message: error.message,
            }
            ctx.status = 400;
            return;
        }

    }

    ctx.params.ids = ids;
    ctx.params.objectIds = objectIds;

    return next();
}