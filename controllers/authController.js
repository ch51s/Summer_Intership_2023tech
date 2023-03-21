import { comparePassword, hashPassword } from "../helpers(utils)/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";

export const registerController = async (req,res) => {
    try {
        const {name,email,password,phone,address} = req.body;

        //validation
        if(!name){
            return res.send({error:'Name is Required'});
        }
        if(!email){
            return res.send({error:'Email is Required'});
        }
        if(!password){
            return res.send({error:'password is Required'});
        }
        if(!phone){
            return res.send({error:'Phone no is Required'});
        }
        if(!address){
            return res.send({error:'Address is Required'});
        }

       //check user
        const existingUser = await userModel.findOne({email})
         //existing user looking
            if(existingUser){
                return res.status(200).send({
                    success:true,
                    message:'Already a user Please Login',
                })
            }

        //register user
        const hashedPassword = await hashPassword(password)

        //save
        const user = await new userModel({name,email,phone,address,password:hashedPassword}).save();

        res.status(201).send({
            success:true,
            message:'User Registered Successfully',
            user,
        });


    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in Registration',
            error,
        });
    }
};


//POST LOGIN
export const loginController = async (req,res) => {
    try {
        const {email,password} = req.body
        // validation 
        if (!email || !password){
            return res.status(404).send({
                success:false,
                message:'Invalid email or password'
            })
        }
        //check user
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(404).send({
                success:false,
                message:"Email is not registered",
            });
        }

       
        const match = await comparePassword(password,user.password)
        if(!match){
            return res.status(200).send({
                success:false,
                message:"Invalid Password",
            });
        }

         //CREATING TOKEN
         const token = await JWT.sign({_id:user._id}, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });
        res.status(200).send({
            success:true,
            message:"Login Successfully",
            user:{
                name:user.name,
                email: user.email,
                phone:user.phone,
                address: user.addresss
            },
            token,
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"error in login",
            error,
        });
    }
}; 






//test Controller

export const testController = (req,res) =>{
    res.send("Protected Routes");
};