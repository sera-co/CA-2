const express=require('express')
const Restaurant=require('../model/restaurant.model')
const router=express.Router();
router.post('/',async(req,res)=>{
    try{
        const restaurant=new Restaurant(req.body)
        await restaurant.save();
        res.json(restaurant)

    }catch(err){
        return res.status(400).json({error:err.message})
    }
})
router.get('/:id',async(req,res)=>{
    try{
        const restaurant=await Restaurant.findById(req.params.id).populate("items")
        if(!restaurant){
            return res.status(404).send("Restaurant not found")
        }
        res.json(restaurant)

    }catch(err){
        return res.status(500).json({error:err.message})
    }
})
router.patch('/:id',async(req,res)=>{
    try{
        const restaurant=await Restaurant.findByIdAndUpdate(req.params.id,req.body,{new:true})
        if(!restaurant){
            return res.status(404).send("Restaurant not found")
        }
        res.json(restaurant)

    }catch(err){
        return res.status(400).json({error:err.message})
    }
})
router.delete('/:id',async(req,res)=>{
    try{
        const restaurant=await Restaurant.findByIdAndDelete(req.params.id)
        if(!restaurant){
            return res.status(404).send("Restaurant not found")
        }
        res.json({message:"Restaurant deleted successfully"})

    }catch(err){
        return res.status(500).json({error:err.message})
    }
})
module.exports=router;
