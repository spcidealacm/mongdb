const Koa = require("koa")
const Router = require("koa-router")
const mongoose = require("mongoose")
const bodyParse = new require("koa-bodyparser")

const app = new Koa()
const router = new Router()
const { User } = require("./db_client")

app.use(bodyParse());

function validateId(ctx, next) {
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

router.get("/user/:id", validateId, async ctx => {
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
})

router.post("/user", async ctx => {
    const { body } = ctx.request;

    const user = new User(body);
    const { _id } = await user.save();
    ctx.status = 201;

    ctx.body = {
        message: "user created",
        _id,
    }

})

router.put("/user/:id", validateId, async ctx => {
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
})

router.delete("/user/:id", validateId, async ctx => {
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
})

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

app.use(router.routes());

const port = 3000;
app.listen(port, () => {
    console.log(`Server start at port: ${port}`);
})