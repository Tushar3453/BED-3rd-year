const User=require("./model/user.model");
const mongoose=require("mongoose");
let {MongoMemoryServer}=require("mongodb-memory-server");
let app=require("./server")
let request=require("supertest");

let mongoServer;
beforeAll(async()=>{
    mongoServer=await MongoMemoryServer.create();
    let url=mongoServer.getUri();
    await mongoose.connect(url);
})
afterEach(async()=>{
    await User.deleteMany();
})

afterAll(async()=>{
    await mongoose.disconnect();
    await mongoServer.stop();
})

describe("POST /api/users/register",()=>{
    it("should return user already exist if email is tushar@gmail.com",async ()=>{
        await User.create({
            name:"dada",
            email:"tushar@gmail.com",
            password:"12345"
    })
        let response=await request(app).post("/api/users/register").send({
            name:"tushar",
            email:"tushar@gmail.com",
            password:"1234"
        })
        expect(response.body.message).toBe("user already exist");
    })
    it("should create a new user with email tushar@gmail.com",async ()=>{
        let response=await request(app).post("/api/users/register").send({
            name:"tushar",
            email:"tushar@gmail.com",
            password:"1234"
        })
        let userdata=await User.findById(response.body.data_id);
        expect(response.body.data._id).toBe(userdata._id);
        expect(response.body.data.name).toBe("tushar");
        expect(response.body.data.email).toBe("tushar@gmail.com");
        expect(response.body.data.password).toBe("1234");
    

    })
})