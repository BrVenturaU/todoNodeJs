const {Schema, model} = require('mongoose');

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'El nombre es requerido.']
    },
    email: {
        type: String,
        required: [true, 'El correo electrónico es requerido.'],
        unique: true
    },
    passwordSalt:{
        type: String,
        required: [true, 'La salt de la contraseña es requerida.']
    },
    passwordHash: {
        type: String,
        required: [true, 'El hash de la contraseña es requerido.']
    }
});

UserSchema.methods.toJSON = function(){
    const {__v, passwordHash, passwordSalt, ...user} = this.toObject();
    return user;
}

const User = model('User', UserSchema);

module.exports = User;