const connection = require('./src/config/config');
const actions = require("./src/lib/actionFunctions");

const init = async () => {
    console.log('-=[Employee Tracker]=-');
    try {
        await actions.start();
    } catch (err) {
        console.log(err);
    }
}
connection.connect((err) => {
    if (err) throw err;
    init();
});