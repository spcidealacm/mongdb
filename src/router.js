const Router = require("koa-router")

const validateId = require("./middleware/validateId")
const User = require("./model/User")
const { getUser, createUser, updateUser, deleteUser } = require("./controller/user")

module.exports = () => {

    const router = new Router()

    router.get("/user/:id", validateId, getUser)

    router.post("/user", createUser)

    router.put("/user/:id", validateId, updateUser)

    router.delete("/user/:id", validateId, deleteUser)

    router.get("/user/:page/:pageSize", async ctx => {
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
    });

    return router;
}