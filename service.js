const Service = require("node-windows").Service;

const svc = new Service({
  name: "DotPortalSync",
  description: "DBF Sync Agent",
  script: "D:\\DOT\\dot-backend\\server.js"
});

svc.on("install", function () {
  svc.start();
});

svc.install();