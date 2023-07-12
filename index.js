const {ethToAreon, areonToEth, validatorToEth} = require("./converter");

const toHex = ethToAreon("0x123456f6Ed06F81eb1Edc6fccE34414E2C21fE5c");
console.log(toHex);
// areon1zg69dahdqmupav0dcm7vudzpfckzrljum4nsgt

const fromHex = areonToEth("areon1zg69dahdqmupav0dcm7vudzpfckzrljum4nsgt");
console.log(fromHex);
// 0x123456f6Ed06F81eb1Edc6fccE34414E2C21fE5c

const validatorToHex = validatorToEth("areonvaloper1k6ews5uuxh9x3r4q663h2pdqatc9lxstm8w9c3");
console.log(validatorToHex);
// 0xb6B2E8539C35CA688Ea0D6a37505A0EAf05f9A0B
