import mongoose from 'mongoose';
import config from 'config';

// Get The Connection String
const db = config.get('monoURI');

// Connect To MongoDB
const connectDatabase = async () => {
    try
    { 
        await mongoose.connect(db, {
            useUnifiedTopology: true
        });
        console.log('connected to MongoDB');
    } catch (error) 
    {
        console.error(error.message);

        // Exit with failure code
        process.exit(1);
    }
};

export default connectDatabase;