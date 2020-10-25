const Koa = require("koa")
const bodyParse = new require("koa-bodyparser")

const router = require("./router")()

module.exports = () => {
    const app = new Koa()
    app.use(bodyParse());
    app.use(router.routes());
    return app;
}