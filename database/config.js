const mongoose = require('mongoose');
const connection = async () => {
    try {
        // Conexion
        await mongoose.connect('mongodb://localhost:27017/todo', {
            useNewUrlParser:true, 
            useUnifiedTopology:true,
            useCreateIndex:true,
            useFindAndModify:false
        });
        console.log('MongoDB is up!');
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = {
    connection
}