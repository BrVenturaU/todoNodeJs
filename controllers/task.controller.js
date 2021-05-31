const {request, response} = require('express');
const Task = require('../models/task');

const get = async (req = request, res = response) => {
    try {
        const tasks = await Task.find({userId:req.user._id}).lean();
        return res.render('../views/tasks/index', {user: req.user, tasks});
    } catch (error) {
        console.log(error);
    }
}

const create = async (req = request, res = response) => {
    try {
        return res.render('../views/tasks/create', {user: req.user});
    } catch (error) {
        console.log(error);
    }
}

const edit = async (req = request, res = response) => {
    try {
        const {id} = req.params;
        const task = await Task.findOne({_id:id}).lean();
        return res.render('../views/tasks/edit', {user: req.user, task: task});
    } catch (error) {
        console.log(error);
    }
}

const store = async (req = request, res = response) => {
    try {
        const {title, description} = req.body;
        const task = new Task({'title':title, 'description':description, 'userId':req.user._id});
        await task.save();
        return res.redirect('/tasks/index');
    } catch (error) {
        console.log(error);
    }
}

const update = async (req = request, res = response) => {
    try {
        const {title, description, isFinished} = req.body;
        const isFinishedParsed = isFinished == "0" ? false : true;
        const {id} = req.params;
        const task = await Task.findOneAndUpdate({_id:id}, { $set: { 'title':title, 'description':description, 'isFinished':isFinishedParsed }});
        return res.redirect(`/tasks/${task._id}/edit`);
    } catch (error) {
        console.log(error);
    }
}

const deleteTask = async (req = request, res = response) => {
    try {
        const {id} = req.params;
        const task = await Task.findOneAndDelete({_id:id});
        return res.redirect('/tasks/index');
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    get,
    create,
    store,
    edit,
    update,
    deleteTask
}