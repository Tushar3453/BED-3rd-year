const User=require("./model/user.model");
const request=require("supertest");
const app=require("./server");
jest.mock("./model/user.model")
describe("POST /api/users/register",()=>{
    it("should return user already exist if email is tushar@gmail.com",async()=>{
        User.findOne.mockResolvedValueOnce(true);

        let response = await request(app)
            .post('/api/users/register')
            .send({
                name: "tushar",
                email: "tushar@gmail.com",
                password: "1234"
            });
        expect(response.body.message).toBe("user already exist");
    })

    it("should create a new user with email tushar2549@gmail.com",async()=>{
        User.findOne.mockResolvedValueOnce(false);
        User.create.mockResolvedValueOnce({
            name:"tushar",
            email:"tushar2549@gmail.com",
            password:"1234"
        })
        let response=await request(app).post("/api/users/register").send({
            name:"tushar",
            email:"tushar2549@gmail.com",
            password:"1234"
        })
        expect(response.body.message).toBe("user register successfully");
        expect(response.body.data).toEqual({
            name:"tushar",
            email:"tushar2549@gmail.com",
            password:"1234"
        })
    
    })

})