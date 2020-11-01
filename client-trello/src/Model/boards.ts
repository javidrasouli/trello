import { post, deleted, put } from '../utils/http'
import { readonly, ref } from 'vue'
import { user } from './auth'

const _boards = ref()
const _errorBoard = ref()
const _error = ref(false)

export async function getBoards () {
  _errorBoard.value = ''
  _error.value = false
  await post('/boards', user.value).then(res => {
    if (res.success === false) {
      _errorBoard.value = res.error
      _error.value = false
    } else {
      _boards.value = res
    }
  })
}

export async function insertBoard (board: {}) {
  _errorBoard.value = ''
  _error.value = false
  const createBoard = await post('/board', board)
  if (createBoard.success === false) {
    _errorBoard.value = createBoard.error
    _error.value = true
  } else {
    const boards = await post('/boards', user.value)
    const LastBoard = boards.pop()
    _boards.value.push(LastBoard)
  }
}

export async function updateBoard (oldBoard: {}, DataToUpdate: {}) {
  _errorBoard.value = ''
  _error.value = false
  await put('/board', DataToUpdate).then(res => {
    if (res.success === false) {
      _errorBoard.value = res.error
      _error.value = true
    } else {
      const old = _boards.value.indexOf(oldBoard)
      _boards.value[old] = DataToUpdate
    }
  })
}

export async function deletedboard (DataToRemove: {}) {
  _errorBoard.value = ''
  _error.value = false
  await deleted('/board', DataToRemove).then(res => {
    if (res.success === false) {
      _errorBoard.value = res.error
      _error.value = true
    } else {
      const old = _boards.value.indexOf(DataToRemove)
      _boards.value.splice(old, 1)
    }
  })
}

export const Boards = readonly(_boards)
export const errorBoard = readonly(_errorBoard)
export const erorr = readonly(_error)
