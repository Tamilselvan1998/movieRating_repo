const mongoose = require('mongoose');
    const CONNECTION_STRING = "mongodb+srv://seshan05677:JF9zj66UJAvRnR3s@movie.tjxmce8.mongodb.net/?retryWrites=true&w=majority&appName=Movie";
 
const connectDb = async () => {
    try {
        await mongoose.connect(CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to MongoDB");
        return mongoose.connection;
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}
 
module.exports = connectDb;