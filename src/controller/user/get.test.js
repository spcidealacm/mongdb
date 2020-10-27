const User = require("../../model/User")
const mm = require("mm");
const assert = require("assert");
const get = require("./get")
const debug = require("debug")("Unit-test")

describe("Unit Test Controller get", () => {
    it.only("404 not found", async () => {
        const fakeCtx = {
            params: {
                id: 123
            }
        }

        mm(User, "findOne", async (filter) => {
            assert.deepStrictEqual(filter, { _id: fakeCtx.params.id })
        })

        await get(fakeCtx);

        debug(fakeCtx);

        assert.strictEqual(fakeCtx.status, 404);

        assert.deepStrictEqual(fakeCtx.body, {
            message: `${fakeCtx.params.id} not found!`
        })
    })

    it("200 not found", async () => {
        const fakeCtx = {
            params: {
                id: 123
            }
        }

        const user = { name: "Jack", age: 23 }

        mm(User, "findOne", async (filter) => {
            assert.deepStrictEqual(filter, { _id: fakeCtx.params.id })
            return user;
        })

        await get(fakeCtx);

        assert.strictEqual(fakeCtx.status, undefined);

        assert.deepStrictEqual(fakeCtx.body, user)
    })
})