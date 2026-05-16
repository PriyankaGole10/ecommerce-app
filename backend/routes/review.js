const express= require('express');
const router = express.Router();
const {getAllReviewsOfOneProduct,addReview,getReviewById,updateReview,deleteReview} = require('./../handlers/review-handler');


router.get('/:productId',async(req,res)=>{
    let   productId = req.params.productId;
    // console.log(req.user)
    let userId = req.user.id;
    let reviewsObj = await getAllReviewsOfOneProduct(
        productId,
        userId
    );
    res.send(reviewsObj)
})

router.post('/', async(req,res)=>{
     let result = await addReview(req);
    // res.send(result);
   return  res.status(201).json(result);
})


module.exports =router;
