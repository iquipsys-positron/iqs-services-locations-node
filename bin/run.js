let LocationsProcess = require('../obj/src/container/LocationsProcess').LocationsProcess;

try {
    new LocationsProcess().run(process.argv);
} catch (ex) {
    console.error(ex);
}
