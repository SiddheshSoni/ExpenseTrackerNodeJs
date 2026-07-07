const Payment = require("../models/Payment");
const { createOrder, fetchOrder } = require("../services/cashFree");

const processPayments =  async(req, res) =>{
    
    const orderId = "ORDER_" + Date.now();
    const OrderAmount=2000;
    const orderCurrency="INR";
    const customerId = "1";
    const customerPhone="9999999999";

    console.log({
    orderId,
    OrderAmount,
    orderCurrency,
    customerId,
    customerPhone,
    });
    try{
        const paymentSessionId = await createOrder(
            orderId,
            OrderAmount,
            orderCurrency,
            customerId,
            customerPhone
        );

        await Payment.create({
            orderId,
            paymentSessionId,
            orderCurrency,
            paymentStatus:"pending"
        });
        console.log("Payment Session:", paymentSessionId);

        res.json({paymentSessionId, orderId});
    }catch(error){
        console.log(error);
        res.json({error});
    }
};

const getPaymentStatus = async (req, res) => {
    try {
        const { orderId } = req.params;

       const order = await fetchOrder(orderId);
        
        await Payment.update(
            {
                paymentStatus: order.order_status,
            },
            {
                where: {
                    orderId,
                },
            }
        );

        res.status(200).json({
            success: true,
            orderId: order.order_id,
            status: order.order_status,
            amount: order.order_amount,
            paymentDetails: order,
        });

    } catch (err) {
        console.error(err);

        res.status(500).json({
            success: false,
            message: "Unable to fetch payment status.",
            error: err.message,
        });
    }
};
module.exports = {
    processPayments,
    getPaymentStatus,
}