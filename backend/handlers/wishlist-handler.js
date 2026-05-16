const wishlist = require('./../db/wishlist')




async function addToWishlist(userId,productId){
    const wishList = new wishlist({
        userId: userId,
        productId: productId,
    })
    await wishList.save();
    return wishList.toObject();
}

async function removeFromWishlist(userId,productId){
     await wishlist.deleteMany({
        userId:userId,
        productId:productId,
     })
}

async function getWishlistByUserid(userId){
    let allWishList= await wishlist.find({userId:userId}).populate('productId');
     return allWishList.map((x=>x.toObject().productId))
}

module.exports = {addToWishlist,removeFromWishlist,getWishlistByUserid}