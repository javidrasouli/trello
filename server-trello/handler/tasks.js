'use strict'
const { ObjectId } = require("mongodb")
const { insertTask, update, remove, GetTasks } = require('../models/Task')
const createTask = async (req, res) => {
      const Data = { boardID: ObjectId(req.body.boardID), listID: req.body.listID, userID: req.body.userID, name: req.body.name, description: req.body.description }
      const ress = await insertTask(Data)
      if (ress.success == false) {
            res.status(ress.status).json({ success: ress.success, error: ress.error })
      } else {
            res.json(ress)
      }
}
const findTask = async (req, res) => {
      const id = { boardID: ObjectId(req.params.id) }
      const ress = await GetTasks(id)
      if (ress.success == false) {
            res.status(ress.status).json({ success: ress.success, error: ress.error })
      } else {
            res.json(ress)
      }
}

const findTasks = async (req, res) => {
      const ress = await GetTasks(req.body)
      if (ress.success == false) {
            res.status(ress.status).json({ success: ress.success, error: ress.error })
      } else {
            res.json(ress)
      }
}

const updateTask = async (req, res) => {
      const id = { _id: ObjectId(req.body._id) }
      const dataToupdate = { name: req.body.name, description: req.body.description, userID: req.body.userID }
      const ress = await update(dataToupdate, id)
      if (ress.success == false) {
            res.status(ress.status).json({ success: ress.success, error: ress.error })
      } else {
            res.json(ress)
      }
}
const removeTask = async (req, res) => {
      const id = { _id: ObjectId(req.body._id) }
      const ress = await remove(id)
      if (ress.success == false) {
            res.status(ress.status).json({ success: ress.success, error: ress.error })
      } else {
            res.json(ress)
      }
}
module.exports = { createTask, findTask, updateTask, removeTask, findTasks } 