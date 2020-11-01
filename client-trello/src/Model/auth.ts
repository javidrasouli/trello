import { post, get, put, deleted } from '../utils/http'
import { readonly, ref } from 'vue'

const _user = ref()
const _err = ref('')
const _error = ref(false)
const _users = ref()
const _member = ref('')
export async function GetUser (user: any) {
  _err.value = ''
  _error.value = false
  await post('/login', user).then(res => {
    if (res.success === false) {
      _error.value = true
      _err.value = res.error
    } else {
      _user.value = res.user
      const accessToken = JSON.stringify(res.accessToken)
      const refreshtoken = JSON.stringify(res.refreshToken)
      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('refreshtoken', refreshtoken)
    }
  })
}

export async function register (user: any) {
  _err.value = ''
  _error.value = false
  const register = await post('/register', user)
  if (register.success === false) {
    _error.value = true
    _err.value = register.error
  } else {
    await GetUser(user)
  }
}

export async function users () {
  _err.value = ''
  _error.value = false
  get('/users').then(res => {
    if (res.success === false) {
      _error.value = true
      _err.value = res.error
    } else {
      _users.value = res
    }
  })
}

export async function findmember (TaskMember: string) {
  _err.value = ''
  _error.value = false
  const members = _users.value
  for await (const member of members) {
    switch (member.username) {
      case TaskMember:
        _member.value = member._id
        return
    }
  }
  _member.value = ''
}

export async function editUser (olduser: {}, DataToUpdate: {}) {
  _err.value = ''
  _error.value = false
  await put('/user', DataToUpdate).then(res => {
    if (res.success === false) {
      _error.value = true
      _err.value = res.error
    } else {
      const old = _users.value.indexOf(olduser)
      _users.value[old] = DataToUpdate
    }
  })
}

export async function deletedUser (DataToRemove: {}) {
  _err.value = ''
  _error.value = false
  await deleted('/user', DataToRemove).then(res => {
    if (res.success === false) {
      _error.value = true
      _err.value = res.error
    } else {
      const old = _users.value.indexOf(DataToRemove)
      _users.value.splice(old, 1)
    }
  })
}

export async function addUser (user: any) {
  _err.value = ''
  _error.value = false
  const register = await post('/register', user)
  if (register.success === false) {
    _error.value = true
    _err.value = register.error
  } else {
    get('/users').then(res => {
      if (res.success === false) {
        _error.value = true
        _err.value = res.error
      } else {
        const lastUser = res.pop()
        _users.value.push(lastUser)
      }
    })
  }
}

export const user = readonly(_user)
export const err = readonly(_err)
export const erorr = readonly(_error)
export const members = readonly(_users)
export const taskmember = readonly(_member)
