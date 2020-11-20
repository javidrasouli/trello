'use strict'
const { createTeam, findTeam, updateTeam, removeTeam } = require("../models/boardTeam")

const addUserTOteam = async (req, res) => {
    const team = req.body
    console.log(team)
    const token = JSON.parse(req.headers.accesstoken)
    const ress = await createTeam(team, token)
    console.log(ress)
    if (ress.success == false) {
        res.status(ress.status).json({ success: ress.success, error: ress.error })
    } else {
        res.json(ress)
    }
}
const getBoardTeam = async (req, res) => {
    const boardID = req.params.boardID
    console.log(boardID)
    const ress = await findTeam(boardID)
    if (ress.success == false) {
        res.status(ress.status).json({ success: ress.success, error: ress.error })
    } else {
        res.json(ress)
    }
}
const updateBoardTeam = async (req, res) => {
    const team = req.body
    const token = JSON.parse(req.headers.accesstoken)
    const ress = updateTeam(team, token)
    if (ress.success == false) {
        res.status(ress.status).json({ success: ress.success, error: ress.error })
    } else {
        res.json(ress)
    }
}
const removeUserOfTeam = async (req, res) => {
    const team = req.body
    const token = JSON.parse(req.headers.accesstoken)
    const ress = removeTeam(team, token)
    if (ress.success == false) {
        res.status(ress.status).json({ success: ress.success, error: ress.error })
    } else {
        res.json(ress)
    }
}

module.exports = {addUserTOteam, getBoardTeam, updateBoardTeam, removeUserOfTeam}