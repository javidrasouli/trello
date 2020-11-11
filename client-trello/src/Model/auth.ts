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
  } else if (user.pass.length > 8) {
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
  } else if (user.pass.length > 8) {
    _err.value = 'password must be longer then 8'
  }
}

export async function login (user: any) {
  _err.value = ''
  checkinputLogin(user)
  if (_err.value.length > 1) {
    _success.value = false
  } else {
    const login = await post('/login', user)
    if (login.success === false) {
      _success.value = false
      _err.value = login.error
    } else {
      const accessToken = JSON.stringify(login.accessToken)
      const refreshtoken = JSON.stringify(login.refreshToken)
      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('refreshtoken', refreshtoken)
      _success.value = true
    }
  }
}

export async function register (user: any) {
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
      await login(user)
    }
  }
}

export const user = readonly(_user)
export const err = readonly(_err)
export const members = readonly(_users)
export const success = readonly(_success)
export const taskmember = readonly(_member)
