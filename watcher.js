// const chokidar = require("chokidar");
// const syncMerged = require("./services/syncMerged");

// console.log("Watcher Started");

// chokidar.watch([
//   "C:\\Users\\admin\\Desktop\\ATHARBV\\master.dbf",
//   "C:\\Users\\admin\\Desktop\\ATHARBV\\takareci.dbf"
// ])
// .on("change", async (path) => {

//   console.log(
//     `${path} changed`
//   );

//   try {
//     console.log("before sync merged");
//     await syncMerged();
//     console.log("after sync merged");

//   } catch (err) {

//     console.error(err);

//   }

// });