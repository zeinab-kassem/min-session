import Program from '../models/program_model.js';


//getting all programs
const getAll = async(req, res)=>{
    const all_program = await Program.find();

    res.status(200).json({
        message:"getting all programs",
        status:200,
        data: all_program,
    });
}


//getting a specific program
const getProgram = async(req, res)=>{
    const program = await Program.findById(req.params.id);

    res.status(200).json({
        message:"getting a specific program",
        status:200,
        data: program,
    });
}


//Posting a program
const postProgram = async(req, res)=>{
    console.log("req" ,req.file)

    const {sub_title, title} = req.body

    const program = await Program.create({
        title: title,
        image: req.file.filename,
        sub_title : sub_title
    })

    res.status(200).json({
        message:"Posted Succesfully",
        Status:200,
        data: program,
    })
}


//Updating a program
const updateProgram = async(req, res)=>{
    const update = await Program.findByIdAndUpdate(req.params.id, req.body, {
        new:true,
    });

    
    res.status(200).json({
        message:"Updated a specific program",
        status:200,
        data: update,
    });
}




//Deleting a program
const eraseProgram = async(req, res)=>{
    const erase = await Program.findByIdAndRemove(req.params.id);

    
    res.status(200).json({
        message:"Deleted a specific program",
        status:200,
        data: erase,
    });
}



export default {getAll,
              getProgram,
              postProgram,
              updateProgram,
              eraseProgram
                             }