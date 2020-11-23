import { post, get, put, deleted } from '../utils/http'
import { readonly, ref } from 'vue'

const _board = ref()
const _errList = ref()
const _Team = ref()
const _tasksUser = ref()

function check (Task: any) {
  if (!Task.name) {
    _errList.value = 'missing name'
  }
  if (Task.name.length < 3) {
    _errList.value = 'invalid name'
  }
}

export async function BoardList (boardID: any) {
  _errList.value = ''
  await get(`/board/${boardID}`).then(res => {
    if (res.success === false) {
      _errList.value = res.error
    } else {
      _board.value = res
    }
  })
}

export async function insertList (List: any) {
  _errList.value = ''
  const res = await post('/list', List)
  if (res.success === false) {
    _errList.value = res.error
    return
  }
  const board = await get(`/board/${List.boardID}`)
  debugger
  const lastList = board.lists.pop()
  _board.value.lists.push(lastList)
}

export async function updateList (oldList: {}, DataToUpdate: {}) {
  _errList.value = ''
  await put('/list', DataToUpdate).then(res => {
    if (res.success === false) {
      _errList.value = res.error
    } else {
      const old = _board.value.lists.indexOf(oldList)
      _board.value.lists[old] = DataToUpdate
    }
  })
}

export async function deletedList (DataToRemove: {}) {
  _errList.value = ''
  await deleted('/list', DataToRemove).then(res => {
    if (res.success === false) {
      _errList.value = res.error
    } else {
      const old = _board.value.lists.indexOf(DataToRemove)
      _board.value.lists.splice(old, 1)
    }
  })
}

export async function AddTask (Task: any) {
  _errList.value = ''
  check(Task)
  if (_errList.value.length < 1) {
    const newtask = await post('/task', Task)
    if (newtask.success === false) {
      _errList.value.value = newtask.error
    } else {
      await get(`/board/${Task.boardID}`).then(res => {
        _board.value.task.push(res.task.pop())
      })
    }
  }
}

export async function Team (board: any) {
  const teamBoard = await get(`/team/${board._id}`)
  _Team.value = teamBoard
}

export async function updateTask (oldTask: {}, DataToUpdate: {}) {
  _errList.value = ''
  await put('/task', DataToUpdate).then(res => {
    if (res.success === false) {
      _errList.value = res.error
    } else {
      const index = _board.value.task.indexOf(oldTask)
      _board.value.task[index] = DataToUpdate
    }
  })
}

export async function deletedTask (DataToRemove: {}) {
  _errList.value = ''
  await deleted('/task', DataToRemove).then(res => {
    if (res.success === false) {
      _errList.value = res
    } else {
      const old = _board.value.task.indexOf(DataToRemove)
      _board.value.task.splice(old, 1)
    }
  })
}

export async function getTasks (Todo: boolean) {
  await get('/task').then(res => {
    const todoTask = res
    if (Todo === true) {
      _tasksUser.value = []
      for (const task of todoTask) {
        if (task.status === 0) {
          _tasksUser.value.push(task)
        }
      }
    } else {
      _tasksUser.value = []
      for (const task of todoTask) {
        if (task.status === 1) {
          _tasksUser.value.push(task)
        }
      }
    }
  })
}

export async function AllTasks () {
  const All = await get('/task')
  _tasksUser.value = All
}

export async function Done (oldTask: {}, task: {}) {
  _errList.value = ''
  const taskdone = await put('/doneTask', task)
  if (taskdone.success === false) {
    _errList.value = taskdone.error
  } else {
    const old = _tasksUser.value.indexOf(oldTask)
    _tasksUser.value[old] = task
  }
}

export async function addTeam (team: any) {
  _errList.value = ''
  const add = await post('/team', team)
  if (add.success === false) {
    _errList.value = add.error
    return
  }
  const teamBoard = await get(`/team/${team.boardID}`)
  const newteam = teamBoard.pop()
  _Team.value.push(newteam)
}

export async function updateTeam (oldTeam: any, newTeam: {}) {
  _errList.value = ''
  const update = await put('/team', newTeam)
  if (update.success === false) {
    _errList.value = update.error
    return
  }
  const oldteam = _Team.value.indexOf(oldTeam)
  _Team.value[oldteam] = newTeam
}

export async function removeTeam (team: {}) {
  const deletedTeam = await deleted('/team', team)
  if (deletedTeam.success === false) {
    _errList.value = deletedTeam.error
    return
  }
  const old = _Team.value.indexOf(team)
  _Team.value.splice(old, 1)
}

export const Lists = readonly(_board)
export const taskUser = readonly(_tasksUser)
export const errorList = readonly(_errList)
export const TeamBoard = readonly(_Team)
