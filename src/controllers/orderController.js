const orderModel = require("../models/orderModel")
const cartModel = require("../models/cartModel")
const { isValidObjectId } = require("mongoose")




const createOrder = async (req, res) => {

    try {
        let data = req.body
        
        let userId = req.userByUserId._id
        data.userId = userId

        let {cancellable, status} = data

        let cart = await cartModel.findOne({ userId: userId })
        if(!cart){ return res.status(400).send({ status: false, message: "No cart exits for this user !" }) }
        if(cart.items.length==0) { return res.status(400).send({ status: false, message: "Your card is empty !" }) }
       
        data.items = cart.items
        data.totalPrice = cart.totalPrice
        data.totalItems = cart.totalItems
        let totalQuantity = 0
        data.items.forEach(x => {
            totalQuantity += x.quantity;
        })
        data.totalQuantity = totalQuantity;
       
        if(cancellable || cancellable==false){
            if(typeof(cancellable)!="boolean"){ return res.status(400).send({ status: false, message: "Please enter valid cancellable value (true/false) !" }) }
            data.cancellable = cancellable
        }else{
            data.cancellable = true
        }

        data.status = "pending"
        
        let result = await orderModel.create(data)
      
        let updatedData = { userId: userId, items: [], totalPrice: 0, totalItems: 0 }
        await cartModel.updateOne({ userId: userId}, updatedData )

        res.status(201).send({ status: true, message: "Success", data: result })

    } catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}



const updateOrder = async (req, res) => {
    try {
        let userId = req.userByUserId._id;
        
        let orderId = req.body.orderId;
        if(!orderId){ return res.status(400).send({ status: false, message: "OrderId is mendatory !" }) }
        if(!isValidObjectId(orderId)){ return res.status(400).send({ status: false, message: "Enter a valid OrderId  !" })}

        let order = await orderModel.findOne({ _id: orderId })
        if (!order) { return res.status(404).send({ status: false, message: "No such Order found !" }) }
        if (!order.cancellable) { return res.status(400).send({ status: false, message: "Your Order is not Cancellable !" }) }
       
        if(order.status == "cancled"){ return res.status(400).send({ status: false, message: "Your order already cancelled" }); }
        if(order.status == "completed"){ return res.status(400).send({ status: false, message: "Your order already completed" }); }
        
        let status = req.body.status;
        if(!status){ return res.status(400).send({ status: false, message: "Status is mendatory !" }) }

        let enums = ["cancled","completed"]
        if(!enums.includes(status)) { return res.status(400).send({ status: false, message: "Please enter valid status [cancled, completed] !" }) }

        let result = await orderModel.findOneAndUpdate({ userId: userId }, { $set: { status: status } }, { new: true })
        res.status(200).send({ status: true, message: "Success", data: result })

    } catch (err) {
        res.send({ status: false, message: err.message })
    }

}


module.exports = { createOrder, updateOrder }

