const mongoose = require('mongoose');
const config = require('./config');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.mongoURI);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    
    // Create indexes for better performance
    await mongoose.model('User').createIndexes();
    await mongoose.model('Task').createIndexes();
    
    return conn;
  } catch (err) {
    console.error(`❌ MongoDB Connection Error: ${err.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;