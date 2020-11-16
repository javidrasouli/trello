'use strict'
const { ObjectId } = require("mongodb")
const { InsertOne, UpdateOne, FindOne, RemoveOne, RemoveAll, FindAll } = require('../DB/crud')
const { findperson } = require('./User')

const createTeam = async (username,token,boardID,task) => {
      const user = await findperson(token)
      const board = await FindOne('boards', { _id: ObjectId(boardID) })
      const person = await FindOne('users', {username: username})
      if (!person) {
        return { success: false, status: 400, error: "user not found" }
      }
      if (user.role == 'admin' || user._id == board.userID) {
        const boardTeam = {userID: person._id, boardID: ObjectId(boardID), roleInBoard: 'user', task: task }
        const inserted = await InsertOne('boardTeam', boardTeam)
        return inserted
      }
}

const updateTeam = async (DataToUpdate) => {
      const id = { _id: ObjectId(DataToUpdate._id) }
      const updated = await UpdateOne('boardTeam', id, { user_id: DataToUpdate.user_id })
      return updated
}

const removeTeam = async (DataToRemove) => {
      const id = { _id: ObjectId(DataToRemove._id) }
      const remove = await RemoveOne('boardTeam', id)
      return remove
}

const findTeam = async (DataToFind) => {
      const find = await FindAll('boardTeam', DataToFind)
      return find
}

module.exports = { createTeam, removeTeam, updateTeam, findTeam }
