const mongoose=require('mongoose')
const ItemSchema=mongoose.Schema({
    name:String,
    price:Number,
})
module.exports=mongoose.model("Item",ItemSchema);