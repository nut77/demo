console.log(123);

let msg = 'welcome require test module';
let printMsg = function (msg) {

    console.log(msg);
};
module.exports = {
    msg,
    printMsg
};