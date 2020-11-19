"use strict"
const {InsertOne,UpdateOne,RemoveOne,FindAll,FindOne, RemoveAll}=require('../DB/crud')
const { ObjectId } = require("mongodb")
const { findperson } = require("./User")
const boardTeams = require('../handler/boardTeams')

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
      const boardTeam = {userID: user._id, boardID: res.insert.insertedId, task: '' }
      const ress = await InsertOne('boardTeam', boardTeam)
      if (ress.success == false) {
        return ress
      }
      await InsertOne('lists', { boardID: res.insert.insertedId, name: 'ToDo' })
      await InsertOne('lists', { boardID: res.insert.insertedId, name: 'Doing' })
      await InsertOne('lists', { boardID: res.insert.insertedId, name: 'Done' })
      return { success: true }
}
async function GetOne(ID){
      const id = { _id: ObjectId(ID) }
      const res=await FindOne('boards', id)
      if (res.success == false) {
        return res
      }
      const board_id = { boardID: ObjectId(ID) }
      const lists = await FindAll('lists', board_id)
      const tasks = await FindAll('Task', board_id)
      return { Board: res, lists: lists, task: tasks }
}

async function Get(token){
      const user = await findperson(token)
      const userID = { userID: user._id }
      if (user.role == 'admin') {
        const res=await FindAll('boards', {})
        return res
      }
      const boards = await FindAll('boards', userID)
      return boards
}
async function AllBoardsPerson(token) {
  const user = await findperson(token)
  const boardTeam = await FindAll('boardTeam', {userID: user._id})
  const boards = []
  for await (const board of boardTeam) {
    const Board = await FindOne('boards', {_id: board.boardID})
    boards.push(Board)
  }
  return boards
}

async function update(DataToUpdate, ID, token) {
      checkInput(DataToUpdate)
      const boardID = { _id: ObjectId(ID) }
      const user = await findperson(token)
      const owner = FindOne('boards', boardID)
      if (user.role == 'admin' || user._id == owner.userID) {
        const res= await UpdateOne('boards',boardID,DataToUpdate)
        return res
      }
      return { success: false, status: 403, error: "you can't change" }
}
async function remove(board_ID, token) {
      const boardID = { _id: ObjectId(board_ID) }
      const user = await findperson(token)
      const owner = FindOne('boards', boardID)
      if (user.role == 'admin' || user._id == owner.userID) {
        const res= await RemoveOne('boards',Data)
        const board_id = { boardID: ObjectId(board_ID) }
        await RemoveAll('lists', board_id)
        await RemoveAll('Task', board_id)
        await RemoveAll('boardTeam', board_id)
        return res
      }
      return { success: false, status: 403, error: "you can't remove" }
}
module.exports = { insert,Get,update,remove,GetOne, AllBoardsPerson}