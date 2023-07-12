const bech32 = require("bech32");
const addrCodec = require("crypto-addr-codec");

const checksummedHexDecoder = (chainId) => {
    return (data) => {
        const stripped = (0, addrCodec.stripHexPrefix)(data);
        if (!(0, addrCodec.isValidChecksumAddress)(data, chainId || null) &&
            stripped !== stripped.toLowerCase() &&
            stripped !== stripped.toUpperCase()) {
            throw Error('Invalid address checksum');
        }
        return Buffer.from((0, addrCodec.stripHexPrefix)(data), 'hex');
    };
}
const checksummedHexEncoder = (chainId) => {
    return (data) => (0, addrCodec.toChecksumAddress)(data.toString('hex'), chainId || null);
}

const bech32Encoder = (prefix) => {
    return (data) => bech32.bech32.encode(prefix, bech32.bech32.toWords(data));
}

const makeBech32Decoder = (currentPrefix) => {
    return (data) => {
        const { prefix, words } = bech32.bech32.decode(data);
        if (prefix !== currentPrefix) {
            throw Error('Unrecognised address format');
        }
        return Buffer.from(bech32.bech32.fromWords(words));
    };
}

const hexChecksumChain = (name, chainId) => ({
    decoder: checksummedHexDecoder(chainId),
    encoder: checksummedHexEncoder(chainId),
    name,
});

const bech32Chain = (name, prefix) => ({
    decoder: makeBech32Decoder(prefix),
    encoder: bech32Encoder(prefix),
    name,
});

const ETH = hexChecksumChain('ETH');
const AREON = bech32Chain('AREON', 'areon');

exports.ethToAreon = (ethAddress) => {
    const data = ETH.decoder(ethAddress);
    return AREON.encoder(data);
};

exports.areonToEth = (areonAddress) => {
    const data = AREON.decoder(areonAddress);
    return ETH.encoder(data);
};
