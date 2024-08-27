const { ethToAreon, ethToValidator, areonToEth, areonToValidator, validatorToAreon, validatorToEth } = require("./converter");

console.log(ethToAreon("0x123456f6Ed06F81eb1Edc6fccE34414E2C21fE5c"))
// areon1zg69dahdqmupav0dcm7vudzpfckzrljum4nsgt

console.log(ethToValidator("0x123456f6Ed06F81eb1Edc6fccE34414E2C21fE5c"))
// areonvaloper1zg69dahdqmupav0dcm7vudzpfckzrljulvgtt6

console.log(areonToEth("areon1zg69dahdqmupav0dcm7vudzpfckzrljum4nsgt"))
// 0x123456f6Ed06F81eb1Edc6fccE34414E2C21fE5c

console.log(areonToValidator("areon1zg69dahdqmupav0dcm7vudzpfckzrljum4nsgt"))
// areonvaloper1zg69dahdqmupav0dcm7vudzpfckzrljulvgtt6

console.log(validatorToAreon("areonvaloper1zg69dahdqmupav0dcm7vudzpfckzrljulvgtt6"))
// areon1zg69dahdqmupav0dcm7vudzpfckzrljum4nsgt

console.log(validatorToEth("areonvaloper1zg69dahdqmupav0dcm7vudzpfckzrljulvgtt6"))
// 0x123456f6Ed06F81eb1Edc6fccE34414E2C21fE5c