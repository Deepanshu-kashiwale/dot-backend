const CustomerLot = require("../models/customerLot");

const loginuser = async (req, res) => {

    try {

        const { p_code } = req.body;

        if (!p_code) {
            return res.status(400).json({
                success: false,
                message: "P Code is required"
            });
        }

        const customer = await CustomerLot.findOne({
            p_code: p_code.trim()
        });

        if (!customer) {
            return res.status(401).json({
                success: false,
                message: "Invalid P Code"
            });
        }

        res.json({
            success: true,
            message: "Login successful",
            customer: {
                p_code: customer.p_code,
                p_name: customer.p_name
            }
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

module.exports = { loginuser };