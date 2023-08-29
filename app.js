const express=require('express')
const app=express();
const errorMiddleware=require('./middleware/error')
const cookieParser=require('cookie-parser');
app.use(express.json());
app.use(cookieParser())
//routes
const user=require('./routes/user')
const order=require('./routes/order')


app.use('/api',user);
app.use('/api',order)
app.use(errorMiddleware);

module.exports=app;