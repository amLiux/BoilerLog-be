import {model, Schema} from 'mongoose'
import bcrypt from 'bcrypt'


const User = new Schema({
    user:{
        type: String,
        index: {unique: true},
        required: [true, 'El nombre es necesario']
    },
    pass:{
        type: String,
        required: [true, 'El password es necesario']
    },
    estado:{
        type: Boolean,
        default: true
    },
    google:{
        type: Boolean,
        default: false,
    },
    img:{
        type: String,
        required: false,
    }
})

User.methods.encriptarPassword = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

User.methods.toJSON = function(){
    let user = this;
    let userObject = user.toObject();
    delete userObject.pass;
    return userObject;
}

User.methods.compararPassword = function(password){
    return bcrypt.compareSync(password, this.pass)
} 

export default model('users', User)