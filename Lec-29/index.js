const { PrismaClient } = require("./generated/prisma");
const prisma = new PrismaClient()
async function addUser(email, name, password) {
    const user = await prisma.user.create({
        data: {
            email,
            name,
            password
        }
    })
    return user
}
// addUser("sm@gmail.com", "smiley", "1234")
//     .then((data) => {
//         console.log(data);
//     })
//     .catch((err) => {
//         console.log(err.message);
//     })

async function addTweet(content,userId){
    await prisma.tweet.create({
        data:{
            content:content,
            userId:userId
        }
        
    })
}
// addTweet("my second",6)
// .then(()=> console.log("tweet added successfully"))
// .catch((err)=>console.log(err.message));

//find all tweet by user who's id is 1;
async function getUserTweet(userId){
    let tweets =await prisma.tweet.findMany({
        where:{
            userId:Number(userId)
        }
    
    })
    return tweets;
}+
// getUserTweet(6)
// .then((data)=>console.log(data))
// .catch((err)=>console.log(err.message));

//user who's id is 1 wants to update his tweet --> tweet id is 1
async function updateTweet(tweetId,userId,updatedContent){
    let tweet=await prisma.tweet.findUnique({
        where:{
            id:Number(tweetId)
        }

    })
    if(!tweet){
        return "tweet not found"
    }
    if(tweet.userId!==Number(userId)){
        return "user can not update this tweet"
    }
    await prisma.tweet.update({
        where:{
            id:Number(tweetId)
        },
        data:{
            content:updatedContent
        }
    })

}
// updateTweet("1","1","update tweet")
// .then(()=>{
//     console.log("tweet updated successfully")
// })

//create a function to delete user by id;
async function deleteUser(userId) {
    const user = await prisma.user.findUnique({
        where: { id: Number(userId) }
    });
    if (!user) {
        return "user not found";
    }
    await prisma.tweet.deleteMany({
        where: { userId: Number(userId) }
    });
    await prisma.user.delete({
        where: { id: Number(userId) }
    });
    return "User deleted successfully";
    
}
// deleteUser(3)
// .then((data)=>console.log(data))
// .catch((err)=>console.log(err.message))

async function getUsers() {
    const users = await prisma.user.findMany({
        // select: {
        //     name: true,
        //     email: true,
        //     tweet: {
        //         content:true
        //     }
        // }
        include:{
        tweet:{
            select:{
                content:true
            }
        }
    }
    });
    return users;
}
getUsers()
.then((data)=>console.log(JSON.stringify(data,null,2)))
.catch((err)=>console.log(err.message))
