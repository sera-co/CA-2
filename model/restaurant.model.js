const mongoose=require('mongoose')
const RestaurantSchema=({
    name:String,
    city:String,
    items:[{type:mongoose.Schema.Types.ObjectId,ref:"Item"}]
})
module.exports=mongoose.model("Restaurant",RestaurantSchema);