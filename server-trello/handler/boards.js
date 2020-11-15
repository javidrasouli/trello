'use strict'
const { insert, Get, update, remove, GetOne } = require('../models/Board')
const createBoard = async (req, res) => {
      const board = { name: req.body.name, description: req.body.description }
      const token = JSON.parse(req.headers.accesstoken)
      const ress = await insert(board, token)
      if (ress.success == false) {
        res.status(ress.status).json({ success: ress.success, error: ress.error })
      } else {
        res.json(ress)
      }
}

const GetBoard = async (req, res) => {
      const id = { _id: ObjectId(req.params.id) }
      const ress = await GetOne(id)
      if (ress.success == false) {
        res.status(ress.status).json({ success: ress.success, error: ress.error })
      } else {
        res.json(ress)
      }
}

const GetBoards = async (req, res) => {
      const token = JSON.parse(req.headers.accesstoken)
      const ress = await Get(token)
      if (ress.success == false) {
            res.status(ress.status).json({ success: ress.success, error: ress.error })
      } else {
            console.log(ress)
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

