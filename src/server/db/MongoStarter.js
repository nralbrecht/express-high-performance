import mongoose from "mongoose";
import config from "../../../config"

function start() {

    const options = {
        useCreateIndex: true, // Don't use the deprecated collection.ensureIndex
        useFindAndModify: false,
        autoIndex: true, // build indexes
        poolSize: 10, // Maintain up to 10 socket connections
        serverSelectionTimeoutMS: 10000,
        // If not connected, return errors immediately rather than waiting for reconnect
        bufferMaxEntries: 0,
        useNewUrlParser: true, // current URL string parser is deprecated
        useUnifiedTopology: true // current Server Discovery and Monitoring engine is deprecated
    };

    const connectWithRetry = () => {
        console.log('Connecting to MongoDB');

        mongoose.connect(config.MONGO_CONNECTION_STRING, options).then(() => {
            console.log('MongoDB is connected');
        }).catch(err => {
            console.log('MongoDB connection unsuccessful:', err.message);
            connectWithRetry();
        });
    };

    connectWithRetry();
}

export default start;
