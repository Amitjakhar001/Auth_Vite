import { connect, disconnect } from "mongoose";
async function connectToDatabase(){
    try {
        connect(process.env.MONGODB_URL);
    } catch (error) {
        console.log(error);
        throw new Error("Can't connect to Mongo");
    }
}

async function disconnectFromDatabase(){
    try {
        await(disconnect());
    } catch (error) {
        console.log(error);
        throw new Error("Can't disconnect from Mongo");
    }
}


export {connectToDatabase};