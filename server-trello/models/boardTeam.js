'use strict'
const { ObjectId } = require("mongodb")
const { InsertOne, UpdateOne, FindOne, RemoveOne, FindAll } = require('../DB/crud')
const { findperson } = require('./User')

function check (team) {
      if (team.person.length < 3) {
            return { success: false, status: 400, error: "wrong username" }
      }
      if (!team.person) {
            return { success: false, status: 400, error: "missing username" }
      }
}
const createTeam = async (team,token) => {
      check(team)
      let taskName;
      let taskID;
      const person = await FindOne('users', {username: team.person})
      if (person.status == 403) {
        return { success: false, status: 403, error: "user not found" }
      }
      if (team.taskID != '') {
        const task = await FindOne('Task', {_id: ObjectId(team.taskID)})
        if (task.person != '....') {
          return { success: false, status: 400, error: "Task has person" }
        }
        taskName = task.name
        taskID = task._id
      } else {
        taskName = '....'
        taskID = ''
      }
      const user = await findperson(token)
      const board = await FindOne('boards', { _id: ObjectId(team.boardID) })
      if (user.role == 'admin' || user._id == board.userID) {
            let boardTeam;
        if (taskID != '') {
          await UpdateOne('Task',{_id: ObjectId(taskID)}, {person: team.person})
          boardTeam = {person:team.person, boardID: ObjectId(team.boardID), task: taskName, taskID: ObjectId(taskID) }
        } else {
          boardTeam = {person:team.person, boardID: ObjectId(team.boardID), task: '....', taskID: '' }
        }
        const inserted = await InsertOne('boardTeam', boardTeam)

        return inserted
      }
      return { success: false, status: 403, error: "you can't create" }
}
const updateTeam = async (Team, token) => {
      check(Team)
      const user = await findperson(token)
      const board = await FindOne('boards', { _id: ObjectId(Team.boardID) })
      const Task = await FindOne('Task', {_id: ObjectId(Team.taskID)})
      if (Task.person != '....' && Task.person != Team.person && Task.status == 1) {
        return { success: false, status: 400, error: 'Task has a person' }
      }
      if (user.role == 'admin' || user._id == board.userID) {
            const boardTeam = {taskID: ObjectId(Team.taskID), task: Task.name }
            const updated = await UpdateOne('boardTeam', {_id: ObjectId(Team._id)}, boardTeam)
            if (updated.success == false) {
                  return updated
            }
            await UpdateOne('Task', { _id: Task._id }, { person: Team.person })
            return updated
      }
      return { success: false, status: 403, error: "you can't create" }
}

const removeTeam = async (team, token) => {
      const user = await findperson(token)
      const board = await FindOne('boards', { _id: ObjectId(team.boardID) })
      if (user.role == 'admin' || user._id == board.userID) {
            const TeamID = { _id: ObjectId(team._id) }
            const tasks = await FindAll('Task', {person: team.person})
            for await (const task of tasks) {
              if (task.status == 0) {
                await UpdateOne('Task', {_id: task._id}, {person: '....'})
              }
            }
            const remove = await RemoveOne('boardTeam', TeamID)
            return remove
      }
      return { success: false, status: 403, error: "you can't create" }
}

const findTeam = async (boardID) => {
      const boardid = {boardID: ObjectId(boardID)}
      const find = await FindAll('boardTeam', boardid)
      return find
}

module.exports = { createTeam, removeTeam, updateTeam, findTeam }
