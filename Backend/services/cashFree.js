const { Cashfree, CFEnvironment } = require("cashfree-pg");

const cashfree = new Cashfree(
    CFEnvironment.SANDBOX,
    "TEST430329ae80e0f32e41a393d78b923034",
    "TESTaf195616268bd6202eeb3bf8dc458956e7192a85"
);

const createOrder = async (
    orderId,
    orderAmount,
    orderCurrency = "INR",
    customerId,
    customerPhone
) => {
    try {
        const expiry = new Date(Date.now() + (60 * 60 * 1000));

        const request = {
            order_amount: orderAmount,
            order_currency: orderCurrency,
            order_id: orderId,

            customer_details: {
                customer_id: customerId,
                customer_phone: customerPhone,
            },

            order_meta: {
                return_url: `http://localhost:3000/pay/payment-status/${orderId}`,
                
                payment_methods: "cc,dc,upi",
            },

            order_expiry_time: expiry.toISOString(),
        };
        console.log("Request"+ request);

        const response = await cashfree.PGCreateOrder(request);
        console.log("Cashfree Response:", response.data);
        return response.data.payment_session_id;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

const fetchOrder = async (orderId) => {
    try {
        const response = await cashfree.PGFetchOrder(orderId);
        const paymentStatus = response.data.order_status;
        
        return response.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

module.exports = {
    createOrder,
    fetchOrder,
};