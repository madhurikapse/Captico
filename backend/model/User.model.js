import {model,Schema} from "mongoose"

const userSchema=new Schema({
    name:String,
    email:String,
    password:{type:String ,required:true}
})
const User = model("Users",userSchema)
export default User