'use strict'
const { insertlist, updateList, removeList } = require('../models/List')

const createList = async (req, res) => {
      const nameList = req.body.name
      const boardID = req.body.boardID
      const token = JSON.parse(req.headers.accesstoken)
      const ress = await insertlist(nameList, boardID, token)
      if (ress.success == false) {
            res.status(ress.status).json({ success: ress.success, error: ress.error })
      } else {
            res.json(ress)
      }
}
const update = async (req, res) => {
      const id = req.body._id
      const token = JSON.parse(req.headers.accesstoken)
      const dataToupdate = req.body.name
      const ress = await updateList(dataToupdate, id, token)
      if (ress.success == false) {
            res.status(ress.status).json({ success: ress.success, error: ress.error })
      } else {
            res.json(ress)
      }
}
const remove = async (req, res) => {
      const id = req.body._id
      const token = JSON.parse(req.headers.accesstoken)
      const ress = await removeList(id, token)
      if (ress.success == false) {
        res.status(ress.status).json({ success: ress.success, error: ress.error })
      } else {
        res.json(ress)
      }
}
module.exports = { createList, update, remove } 