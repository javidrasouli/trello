const router = require("express").Router()
const user = require("./handler/users")
const board = require("./handler/boards")
const list = require("./handler/lists")
const boardTeam = require("./handler/boardTeams")
const Task = require("./handler/tasks")
const { isAuth, refreshToken } = require("./authMiddleware")
//members
router.post("/login", user.login)
router.get("/users",isAuth , user.findAlluser)
router.put("/user",isAuth , user.editUser)
router.delete("/user",isAuth , user.deletedUser)
router.post("/register", user.register)
router.post("/refresh-token", refreshToken)
router.get("/user",isAuth , user.findmember)
//boards
router.get("/board",isAuth , board.GetBoards)
router.get("/AllBoards", isAuth, board.getAllBoardsPerson)
router.get("/board/:id",isAuth , board.GetBoard)
router.post("/board",isAuth , board.createBoard)
router.put("/board",isAuth , board.updateBoard)
router.delete("/board",isAuth , board.removeBoard)
//list
router.post("/list",isAuth , list.createList)
router.put("/list",isAuth , list.update)
router.delete("/list",isAuth , list.remove)
// //Task
router.get("/task", isAuth, Task.getALL)
router.put('/doneTask', isAuth, Task.DoneTask)
router.put("/task",isAuth , Task.updateTask)
router.delete("/task",isAuth , Task.removeTask)
router.post("/task",isAuth , Task.createTask)
router.put("/DoneTask",isAuth , Task.DoneTask)
//BoardTeam
router.get("/team/:boardID", isAuth, boardTeam.getBoardTeam)
router.post("/team", isAuth, boardTeam.addUserTOteam)
module.exports = router