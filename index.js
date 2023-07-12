const {ethToAreon, areonToEth} = require("./converter");

const toHex = ethToAreon("0x123456f6Ed06F81eb1Edc6fccE34414E2C21fE5c");
console.log(toHex);
// areon1zg69dahdqmupav0dcm7vudzpfckzrljum4nsgt

const fromHex = areonToEth("areon1zg69dahdqmupav0dcm7vudzpfckzrljum4nsgt");
console.log(fromHex);
// 0x123456f6Ed06F81eb1Edc6fccE34414E2C21fE5c
