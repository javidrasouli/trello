import router from '@/router'

export function request (method: 'Get' | 'Post' | 'PUT' | 'DELETE', url: string, data?: any) {
  return new Promise <any>((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open(method, url)
    xhr.setRequestHeader('Content-Type', 'application/json')
    const accessToken = localStorage.getItem('accessToken')
    if (accessToken != null) {
      xhr.setRequestHeader('accessToken', accessToken)
    }
    xhr.onload = async () => {
      try {
        const res = JSON.parse(xhr.responseText)
        if (xhr.status === 401) {
          try {
            const result = await request('Post', '/refresh-token', { refreshToken: localStorage.getItem('refreshtoken') })
            if (result.success === false) {
              router.push('/Login')
            } else {
              const accessToken = JSON.stringify(result.accessToken)
              const refreshtoken = JSON.stringify(result.refreshtoken)
              localStorage.setItem('accessToken', accessToken)
              localStorage.setItem('refreshtoken', refreshtoken)
              return request(method, url, data)
            }
          } catch {
            router.push('/Login')
          }
        }
        resolve(res)
      } catch (err) {
        reject(err)
      }
    }
    xhr.onerror = reject
    xhr.send(JSON.stringify(data))
  })
}
export function get (url: string) {
  return request('Get', url)
}
export function post (url: string, data: any) {
  return request('Post', url, data)
}
export function put (url: string, data: any) {
  return request('PUT', url, data)
}
export function deleted (url: string, data: any) {
  return request('DELETE', url, data)
}
