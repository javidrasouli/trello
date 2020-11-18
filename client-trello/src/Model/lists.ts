import { post, get, put, deleted } from '../utils/http'
import { readonly, ref } from 'vue'

const _board = ref()
const _errList = ref()
const _memberTask = ref()
const _membersTasks = ref()
const _tasksUser = ref()
const _taskDone = ref()
const _error = ref(false)

export async function BoardList (boardID: any) {
  _errList.value = ''
  _error.value = false
  await get(`/board/${boardID}`).then(res => {
    if (res.success === false) {
      _errList.value = res.error
      _error.value = true
    } else {
      _board.value = res
      debugger
    }
  })
}

export async function insertList (List: {}) {
  _errList.value = ''
  _error.value = false
  await post('/list', List).then(res => {
    if (res.success === false) {
      _errList.value = res.error
      _error.value = true
    } else {
      _board.value.lists.push(List)
    }
  })
}

export async function updateList (oldList: {}, DataToUpdate: {}) {
  _errList.value = ''
  _error.value = false
  await put('/list', DataToUpdate).then(res => {
    if (res.success === false) {
      _errList.value = res.error
      _error.value = true
    } else {
      const old = _board.value.lists.indexOf(oldList)
      _board.value.lists[old] = DataToUpdate
    }
  })
}

export async function deletedList (DataToRemove: {}) {
  _errList.value = ''
  _error.value = false
  await deleted('/list', DataToRemove).then(res => {
    if (res.success === false) {
      _errList.value = res.error
      _error.value = true
    } else {
      const old = _board.value.lists.indexOf(DataToRemove)
      _board.value.lists.splice(old, 1)
    }
  })
}

export async function AddTask (Task: any) {
  _errList.value = ''
  _error.value = false
  const newtask = await post('/task', Task)
  if (newtask.success === false) {
    _errList.value.value = newtask.error
    _error.value = true
  } else {
    await get(`/board/${Task.boardID}`).then(res => {
      _board.value.task.push(res.task.pop())
    })
  }
}

export async function getMemberTask (id: any) {
  _errList.value = ''
  _error.value = false
  const member = await post('/findmember', id)
  if (member.success === false) {
    _errList.value = member.error
    _error.value = true
  } else {
    _memberTask.value = member
  }
}

export async function getmembersTask (Tasks: any) {
  _errList.value = ''
  _error.value = false
  _membersTasks.value = []
  for await (const task of Tasks) {
    await post('/findmember', { id: task.userID }).then(res => {
      if (res.success === false) {
        _errList.value = res.error
        _error.value = true
      } else {
        _membersTasks.value.push(res)
      }
    })
  }
}

export async function updateTask (oldTask: {}, DataToUpdate: {}) {
  _errList.value = ''
  _error.value = false
  await put('/task', DataToUpdate).then(res => {
    if (res.success === false) {
      _errList.value = res.error
      _error.value = true
    } else {
      const index = _board.value.task.indexOf(oldTask)
      _board.value.task[index] = DataToUpdate
    }
  })
}

export async function deletedTask (DataToRemove: {}) {
  _errList.value = ''
  _error.value = false
  await deleted('/task', DataToRemove).then(res => {
    if (res.success === false) {
      _errList.value = res
      _error.value = true
    } else {
      const old = _board.value.task.indexOf(DataToRemove)
      _board.value.task.splice(old, 1)
    }
  })
}

export async function getTasks () {
  await get('/task').then(res => {
    _tasksUser.value = res
  })
}

export async function TaskDone () {
  const res = await get('/task')
  for (const task of res) {
    if (task.status === 1) {
      _taskDone.value.push(task)
    }
  }
}

export const Lists = readonly(_board)
export const memberTask = readonly(_memberTask)
export const membersTasks = readonly(_membersTasks)
export const taskUser = readonly(_tasksUser)
export const errorList = readonly(_errList)
export const erorr = readonly(_error)
