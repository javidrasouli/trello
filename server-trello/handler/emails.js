'use strict'
const { send, receivedAllpm, receivedBoardPm } = require('../models/Email')

async function sendMessage(req, res) {
  const token = JSON.parse(req.headers.accesstoken)
  const boardID = req.body.boardID
  const message = req.body.message
  const ress = await send(message, boardID, token)
  if (ress.success == false) {
    res.status(ress.status).json({ success: ress.success, error: ress.error })
  } else {
    res.json(ress)
  }
}

async function newMessage(req, res) {
    const token = JSON.parse(req.headers.accesstoken)
    const ress = await receivedAllpm(token)
    if (ress.success == false) {
        res.status(ress.status).json({ success: ress.success, error: ress.error })
    } else {
        res.json(ress)
    }
}

async function boardMassege(req, res) {
    const boardID = req.params.boardID
    console.log('boardID', boardID)
    const token = JSON.parse(req.headers.accesstoken)
    const ress = await receivedBoardPm(boardID, token)
    if (ress.success == false) {
        res.status(ress.status).json({ success: ress.success, error: ress.error })
    } else {
        res.json(ress)
    }
}

module.exports = { sendMessage, newMessage, boardMassege }