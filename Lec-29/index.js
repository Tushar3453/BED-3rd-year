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
// addUser("chaudharytur270@gmail.com", "Tuar", "124")
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
// addTweet("my first tweet",1)
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
}
// getUserTweet(1)
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
updateTweet("1","1","update tweet")
.then(()=>{
    console.log("tweet updated successfully")
})