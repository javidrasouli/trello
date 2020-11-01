'use strict'
const { ObjectId } = require("mongodb")
const { InsertOne, UpdateOne, FindOne, RemoveOne, RemoveAll, FindAll } = require('../DB/crud')
const { findperson } = require('./User')

const insert = async (DataToInsert) => {
      const inserted = await InsertOne('usersBoard', DataToInsert)
      return inserted
}

const update = async (DataToUpdate) => {
      const id = { _id: ObjectId(DataToUpdate._id) }
      const user = DataToUpdate.user_id
      console.log(user)
      const updated = await UpdateOne('usersBoard', id, { user_id: DataToUpdate.user_id })
      return updated
}

const remove = async (DataToRemove) => {
      const id = { _id: ObjectId(DataToRemove._id) }
      const remove = await RemoveOne('usersBoard', id)
      return remove
}

const find = async (DataToFind) => {
      const boardID = { board_id: DataToFind.boardID }
      const find = await FindAll('usersBoard', boardID)
      const users = []
      for (const key of find) {
            const userid = { _id: ObjectId(key.user_id) }
            const user = await findperson(userid)
            users.push(user)
      }
      return users
}

module.exports = { insert, remove, update, find }
