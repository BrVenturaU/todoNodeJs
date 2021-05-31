const {request, response} = require('express');
const Alert = require('../models/alert');
const Task = require('../models/task');


const home = async (req = request, res = response) => {
    try {
        const totalTasks = await Task.find({userId:req.user._id}).countDocuments();
        const totalFinishedTasks = await Task.find({userId:req.user._id, isFinished:true}).countDocuments();
        const totalNotFinishedTasks = await Task.find({userId:req.user._id, isFinished:false}).countDocuments();
        return res.render('../views/home', {user: req.user, taskMeta: {totalTasks, totalFinishedTasks, totalNotFinishedTasks}});
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    home
}