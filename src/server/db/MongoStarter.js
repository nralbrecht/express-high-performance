import mongoose from "mongoose";

const MONGO_CONNECTION_STRING = "mongodb://localhost:27017/supermongo";

function start() {

    const options = {
        autoIndex: false, // Don't build indexes
        reconnectTries: 30, // Retry up to 30 times
        reconnectInterval: 500, // Reconnect every 500ms
        poolSize: 10, // Maintain up to 10 socket connections
        // If not connected, return errors immediately rather than waiting for reconnect
        bufferMaxEntries: 0,
        useNewUrlParser: true, // current URL string parser is deprecated
        useUnifiedTopology: true // current Server Discovery and Monitoring engine is deprecated
    };

    const connectWithRetry = () => {
        console.log('MongoDB connection with retry')
        mongoose.connect(MONGO_CONNECTION_STRING, options).then(()=>{
            console.log('MongoDB is connected');
        }).catch(err=>{
            console.log('MongoDB connection unsuccessful, retry after 5 seconds.');
            setTimeout(connectWithRetry, 5000);
        })
    };

    connectWithRetry();
}

export default start;
