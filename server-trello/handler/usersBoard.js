'use strict'
const { insert, update, remove, find } = require('../models/UsersBoard')
const insertusersboard = async (req, res) => {
      const ress = await insert(req.body)
      if (ress.success === false) {
            res.json(ress)
            return
      }
      res.json({ success: true })
}

const updateusersboard = async (req, res) => {
      const ress = await update(req.body)
      if (ress.success === false) {
            res.json(ress)
            return
      }
      res.json({ success: true })
}

const removeusersboard = async (req, res) => {
      const ress = await remove(req.body)
      if (ress.success === false) {
            res.json(ress)
            return
      }
      res.json({ success: true })
}

const findusersboard = async (req, res) => {
      const ress = await find(req.body)
      if (ress.success === false) {
            res.json(ress)
            return
      }
      res.json(ress)
}

module.exports = { insertusersboard, removeusersboard, updateusersboard, findusersboard }