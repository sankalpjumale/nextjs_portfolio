import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI as string

if(!MONGODB_URI) {
    throw new Error("Please define MongoDB URI")
}

declare global {
    var mongoose: {
        conn: mongoose.Connection | null; //active-connection
        promise: Promise<mongoose.Connection> | null //in-progress
    }
}

//initialization of global cache if it doesn't exit yet
let cached = global.mongoose

if(!cached){
    cached = global.mongoose = {
        conn: null, //no active connection
        promise: null //no pending connection
    }
}

export default async function dbConnect() {

    //if connection already existed in cache
    if(cached.conn) {
        return cached.conn
    }

    //if no connection then start a new connection
    if(!cached.promise){
        const opts = {
            bufferCommands: false
        }
    
        cached.promise = mongoose
            .connect(MONGODB_URI, opts) //start the connection
            .then((mongooseInstance) => {
                return mongooseInstance.connection
            })
    }

    //if connection was already in progress, then wait for it
    //once resolved, store the connection in the cache for all future request
    cached.conn = await cached.promise

    //return active connection
    return cached.conn
}

