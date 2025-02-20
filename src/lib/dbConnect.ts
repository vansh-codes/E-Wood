import mongoose from 'mongoose'

const dbConnect = async () => {
  // if (mongoose.connection.readyState) {
  //     console.log('Already connected to MongoDB');
  //     return;
  // }

  try {
    await mongoose.connect(process.env.MONGO_URI!)
    console.log('MongoDB connected')
  } catch (error) {
    console.error('MongoDB connection error:', error)
    // process.exit(1);
  }
}

export default dbConnect
