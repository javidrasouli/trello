"use strict"
const { InsertOne, UpdateOne, RemoveOne, FindAll, RemoveAll, FindOne } = require('../DB/crud')
const { findperson } = require("./User")
const { ObjectId } = require("mongodb")

function check(Task) {
  if (!Task.name) {
    const res = { success: false, error: "missing name", status: 400 }
    return res
  }
  if (Task.name.length < 3) {
    const res = { success: false, error: "invalid name", status: 400 }
    return res
  }
}
async function insertTask(Task, boardID, listID, token) {
  check(Task)
  const user = await findperson(token)
  const board = await FindOne('boards', { _id: ObjectId(boardID) })
  const newTask = { name: Task.name, description: Task.description, status: 0, boardID: ObjectId(boardID), listID: ObjectId(listID), person: Task.person }
  if (user.role == 'admin' || user._id == board.userID) {
    if (newTask.person != '....') {
      const Teams = await FindAll('boardTeam', { boardID: newTask.boardID })
      for (const team of Teams) {
        if (newTask.person == team.person) {
          const res = await InsertOne('Task', newTask)
          await UpdateOne('boardTeam', { _id: team._id }, { task: Task.name, taskID: res.insert.insertedId })
          return res
        }
      }
    }
    const res = await InsertOne('Task', newTask)
    return res
  }
  return { success: false, status: 403, error: "you can't insert" }
}
async function GetTasks(token) {
  const user = await findperson(token)
  const res = await FindAll('Task', { person: user.username })
  return res
}
async function update(DataToUpdate, ID, token) {
  check(DataToUpdate)
  const Task = await FindOne('Task', { _id: ObjectId(ID) })
  if (DataToUpdate.person != '....') {
    const Teams = await FindAll('boardTeam', { boardID: Task.boardID })
    for (const teamTask of Teams) {
      if (teamTask.person == DataToUpdate.person) {
        if (teamTask.task != '....' && Task._id != teamTask.taskID) {
          return { success: false, status: 400, error: "user has a task" }
        }
        await UpdateOne('boardTeam', { _id: teamTask._id }, { task: DataToUpdate.name, taskID: ObjectId(DataToUpdate.ID) })
      }
    }
  }
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
    await UpdateOne('boardTeam', { taskID: ObjectId(id) }, { task: '....', taskID: '' })
    const res = await RemoveOne('Task', { _id: ObjectId(id) })
    return res
  }
  return { success: false, status: 403, error: "you can't remove" }
}
async function removeAllTask(ID) {
  if (ID.listID.length > 1) {
    const tasks = await FindAll('Task', ID)
    for await (const task of tasks) {
      await UpdateOne('boardTeam', { taskID: task._id }, { task: '....', taskID: '' })
    }
  }
  const res = await RemoveAll('Task', ID)
  return res
}
async function changeStatus(id, status) {
  const taskID = { _id: ObjectId(id) }
  const newStatus = { status: status }
  await UpdateOne('boardTeam', { taskID: ObjectId(id) }, { task: '....', taskID: '' })
  const res = await UpdateOne('Task', taskID, newStatus)
  return res
}

module.exports = { insertTask, update, remove, removeAllTask, GetTasks, changeStatus }