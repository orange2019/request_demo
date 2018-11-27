/**
 * superagent 带上cookie请求
 */

const request = require('superagent')

request.post('http://127.0.0.1:4100/testDemo').type('json').then(ret => {
  // 直接请求，肯定fail
  console.log('post /testDemo no auth ret' , ret.body)
})

request.post('http://127.0.0.1:4100/auth').type('json').then(ret => {
  // 先授权
  console.log('post /auth headers' , ret.header)
  let cookies = ret.header['set-cookie']

  console.log('post /auth ret' , ret.body)

  let req = request.post('http://127.0.0.1:4100/testDemo')
  
  // 设置cookie
  cookies.forEach(cookie => {
    req = req.set('Cookie' , cookie)
  })

  // 带上cookie请求
  req.type('json').then(ret => {
    console.log('post /testDemo auth ret' , ret.body)
  })

})