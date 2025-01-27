const express=require("express")
const mongoose=require("mongoose")
const dotenv=require('dotenv')
dotenv.config()
const app=express()
const Restaurantroute=require('./routes/restaurant.route')
const Itemroute=require('./routes/item.route')

app.use(express.json())
mongoose.connect(process.env.DB_URI)
.then(()=>console.log("Connected MongoDB"))
.catch((err)=>console.error("connection failed",err))

app.use('/restaurant',Restaurantroute)
app.use('/item',Itemroute)



// const resSchema=new mongoose.Schema(file);
// const resModel=new mongoose.model('',resSchema);

// const ItemSchema=new mongoose.Schema(file);
// const ItemModel=new mongoose.model('',ItemSchema);

// app.get('/',()=>{})
// app.post('/',()=>{})
// app.patch('/',()=>{})
// app.delete('/',()=>{})

// app.get('/',()=>{})
// app.post('/',()=>{})
// app.patch('/',()=>{})
// app.delete('/',()=>{})
PORT=3000
 
app.listen(PORT,()=>{
    console.log(`Server running in the port ${PORT}`)
})

