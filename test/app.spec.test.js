"use strict"

const app = require("../src/app")();
const assert = require("assert");
const request = require("supertest");
require("../src/model/index")

describe("App", () => {

    let ids = [];

    const user = {
        name: "Jack",
        age: 22
    }

    async function prepareUser(user) {
        const { body } = await request(app.callback())
            .post("/user")
            .send(user)
            .expect(201);

        ids.push(body.id);
        return body;
    }

    after(async () => {
        // console.log(ids);
        for (const id of ids) {
            await request(app.callback())
                .delete(`/user/${id}`).send();
        }
    })

    it("create", async () => {
        const { body } = await request(app.callback()).post("/user").send({
            name: "Jack",
            age: 22
        }).expect(201);
        // console.log(body);
        ids.push(body.id);
    })

    describe("get", () => {
        it("200 should work", async () => {
            const mockUser = await prepareUser(user);
            await request(app.callback())
                .get(`/user/${mockUser.id}`)
                .send()
                .expect(200)
                .expect(({ body }) => {
                    assert.strictEqual(body.name, user.name);
                    assert.strictEqual(body.age, user.age);
                });

        })

        it("400 should work", async () => {
            const mockUser = await prepareUser(user);
            await request(app.callback())
                .get(`/user/123`)
                .send()
                .expect(400)
                .expect(({ body }) => {
                    assert.deepStrictEqual(body, {
                        message:
                            "Argument passed in must be a single String of 12 bytes or a string of 24 hex characters"
                    })
                });

        })

        it("404 should work", async () => {
            const mockUser = await prepareUser(user);
            const id = "1f954e2313af1276b35b29f3"
            await request(app.callback())
                .get(`/user/${id}`)
                .send()
                .expect(404)
                .expect(({ body }) => {
                    assert.deepStrictEqual(body, {
                        message:
                            `${id} not found!`
                    })
                });

        })
    })



    // End to End test
    it("update", async () => {
        const mockUser = await prepareUser(user);

        const newUser = {
            name: "Rose",
            age: 30
        }

        await request(app.callback())
            .put(`/user/${mockUser.id}`)
            .send(newUser)
            .expect(200);

        await request(app.callback())
            .get(`/user/${mockUser.id}`)
            .send()
            .expect(({ body }) => {
                assert.strictEqual(body.name, newUser.name);
                assert.strictEqual(body.age, newUser.age);
            });
    })

    it("delete", async () => {
        const mockUser = await prepareUser(user);

        await request(app.callback())
            .delete(`/user/${mockUser.id}`)
            .send()
            .expect(200);

        await request(app.callback())
            .get(`/user/${mockUser.id}`)
            .send()
            .expect(404);
    })
})