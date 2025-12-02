const app=require("./index");
const request=require("supertest");

describe("POST /sum",()=>{
    test("should return addition of two number",()=>{
        request(app).post("/sum").send({
            a:2,
            b:3
        })
        expect(response.body.data).toBe(5);
    })
    it("should return all argument must be passed",()=>{
        let response=request(app).post("/sum")
        send({
            a:2,
        })
        expect(response.body.data).toBe("invalid argument");
    })
})
