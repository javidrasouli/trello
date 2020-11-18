"use strict"
const { InsertOne, UpdateOne, RemoveOne, FindAll, RemoveAll, FindOne } = require('../DB/crud')
const { ObjectId } = require("mongodb")
const { GetTask, GetTasks, removeAllTask } = require('./Task')
const { findperson } = require('./User')

function check (name) {
  if (name.length < 3) {
      const res = { success: false, error: "invalid name",status:400 }
      return res
  }
  if (!name) {
      const res = { success: false, error: "missing name",status:400 }
      return res
  }
}

async function insertlist(nameList, boardID, token) {
      check(nameList)
      const board = await FindOne('boards', {_id: ObjectId(boardID)})
      const user = await findperson(token)
      const List = { name: nameList, boardID: ObjectId(boardID) }
      if (user.role == 'admin' || user._id == board.userID) {
        const res = await InsertOne('lists', List)
        return res
      }
      return { success: false, status: 403, error: "you can't insert" }
}

async function GetList(ID = {}) {
      const res = await FindAll('lists', ID)
      if (res.success === false) {
            return res
      } else {
            return res
      }
}
async function updateList(DataToUpdate, ID, token) {
      check (DataToUpdate)
      const List_id = { _id: ObjectId(ID) }
      const user = await findperson(token)
      const list = await FindOne('lists', List_id)
      const board = await FindOne('boards', {_id: list.boardID})
      if (user.role == 'admin' || user._id == board.userID) {
        const res = await UpdateOne('lists', List_id, DataToUpdate)
        return res  
      }
      return { success: false, status: 403, error: "you can't update" }
}
async function removeList(id, token) {
      const List_id = { _id: ObjectId(id) }
      const user = await findperson(token)
      const list = await FindOne('lists', List_id)
      const board = await FindOne('boards', {_id: list.boardID})
      if (user.role == 'admin' || user._id == board.userID) {
        const res = await RemoveOne('lists', List_id)
        if (res.success == false) {
          return res
        }
        await RemoveAll('Task', { listID: ObjectId(id) })
        return { success: true }
      }
      return { success: false, status: 403, error: "you can't remove" }
}

module.exports = { insertlist, GetList, updateList, removeList }