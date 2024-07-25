const User=require('../models/userModel')

exports.getUser=async(req,res)=>{

    const user=await User.findById({_id:req.user.id}).select('-password')
    if(user){
        res.status(200).json(user)
    }else{
        res.status(404).json({msg:'User not found.'})
    }

}