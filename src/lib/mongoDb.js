import mongoose from "mongoose";
let isConnected= false; //will change when db is connected

async function dbConnect() {
    if (isConnected == true) {
        console.log("Db already connected") // Will not connected if db is already connection(Does not reconnect on every request)
        return;
    }
    if (!process.env.MONGODB_URI) {
        throw new Error("No Connection string from ENV"); // Will throw this if no string is found in ENV to connect
    }
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI || "",{
              dbName: "finance_analyzer"
        });
        isConnected= db.connections[0].readyState; // will store true if db is connected
        console.log("Db successfully Connected");
        
    } catch (error) {
        console.log("Some Error Occured while connecting DB: ", error);
    }
    
}

export  default dbConnect;