const CustomerLot = require("../models/CustomerLot");

const getDashboard = async (req, res) => {

    try {

        const { p_code } = req.params;

        const customer = await CustomerLot.findOne({
            p_code: p_code.trim()
        });

        if (!customer) {

            return res.status(404).json({
                success: false,
                message: "Customer not found"
            });

        }

        const packedLots = customer.lots
            .filter(lot => lot.lot_pack === "Y")
            .sort((a, b) =>
                new Date(b.date) - new Date(a.date)
            );

        const pendingLots = customer.lots
            .filter(lot => lot.lot_pack === "N");
        
        const allPendingLots = customer.lots
            .filter(lot => lot.lot_pack === "N")
            .sort((a, b) =>
                new Date(b.date) - new Date(a.date)
            );

        const recentPackedLots =
            packedLots.slice(0, 5);

        res.json({

            success: true,

            customer: {
                p_code: customer.p_code,
                p_name: customer.p_name,
                due_days: customer.due_days
            },

            packed_count: packedLots.length,

            pending_count: pendingLots.length,

            recent_packed_lots: recentPackedLots,
            
            all_pending_lots: allPendingLots,

            pending_lots: pendingLots

        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

module.exports = {
    getDashboard
};