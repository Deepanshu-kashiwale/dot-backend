const Service = require("node-windows").Service;

const svc = new Service({
    name: "DotPortalSync",
    //name: "dotportalsync",
    script: "C:\\dotportalsync\\server.js"	
});

svc.on("uninstall", function () {
        console.log("Service removed");
});

svc.uninstall();