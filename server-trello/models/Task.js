"use strict"
const { InsertOne, UpdateOne, RemoveOne, FindAll, RemoveAll, FindOne } = require('../DB/crud')
const { findperson } = require("./User")
const { ObjectId } = require("mongodb")

function check(Task){
  if (!Task.name) {
    const res= { success: false, error: "missing name",status:400 }
    return res
  }
  if (Task.name.length < 3) {
    const res = { success: false, error: "invalid name",status:400 }
    return res
  }
}
async function insertTask(Task, boardID, listID, token) {
      check(Task)
      const user = await findperson(token)
      const board = await FindOne('boards', { _id: ObjectId(boardID) })
      const newTask = { name: Task.name, description: Task.description, stauts: 0, boardID: ObjectId(boardID), listID: ObjectId(listID), user:'' }
      if (user.role == 'admin' || user._id == board.userID) {
        const res = await InsertOne('Task', newTask)
        return res
      }
      return { success: false, status: 403, error: "you can't insert" }
}
async function GetTasks(token) {
      const user = await findperson(token)
      const res = await FindAll('Task', {user: user.username})
      return res
}
async function update(DataToUpdate, ID, token) {
      check(DataToUpdate)
      const Task = await FindOne('Task', { _id: ObjectId(ID) })
      const board = await FindOne('boards', { _id: Task.boardID })
      const user = await findperson(token)
      if (user.role == 'admin' || user._id == board.userID) {
        const res = await UpdateOne('Task', { _id: ObjectId(ID) }, DataToUpdate)
        return res
      }
      return { success: false, status: 403, error: "you can't update" }
}
async function remove(id, token) {
      const Task = await FindOne('Task', { _id: ObjectId(id) })
      const board = await FindOne('boards', { _id: Task.boardID })
      const user = await findperson(token)
      if (user.role == 'admin' || user._id == board.userID) {
        const res = await RemoveOne('Task', { _id: ObjectId(id) })
        return res
      }
      return { success: false, status: 403, error: "you can't remove" }
}
async function removeAllTask(ID) {
      const res = await RemoveAll('Task', ID)
      return res
}
async function changeStatus (id, status) {
      const taskID = {_id: ObjectId(id)}
      const newStatus = { status: status }
      const res = await UpdateOne('Task', taskID, newStatus)
      return res
}

module.exports = { insertTask, update, remove, removeAllTask, GetTasks, changeStatus }