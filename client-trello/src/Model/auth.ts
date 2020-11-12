import { post, get, put, deleted } from '../utils/http'
import { readonly, ref } from 'vue'

const _user = ref()
const _success = ref(false)
const _err = ref('')
const _users = ref()
const _member = ref('')

function checkinputRegister (user: any) {
  if (user.username === '') {
    _err.value = 'username is required'
  } else if (user.username.length < 3) {
    _err.value = 'username must be longer then 3'
  } else if (user.pass === '') {
    _err.value = 'password is required'
  } else if (user.pass.length < 8) {
    _err.value = 'password must be longer then 8'
  } else if (user.email === '') {
    _err.value = 'email is required'
  }
}

function checkinputLogin (user: any) {
  if (user.username === '') {
    _err.value = 'username is required'
  } else if (user.username.length < 3) {
    _err.value = 'username must be longer then 3'
  } else if (user.pass === '') {
    _err.value = 'password is required'
  } else if (user.pass.length < 8) {
    _err.value = 'password must be longer then 8'
  }
}

export async function login (user: any, remmeber: boolean) {
  _err.value = ''
  checkinputLogin(user)
  if (_err.value.length > 1) {
    _success.value = false
  } else {
    const loginUser = await post('/login', user)
    if (loginUser.success === false) {
      _success.value = false
      _err.value = loginUser.error
    } else {
      const accessToken = JSON.stringify(loginUser.accessToken)
      const refreshtoken = JSON.stringify(loginUser.refreshToken)
      localStorage.setItem('accessToken', accessToken)
      if (remmeber === true) {
        localStorage.setItem('refreshtoken', refreshtoken)
      }
      _success.value = true
    }
  }
}

export async function register (user: any, remmeber: boolean) {
  _err.value = ''
  checkinputRegister(user)
  if (_err.value.length > 1) {
    _success.value = false
  } else {
    const register = await post('/register', user)
    if (register.success === false) {
      _success.value = false
      _err.value = register.error
    } else {
      await login(user, remmeber)
    }
  }
}

export async function getuser () {
  const user = await get('/user')
  if (user.success === false) {
    _success.value = false
    _err.value = user.error
  } else {
    _user.value = user
  }
}

export async function getUsersSite () {
  const users = await get('/users')
  if (users.success === false) {
    _success.value = false
    _err.value = users.error
  } else {
    _users.value = users
  }
}

export async function AddPerson (user: {}) {
  _err.value = ''
  checkinputRegister(user)
  if (_err.value.length > 1) {
    _success.value = false
  } else {
    const register = await post('/register', user)
    if (register.success === false) {
      _success.value = false
      _err.value = register.error
    } else {
      const users = await get('/users')
      const lastUser = users.pop()
      _users.value.push(lastUser)
    }
  }
}

export async function Editperson (user: {}, Edit: {}) {
  const editUser = await put('/user', Edit)
  if (editUser.success === false) {
    _success.value = false
    _err.value = editUser.error
  } else {
    const countPerson = _users.value.indexOf(user)
    _users.value[countPerson] = Edit
  }
}

export async function deletedPerson (user: {}) {
  const deleteduser = await deleted('/user', user)
  if (deleteduser.success === false) {
    _success.value = false
    _err.value = deleteduser.error
  } else {
    const countPerson = _users.value.indexOf(user)
    _users.value.splice(countPerson, 1)
  }
}

export const user = readonly(_user)
export const err = readonly(_err)
export const members = readonly(_users)
export const success = readonly(_success)
export const taskmember = readonly(_member)
