const express = require('express')  // gọi express vào để dùng
const app = express()               // triển khai function để tạo app
const path = require('path')
const UserRouter = require('./routers/userRoute')
const TodoRouter = require('./routers/todoRouter')
const IndexRouter = require('./routers/indexRouter')
const ListRouter = require('./routers/listRouter')
const cookieParser = require('cookie-parser')

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser())
app.set('view engine', 'ejs');

app.use('/public', express.static(path.join(__dirname,'./public')))
app.use('/user', UserRouter)
app.use('/todo', TodoRouter)
app.use('/list', ListRouter)
app.use('/', IndexRouter)


app.listen(3000)                    // cấp cho app cổng nghe và nói