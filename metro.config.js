// works with older react native versions
// const blacklist = require('metro').createBlacklist;

//const blacklist = require("metro-config/src/defaults/exclusionList")
const { getDefaultConfig } = require('expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

defaultConfig.resolver.assetExts.push('db');
defaultConfig.resolver.blockList = [/amplify\/#current-cloud-backend\/.*/];

module.exports = defaultConfig;

