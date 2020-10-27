'use strict'

module.exports = async ctx => {
    let { page, pageSize } = ctx.params;
    page = +page;
    pageSize = +pageSize;

    const skipCount = (page - 1) * pageSize;
    const total = await User.find().countDocuments();
    const users = await User.find().select("_id name").skip(skipCount).limit(pageSize);
    ctx.body = {
        total,
        result: users
    }
}