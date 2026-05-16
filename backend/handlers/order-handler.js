const orderModel = require("./../db/order");




async function addOrder(userId, newOrder) {
    let order = new orderModel({
        ...newOrder,
        userId:userId,
        status:"inprogress",
    })
    await order.save();
    return order.toObject();
   
}

async function getcustomerOrders(userId){
    let orders = await orderModel.find({userId: userId});
    return orders.map((x)=>x.toObject());
}

async function getOrders(){
    let orders = await orderModel.find();
    return orders.map((x)=>x.toObject());
}

async function updateOrderStatus(id,status){
   await orderModel.findByIdAndUpdate(id,{
    status:status,
   }
   )
}


module.exports = {addOrder,getcustomerOrders,getOrders, updateOrderStatus }