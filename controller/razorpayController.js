const Razorpay = require("razorpay");
const dotenv = require("dotenv");

var instance = new Razorpay({
    key_id: 'rzp_test_HIutxLK5l2txq5',
    key_secret: 'FeIo6JvERMXbmRJBH3pmVLj4',
});


const getPayments = async (req, res) => {
    try {
        const pl = await instance.paymentLink.fetch("plink_O0pVFytiIVxVX6")
        res.send(pl);
    } catch (error) {
        res.status(400).send(error);
    }
}


dotenv.config();

module.exports = {
    getPayments
}