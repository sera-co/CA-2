const express=require('express')
const Restaurant=require('../model/restaurant.model')
const Item=require('../model/item.model')
const router=express.Router();
router.post('/',async(req,res)=>{
    try{
        const{name,price,restaurantId}=req.body;
        const restaurant=await Restaurant.findById(restaurantId).populate("items")
        if(!restaurant){
            return res.status(404).send("Restaurant not found")
        }

        const item=new Item({name,price});
        await item.save();

        restaurant.items.push(item._id)
        await restaurant.save();

        const updatedRestaurant=await Restaurant.findById(restaurant._id).populate("items")
        res.json({
            name:updatedRestaurant.name,
            city:updatedRestaurant.city,
            restaurantId:updatedRestaurant.restaurantId,
            items:updatedRestaurant.items
        })
        
    }catch(err){
        return res.status(500).json({error:err.message})
    }
})
router.get('/:id',async(req,res)=>{
    try{
        const item=await Item.findById(req.params.id)
        if(!item){
            return res.status(404).send("Item not found")
        }
        res.json(item)

    }catch(err){
        return res.status(500).json({error:err.message})
    }
})
router.patch('/:id',async(req,res)=>{
    try{
        const item=await Item.findByIdAndUpdate(req.params.id,req.body,{new:true})
        if(!item){
            return res.status(404).send("Item not found")
        }
        res.json(item)

    }catch(err){
        return res.status(400).json({error:err.message})
    }
})
router.delete('/:id',async(req,res)=>{
    try{
        const item=await Item.findByIdAndDelete(req.params.id)
        if(!item){
            return res.status(404).send("Item not found")
        }
        res.json({message:"Item deleted successfully"})

    }catch(err){
        return res.status(500).json({error:err.message})
    }
})
module.exports=router;
