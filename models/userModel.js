import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name : {
        type:String,
        required:true,

    },

})

export default mongoose.model('allusers',userSchema)