'use strict'
const { json } = require('express')
const { insert, Get, update, remove, GetOne, AllBoardsPerson } = require('../models/Board')
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
      const id = req.params.id
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
            res.json(ress)
      }
}

const getAllBoardsPerson = async (req,res) => {
      const token = JSON.parse(req.headers.accesstoken)
      const ress = await AllBoardsPerson(token)
      if (ress.success == false) {
            res.status(ress.status).json({ success: ress.success, error: ress.error })
            return
      }
      res.json(ress)
}

const updateBoard = async (req, res) => {
      const id = req.body._id
      const token = JSON.parse(req.headers.accesstoken)
      const dataToupdate = { name: req.body.name, description: req.body.description }
      const ress = await update(dataToupdate, id, token)
      if (ress.success == false) {
            res.status(ress.status).json({ success: ress.success, error: ress.error })
      } else {
            res.json(ress)
      }
}
const removeBoard = async (req, res) => {
      const Data = req.body._id
      const token = JSON.parse(req.headers.accesstoken)
      const ress = await remove(Data, token)
      if (ress.success == false) {
        res.status(ress.status).json({ success: ress.success, error: ress.error })
      } else {
        res.json(ress)
      }
}
module.exports = { createBoard, GetBoards, updateBoard, removeBoard, GetBoard, getAllBoardsPerson }

