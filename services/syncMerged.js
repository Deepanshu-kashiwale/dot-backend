
const { DBFFile } = require("dbffile");
const CustomerLot = require("../models/CustomerLot");

async function syncMerged() {

    console.log("SYNC STARTED");
    console.time("SYNC");

    // const masterDBF = await DBFFile.open(
    //     "C:\\Users\\admin\\Desktop\\ATHARBV\\master.dbf"
    // );
    const masterDBF =await DBFFile.open(
        "D:\\DOT\\dot-backend\\master.dbf"
    )

    const takareciDBF = await DBFFile.open(
        "D:\\DOT\\dot-backend\\takareci.dbf"
    );
    console.time("READ_DBF");
    const masterRecords = await masterDBF.readRecords();
    const takareciRecords = await takareciDBF.readRecords();
    console.timeEnd("READ_DBF");

    const map = {};
    console.time("MONGO");
    for (const row of masterRecords) {

        map[row.P_CODE] = {

            p_code: row.P_CODE,
            p_name: row.P_NAME,
            mobile: String(row.MOBILE).trim(),
            due_days: row.DUE_DAYS,
            lots: []

        };
    }

    for (const row of takareciRecords) {

        if (!map[row.P_CODE]) continue;

        map[row.P_CODE].lots.push({

            lot_no: row.LOT_NO,
            date: row.DATE,
            lot_pack: row.LOTPACK

        });
    }

    const docs = Object.values(map);
    console.timeEnd("MONGO");
    const activeCodes = [];
    //slow
    for (const doc of docs) {

        activeCodes.push(doc.p_code);

        await CustomerLot.updateOne(
            { p_code: doc.p_code },
            { $set: doc },
            { upsert: true }
        );
    }

    await CustomerLot.deleteMany({
        p_code: {
            $nin: activeCodes
        }
    });
    console.timeEnd("SYNC");
    console.log(`SYNC COMPLETE : ${docs.length}`);
}

module.exports = syncMerged;