
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const CustomerLot = require("./models/customerLot");
const syncMerged = require("./services/syncMerged");
const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", authRoutes);
app.use("/api",dashboardRoutes);
const PORT = process.env.PORT || 4000;

/*
|--------------------------------------------------------------------------
| Test Route
|--------------------------------------------------------------------------
*/

app.get("/", (req, res) => {
    res.send("DBF Sync API Running");
});
///sync api

app.post("/api/sync", async (req, res) => {

    try {
        await syncMerged();

        res.json({
            success:true,
            message:"Sync completed"
        });
    } catch (err) {

        res.status(500).json({
            success:false,
            error: err.message
        });
    }
});
/*
|--------------------------------------------------------------------------
| Check Mongo Data
|--------------------------------------------------------------------------
*/

app.get("/check", async (req, res) => {
    try {

        const data = await CustomerLot.find().limit(5);

        res.json(data);

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }
});

/*
|--------------------------------------------------------------------------
| Login
|--------------------------------------------------------------------------
*/

app.post("/api/login", async (req, res) => {

    try {

        const { p_code } = req.body;

        const customer = await CustomerLot.findOne({
            p_code: p_code.trim()
        });

        if (!customer) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        res.json({
            success: true,
            customer: {
                p_code: customer.p_code,
                p_name: customer.p_name,
                due_days: customer.due_days
            }
        });

    } catch (err) {

        res.status(500).json({
            error: err.message
        });

    }

});

/*
|--------------------------------------------------------------------------
| MongoDB Connection
|--------------------------------------------------------------------------
*/

console.log("Server Started");
console.log("MONGO URI:", process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI)
.then(async () => {

    console.log("MongoDB Atlas Connected");

    console.log("Running Initial Sync...");

    await syncMerged();

    console.log("Initial Sync Complete");

    require("./watcher");

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });

})
.catch(err => {

    console.error("MongoDB Error:", err);

});