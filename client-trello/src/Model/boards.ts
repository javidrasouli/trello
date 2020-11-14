import { post, deleted, put } from '../utils/http'
import { readonly, ref } from 'vue'
import { user } from './auth'

const _boards = ref()
const _errorBoard = ref()

function valid (Board: any) {
  if (Board.name.length < 3) {
    _errorBoard.value = 'Name board must be bigger than 3'
  }
  if (Board.name === '') {
    _errorBoard.value = 'Name board is required'
  }
}

export async function getBoards () {
  _errorBoard.value = ''
  await post('/boards', user.value).then(res => {
    if (res.success === false) {
      _errorBoard.value = res.error
    } else {
      _boards.value = res
    }
  })
}

export async function insertBoard (board: {}) {
  _errorBoard.value = ''
  valid(board)
  if (_errorBoard.value.length < 1) {
    const createBoard = await post('/board', board)
    if (createBoard.success === false) {
      _errorBoard.value = createBoard.error
    } else {
      const boards = await post('/boards', user.value)
      const LastBoard = boards.pop()
      _boards.value.push(LastBoard)
    }
  }
}

export async function updateBoard (oldBoard: {}, DataToUpdate: {}) {
  _errorBoard.value = ''
  await put('/board', DataToUpdate).then(res => {
    if (res.success === false) {
      _errorBoard.value = res.error
    } else {
      const old = _boards.value.indexOf(oldBoard)
      _boards.value[old] = DataToUpdate
    }
  })
}

export async function deletedboard (DataToRemove: {}) {
  _errorBoard.value = ''
  await deleted('/board', DataToRemove).then(res => {
    if (res.success === false) {
      _errorBoard.value = res.error
    } else {
      const old = _boards.value.indexOf(DataToRemove)
      _boards.value.splice(old, 1)
    }
  })
}

export const Boards = readonly(_boards)
export const errorBoard = readonly(_errorBoard)
