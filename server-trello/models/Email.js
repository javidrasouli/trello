'use strict'
const { ObjectId } = require('mongodb')
const { FindAll, InsertOne, FindOne, UpdateOne } = require('../DB/crud')
const { findperson } = require('./User')
function check(pm) {
  if (!pm || pm == '') {
    return { success: false, status: 400, error: 'your message is empty' }
  }
}
const send = async (message, boardID, token) => {
  check(message)
  const user = await findperson(token)
  const pm = { message: message, boardID: ObjectId(boardID), person: user.username }
  const ress = await InsertOne('message', pm)
  return ress
}

const receivedAllpm = async (token) => {
  const user = await findperson(token)
  const teamsUser = await FindAll('boardTeam', { person: user.username })
  let userMessage = []
  for await (const team of teamsUser) {
    const board = await FindOne('boards', { _id: team.boardID })
    const messageBoard = await FindAll('message', { boardID: team.boardID })
    userMessage.push({ id: messageBoard._id, board: board.name, boardID: board._id, count: messageBoard.length })
  }
  const see = await FindAll('see', { person: user.username })
  return { PM: userMessage, see: see }
}

const receivedBoardPm = async (boardID, token) => {
  const pm = await FindAll('message', { boardID: ObjectId(boardID) })
  console.log('pm', pm)
  const user = await findperson(token)
  const see = await FindAll('see', { person: user.username })
  for (const boardPm of see) {
    if (boardPm.boardID == boardID) {
      await UpdateOne('see', { _id: boardPm._id }, { count: pm.length })
    }
  }
  return pm
}

module.exports = { send, receivedAllpm, receivedBoardPm }