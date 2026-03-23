import mongoose from "mongoose";
import config from "./config";
import app from "./app";

async function main(){
    try{
        if(!config.database_url){
            throw new Error('Database URL is not provided in environment variables')
        }

        await mongoose.connect(config.database_url,{
            dbName: config.db_name || 'TechEasy',
        });
        console.log('Connect to MongoDB Successfully');

        app.listen(config.port,() => {
            console.log(`Server is listening on port ${config.port}`);
        });
    }
    catch(er){
    console.error('Failed to connect to MongoDB', er);
    process.exit(1);
    }
}

main()