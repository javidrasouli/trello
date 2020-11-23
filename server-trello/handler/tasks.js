'use strict'
const { insertTask, update, remove, changeStatus, GetTasks } = require('../models/Task')
const createTask = async (req, res) => {
      const Task = { name: req.body.name, description: req.body.description, person: req.body.person }
      const boardID = req.body.boardID
      const listID = req.body.listID
      const token = JSON.parse(req.headers.accesstoken)
      const ress = await insertTask(Task, boardID, listID, token)
      if (ress.success == false) {
            res.status(ress.status).json({ success: ress.success, error: ress.error })
      } else {
            res.json(ress)
      }
}
const updateTask = async (req, res) => {
      const id = req.body._id
      const token = JSON.parse(req.headers.accesstoken)
      const dataToupdate = { name: req.body.name, description: req.body.description, person: req.body.person }
      const ress = await update(dataToupdate, id, token)
      console.log(ress)
      if (ress.success == false) {
            res.status(ress.status).json({ success: ress.success, error: ress.error })
      } else {
            res.json(ress)
      }
}

const DoneTask = async (req, res) => {
      const id = req.body._id
      const status = req.body.status
      const ress = await changeStatus(id, status)
      if (ress.success == false) {
            res.status(ress.status).json({ success: ress.success, error: ress.error })
      } else {
            res.json(ress)
      }
}

const removeTask = async (req, res) => {
      const id = req.body._id
      const token = JSON.parse(req.headers.accesstoken)
      const ress = await remove(id, token)
      if (ress.success == false) {
            res.status(ress.status).json({ success: ress.success, error: ress.error })
      } else {
            res.json(ress)
      }
}
const getALL = async (req, res) => {
      const token = JSON.parse(req.headers.accesstoken)
      const ress = await GetTasks(token)
      if (ress.success == false) {
            res.status(ress.status).json({ success: ress.success, error: ress.error })
      } else {
            res.json(ress)
      }
}

module.exports = { createTask, updateTask, removeTask, DoneTask, getALL } 