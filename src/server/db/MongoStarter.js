import mongoose from "mongoose";

const MONGO_CONNECTION_STRING = "mongodb://localhost:27017/supermongo";

function start() {

    const options = {
        autoIndex: false, // Don't build indexes
        poolSize: 10, // Maintain up to 10 socket connections
        serverSelectionTimeoutMS: 10000,
        // If not connected, return errors immediately rather than waiting for reconnect
        bufferMaxEntries: 0,
        useNewUrlParser: true, // current URL string parser is deprecated
        useUnifiedTopology: true // current Server Discovery and Monitoring engine is deprecated
    };

    const connectWithRetry = () => {
        console.log('Connecting to MongoDB');

        mongoose.connect(MONGO_CONNECTION_STRING, options).then(() => {
            console.log('MongoDB is connected');
        }).catch(err => {
            console.log('MongoDB connection unsuccessful:', err.message);
            connectWithRetry();
        });
    };

    connectWithRetry();
}

export default start;
