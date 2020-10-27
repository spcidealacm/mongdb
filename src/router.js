const Router = require("koa-router")

const { validateId, expendId } = require("./middleware")
const User = require("./model/User")
const { getUser, createUser, updateUser, deleteUser, listUser, bulkGet } = require("./controller/user")

module.exports = () => {

    const router = new Router()

    router.get("/user/:id", validateId, getUser)

    router.post("/user", createUser)

    router.put("/user/:id", validateId, updateUser)

    router.delete("/user/:id", validateId, deleteUser)

    router.get("/user/:page/:pageSize", listUser)

    router.get("/bulk/user/:ids", expendId, bulkGet)

    return router;
}