"use strict"
const {InsertOne,UpdateOne,RemoveOne,FindAll,FindOne}=require('../DB/crud')
const { ObjectId } = require("mongodb")
const { findperson } = require("./User")
const { insertlist, removeAllList, GetList } = require('./List')
const { GetTasks, removeAllTask } = require("./Task")
function checkInput(Data){
      if (!Data.name) {
           const res= { success: false, error: "missing name",status:400 }
            return res
        }
        if (Data.name.length < 3) {
            const res = { success: false, error: "invalid name",status:400 }
            return res
        }
}

async function insert(board, token){
      checkInput(board)
      const user = await findperson(token)
      const Data = { name: board.name, description: board.description, userID: user._id }
      const res =await InsertOne('boards',Data)
      if (res.success == false) {
        return res
      }
      const boardTeam = {userID: user._id, boardID: res.insert.insertedId, roleInBoard: 'owner' }
      const ress = await InsertOne('boardTeam',boardTeam)
      if (res.success == false) {
        return ress
      }
      await insertlist({ boardID: res.insert.insertedId, name: 'ToDo' })
      await insertlist({ boardID: res.insert.insertedId, name: 'Doing' })
      await insertlist({ boardID: res.insert.insertedId, name: 'Done' })
      return { success: true }
}
async function GetOne(ID){
      const res=await FindOne('boards',ID)
      const board_id = { boardID: ObjectId(ID) }
      const lists = await GetList(board_id)
      const tasks = await GetTasks(board_id)
      return { Board: res, lists: lists, task: tasks }
}

async function Get(token){
      const user = await findperson(token)
      const userID = { userID: user._id }
      if (user.role == 'admin') {
        const res=await FindAll('boards', {})
        const boardTeam = await FindAll('boardTeam', userID)
        return { board: res, boardTeam: boardTeam }
      }
      const boardTeam = await FindAll('boardTeam', userID)
      const boards = await FindAll('boards', userID)
      return { board: boards, boardTeam: boardTeam }
}
async function update(DataToUpdate,ID) {
      checkInput(DataToUpdate)
      const res= await UpdateOne('boards',ID,DataToUpdate)
      return res
}
async function remove(Data) {
      const res= await RemoveOne('boards',Data)
      return res
}
module.exports = { insert,Get,update,remove,GetOne}