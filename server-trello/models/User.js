"use strict"
const { InsertOne, UpdateOne, RemoveOne, FindOne, FindAll, RemoveAll, UpdateAll } = require('../DB/crud')
const jwt = require('jsonwebtoken');
const { ObjectId } = require("mongodb")

function userid(token) {
      const decoded = jwt.verify(token, "30bil")
      return decoded.id
}

function checkInput(Data) {
      if (!Data.username) {
            const res = { success: false, error: "missing username", status: 400 }
            return res
      }
      if (Data.username.length < 3) {
            const res = { success: false, error: "invalid username", status: 400 }
            return res
      }
      if (!Data.pass || Data.pass.length < 8) {
            const res = { success: false, error: "invalid pass", status: 400 }
            return res
      }
}
async function insertUser(Data) {
      checkInput(Data)
      const oldUser = await FindOne('users', { username: Data.username })
      if (oldUser.status == 403) {
            const res = await InsertOne('users', Data)
            return res
      } else {
            return { success: false, error: "user rgistered before", status: 400 }
      }
}

async function findUser(Data) {
      checkInput(Data)
      const res = await FindOne('users', Data)
      return res
}

async function updateUser(DataToUpdate, ID, token) {
      checkInput(DataToUpdate)
      const person = await findperson(token)
      if (person.role == 'admin' || person._id == ID) {
            const user_id = { _id: ObjectId(ID) }
            const res = await UpdateOne('users', user_id, DataToUpdate)
            if (person.username != DataToUpdate.username) {
                  await UpdateAll('Task',{ person: person.username }, {person: DataToUpdate.username})
                  await UpdateAll('see',{ person: person.username }, {person: DataToUpdate.username})
                  await UpdateAll('message',{ person: person.username }, {person: DataToUpdate.username})
                  await UpdateAll('boardTeam',{ person: person.username }, {person: DataToUpdate.username})
            }
            return res
      } else {
            return { success: false, status: 403, error: "you can't use of this method" }
      }
}

async function removeUser(id, token) {
      const person = await findperson(token)
      if (person.role == 'admin' || person._id == id) {
            const user_id = { _id: ObjectId(id) }
            const res = await RemoveOne('users', user_id)
            if (res.success == false) {
                  return res
            }
            const userID = { userID: ObjectId(id) }
            const boards = await FindAll('boards', userID)
            for await (const board of boards) {
                  await RemoveAll('lists', { boardID: board._id })
                  await RemoveAll('Task', { boardID: board._id })
                  await RemoveAll('boardTeam', { boardID: board._id })
                  await RemoveAll('see', { person: person.username })
                  await UpdateAll('message',{person: person.username}, { person: 'Farawin' })
            }
            await RemoveAll('boards', userID)
            return res
      } else {
            return { success: false, status: 403, error: "you can't use of this method" }
      }
}
async function findAll(token) {
      const person = await findperson(token)
      if (person.role == 'admin') {
            const res = await FindAll('users')
            return res
      } else {
            return { success: false, status: 403, error: 'you cant have this data' }
      }
}
async function findperson(token) {
      const id = userid(token)
      const res = await FindOne('users', { _id: ObjectId(id) })
      return res
}
async function Information(token) {
      const person = await findperson(token)
      const boards = await FindAll('boards',{ userID: person._id })
      const task = await FindAll('Task', { person: person.username })
      const teamBoard = await FindAll('boardTeam', { person: person.username })
      return { board: boards.length, task: task.length, team: teamBoard.length }
}

module.exports = { insertUser, findUser, updateUser, removeUser, findAll, findperson, Information }