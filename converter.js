const bech32 = require("bech32");
const addrCodec = require("crypto-addr-codec");

const checksummedHexDecoder = (chainId = null) => {
    return (data) => {
        const stripped = addrCodec.stripHexPrefix(data);
        if (!addrCodec.isValidChecksumAddress(data, chainId) &&
            stripped !== stripped.toLowerCase() &&
            stripped !== stripped.toUpperCase()) {
            throw new Error(`Invalid address checksum for chainId: ${chainId}`);
        }
        return Buffer.from(stripped, 'hex');
    };
}

const checksummedHexEncoder = (chainId = null) => {
    return (data) => addrCodec.toChecksumAddress(data.toString('hex'), chainId);
}

const bech32Encoder = (prefix) => {
    return (data) => bech32.bech32.encode(prefix, bech32.bech32.toWords(data));
}

const makeBech32Decoder = (expectedPrefix) => {
    return (data) => {
        const { prefix, words } = bech32.bech32.decode(data);
        if (prefix !== expectedPrefix) {
            throw new Error(`Unrecognized address format. Expected prefix: ${expectedPrefix}, got: ${prefix}`);
        }
        return Buffer.from(bech32.bech32.fromWords(words));
    };
}

// Chain definitions
const ETH = {
    decoder: checksummedHexDecoder(),
    encoder: checksummedHexEncoder(),
};

const AREON = {
    decoder: makeBech32Decoder('areon'),
    encoder: bech32Encoder('areon'),
};

const AREONVAL = {
    decoder: makeBech32Decoder('areonvaloper'),
    encoder: bech32Encoder('areonvaloper'),
};

const ethToAreon = (ethAddress) => {
    const data = ETH.decoder(ethAddress);
    return AREON.encoder(data);
};

const ethToValidator = (ethAddress) => {
    const data = ETH.decoder(ethAddress);
    return AREONVAL.encoder(data);
};

const areonToEth = (areonAddress) => {
    const data = AREON.decoder(areonAddress);
    return ETH.encoder(data);
};

const areonToValidator = (areonAddress) => {
    const data = AREON.decoder(areonAddress);
    return AREONVAL.encoder(data);
};

const validatorToAreon = (areonValAddress) => {
    const data = AREONVAL.decoder(areonValAddress);
    return AREON.encoder(data);
};

const validatorToEth = (areonValAddress) => {
    const data = AREONVAL.decoder(areonValAddress);
    return ETH.encoder(data);
};

module.exports = { ethToAreon, ethToValidator, areonToEth, areonToValidator, validatorToAreon, validatorToEth };