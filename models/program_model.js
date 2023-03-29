import mongoose from "mongoose";


const programSchema = mongoose.Schema({
    title: {
        type:String,
        required: true,
    },

    sub_title: String,
    description: String,
    image: String,

});



const Program = mongoose.model("Program", programSchema)

export default Program;