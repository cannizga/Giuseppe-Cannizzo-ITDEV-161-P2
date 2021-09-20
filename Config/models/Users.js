import { Mongoose } from "mongoose";

const UserSchema = new mongoose.Schema ({
    name: 
    {
        type: String,
        required: true
    },

    email: 
    {
        type: String,
        required: true,
        unique: true
    },

    password: 
    {
        type: String,
        required: true
    }
})

const User = mongoose.model('user', UserSchema);

<<<<<<< HEAD
export default User; //
=======
export default User; //gggg
>>>>>>> d8bf82c73a790f59f2bcaf5b7965c208ff26d7c3
