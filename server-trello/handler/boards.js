'use strict'
const { ObjectId } = require("mongodb")
const { insert, Get, update, remove, GetOne } = require('../models/Board')
const { insertlist, removeAll, GetList } = require('../models/List')
const { updateUser } = require("../models/User")
const { GetTasks, removeAllTask } = require("../models/Task")
const createBoard = async (req, res) => {
      const Data = { name: req.body.name, description: req.body.description, userID: req.body.userID }
      const updateMember = updateUser({ role: 'owner' }, { _id: ObjectId(req.body.userID) })
      const ress = await insert(Data)
      if (ress.success == false) {
            res.status(ress.status).json({ success: ress.success, error: ress.error })
      } else {
            await insertlist({ boardID: ress.insert.insertedId, name: 'ToDo' })
            await insertlist({ boardID: ress.insert.insertedId, name: 'Doing' })
            await insertlist({ boardID: ress.insert.insertedId, name: 'Done' })
            res.json(ress)
      }
}

const GetBoard = async (req, res) => {
      const id = { _id: ObjectId(req.params.id) }
      const ress = await GetOne(id)
      if (ress.success == false) {
            res.status(ress.status).json({ success: ress.success, error: ress.error })
      } else {
            const board_id = { boardID: ObjectId(req.params.id) }
            const lists = await GetList(board_id)
            const tasks = await GetTasks(board_id)
            res.json({ Board: ress, lists: lists, task: tasks })
      }
}

const GetBoards = async (req, res) => {
      let ress;
      if (req.body.role == 'admin') {
            ress = await Get()
      } else {
            ress = await Get({ userID: req.body._id })
      }
      if (ress.success == false) {
            res.status(ress.status).json({ success: ress.success, error: ress.error })
      } else {
            res.json(ress)
      }
}
const updateBoard = async (req, res) => {
      const id = { _id: ObjectId(req.body._id) }
      const dataToupdate = { name: req.body.name, description: req.body.description }
      const ress = await update(dataToupdate, id)
      if (ress.success == false) {
            res.status(ress.status).json({ success: ress.success, error: ress.error })
      } else {
            res.json(ress)
      }
}
const removeBoard = async (req, res) => {
      const Data = { _id: ObjectId(req.body._id) }
      const ress = await remove(Data)
      if (ress.success == false) {
            res.status(ress.status).json({ success: ress.success, error: ress.error })
      } else {
            const board_id = { boardID: ObjectId(req.body._id) }
            await removeAll(board_id)
            await removeAllTask(board_id)
            res.json(ress)
      }
}
module.exports = { createBoard, GetBoards, updateBoard, removeBoard, GetBoard }

