const stripe = require("stripe")("sk_test_51P7FcvClJ4SpjkvvUKTULQB5jqfUsZclZux9nvoPGzikAJNcy7qQrGUJDPOSly1yXOYA56ACGbxJFCN4QcaqHKwO00VfSfSCli");

exports.createCheckoutSession = async (req, res) => {
    const { amount } = req.body;

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
            {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: "Subscription Plan",
                    },
                    unit_amount: amount,
                },
                quantity: 1,
            },
        ],
        mode: "payment",
        success_url: "http://localhost:3000/home",
        cancel_url: "http://localhost:3000/primium",
    });

    res.json({ id: session.id });
}