const express = require('express') // express
const session = require('express-session') // session
const bodyParser = require('body-parser') // 处理请求中body的内容
const methodOverride = require('method-override')
const uuid = require('uuid')

let app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(bodyParser.raw({ type: 'application/xml' }))
app.use(bodyParser.text({ type: 'text/xml' }))

app.use(methodOverride('_method'))

app.use(session({
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
  secret: '123456'// session加密
}))

app.post('/auth' , async(req , res) => {
  req.session.auth = {id: 1}

  return res.json({code: 0 , message: 'success'})
})

app.post('/testDemo' , async(req , res) => {

  let auth = req.session.auth
  if(!auth || !auth.id){
    return res.json({code : 1 , message : 'fail'})
  }else{
    return res.json({code : 0 , message : 'success'})
  }
  
})

app.use(function(err, req, res, next){
  // log it
  if (!module.parent) {
    console.log(err)
    console.log('500' , err)
  }
  if (req.xhr){
    // console.log(err)
    return res.status(500).json({code:500 , data : err})
  }else{
    // error page
    return res.status(500).send('500 error')
  }
  
  // next()
})

// assume 404 since no middleware responded
app.use(function(req, res, next){

  if (req.xhr){
    return res.status(404).json({code:404})
  }else{
    // error page
    return res.status(404).send('404 not found!')
  }
  
})

/* istanbul ignore next */
if (!module.parent) {
  let port = '4100'
  app.listen(port , () => {
    console.log('api server started on port:' + port)
  })
  
  // console.log('express web started on port 8080')
  
}