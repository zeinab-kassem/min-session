import User from '../models/user_model.js';
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

//Posting a program
const register = async(req, res)=>{

  console.log(req.body);

    try {
        // Get user input
        const { name, email, password } = req.body;
    
        // Validate user input
        if (!(email && password && name)) {  // if(!name || !email || !password){
          res.status(400).send("All input is required");
        }

    
        // check if user already exist
        // Validate if user exist in our database
        const oldUser = await User.findOne({ email });
    
        if (oldUser) {
          return res.status(409).send("User Already Exist. Please Login");
        }

    
        //Encrypt user password
        var encryptedPassword = await bcrypt.hash(password, 10);
    
        // Create user in our database
        const user = await User.create({
          name,
          email: email.toLowerCase(), // sanitize: convert email to lowercase
          password: encryptedPassword,
        });
    
        // Create token
        const token = jwt.sign(
          { user_id: user._id, email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );
        // save user token
        user.token = token;

        const user_object  = {
          name,
          email,
          token,
          _id: user._id
        }
    
        // return new user
        res.status(201).json(user_object);
      } catch (err) {
        console.log(err);
      }
      // Our register logic ends here
}

const login = async(req, res)=>{
    try {
        // Get user input
        const { email, password } = req.body;
    
        // Validate user input
        if (!(email && password)) {
          res.status(400).send("All input is required");
        }
        // Validate if user exist in our database
        const user = await User.findOne({ email });
    
        if (user && (await bcrypt.compare(password, user.password))) {
          // Create token
          const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
              expiresIn: "2h",
            }
          );
    
          // save user token
          user.token = token;

          const user_object  = {
            email,
            token,
            _id: user._id
          }
    
          // user
          res.status(200).json(user_object);
        }
        res.status(400).send("Invalid Credentials");
      } catch (err) {
        console.log(err);
      }
      // Our register logic ends here
    }




export default {register, login}