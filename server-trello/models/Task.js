"use strict"
const { InsertOne, UpdateOne, RemoveOne, FindAll, RemoveAll, FindOne } = require('../DB/crud')

async function insertTask(Data) {
      console.log(Data)
      const res = await InsertOne('Task', Data)
      return res
}

async function GetTask(ID) {
      const res = await FindOne('Task', ID)
      return res
}

async function GetTasks(ID = {}) {
      const res = await FindAll('Task', ID)
      return res
}

async function update(DataToUpdate, ID) {
      const res = await UpdateOne('Task', ID, DataToUpdate)
      return res
}
async function remove(Data) {
      const res = await RemoveOne('Task', Data)
      return res
}

async function removeAllTask(ID) {
      const res = await RemoveAll('Task', ID)
      return res
}
module.exports = { insertTask, GetTask, update, remove, removeAllTask, GetTasks }