import { post, get } from '../utils/http'
import { readonly, ref } from 'vue'

const _email = ref()
const _errorEmail = ref()
const _listMessage = ref()
export async function getEmail (boardID: any) {
  const getMessage = await get(`/email/${boardID}`)
  if (getMessage.success === false) {
    _errorEmail.value = getMessage.error
    return
  }
  _email.value = getMessage
}

export async function getAllEmail () {
  const listMessage = await get('/email')
  _listMessage.value = listMessage
}

export async function send (message: any) {
  const sendEmail = await post('/email', message)
  if (sendEmail.success === false) {
    _errorEmail.value = sendEmail.error
    return
  }
  const getMessage = await get(`/email/${message.boardID}`)
  const old = getMessage.pop()
  _email.value.push(old)
}

export const listMessage = readonly(_listMessage)
export const messageBoard = readonly(_email)
export const errorEmail = readonly(_errorEmail)
