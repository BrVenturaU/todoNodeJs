const {Schema, model} = require('mongoose');
const TaskSchema = new Schema({
    title: {
        type: String,
        required: [true, 'El titulo es requerido.']
    },
    description: {
        type: String,
        required: [true, 'La descripción es requerida.']
    },
    isFinished: {
        type: Boolean,
        default: false
    },
    userId:{
        type: String,
        required: [true, 'El usuario es requerido.']
    }
});

const Task = model('Task', TaskSchema);

module.exports = Task;