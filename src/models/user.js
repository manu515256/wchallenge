import mongoose, {Schema} from 'mongoose'

const userSchema = new Schema({
    name:{type:String, maxlength:20},
    surname:{type:String, maxlength:20},
    username:{type:String, maxlength:20, unique:true, required:true},
    password:{type:String, maxlength:70, required:true},
    coin:{type:String, maxlength:10},
    state:{type:Number, default:1},
    rol:{type:Number, default:1},
    createdAt:{type:Date, default:Date.now}
})

const User = mongoose.model('user',userSchema);

export default User