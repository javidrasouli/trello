'use strict'
const { ObjectId } = require("mongodb")
const { insertlist, update, remove, GetList } = require('../models/List')
const { removeAllTask } = require('../models/Task')
const createList = async (req, res) => {
      const Data = { name: req.body.name, boardID: ObjectId(req.body.boardID) }
      const ress = await insertlist(Data)
      if (ress.success == false) {
            res.status(ress.status).json({ success: ress.success, error: ress.error })
      } else {
            res.json(ress)
      }
}
const findLists = async (req, res) => {
      const id = { _id: ObjectId(req.params.id) }
      const ress = await GetList(id)
      if (ress.success == false) {
            res.status(ress.status).json({ success: ress.success, error: ress.error })
      } else {
            res.json(ress)
      }
}

const updateList = async (req, res) => {
      const id = { _id: ObjectId(req.body._id) }
      const dataToupdate = { name: req.body.name }
      const ress = await update(dataToupdate, id)
      if (ress.success == false) {
            res.status(ress.status).json({ success: ress.success, error: ress.error })
      } else {
            res.json(ress)
      }
}
const removeList = async (req, res) => {
      const id = { _id: ObjectId(req.body._id) }
      const ress = await remove(id)
      if (ress.success == false) {
            res.status(ress.status).json({ success: ress.success, error: ress.error })
      } else {
            const listID = { boardID: req.body._id }
            await removeAllTask(listID)
            res.json(ress)
      }
}
module.exports = { createList, findLists, updateList, removeList } 