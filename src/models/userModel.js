import {model, Schema} from 'mongoose'
import bcrypt from 'bcrypt'

const rolesValidos = {
    values: ['DRIVER_ROLE', 'USER_ROLE', 'ADMIN_ROLE'],
    message: '{VALUE} no es un rol valido'
}

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
    googleId:{
        type: String,
        default: false
    },
    img:{
        type: String,
        required: false,
    },
    rol:{
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    },
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