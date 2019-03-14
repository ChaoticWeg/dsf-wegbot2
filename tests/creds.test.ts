import { Credentials } from '../src/creds';

const testCreds = new Credentials('../creds.json');
let fileCreds : any;

const env = Object.assign({}, process.env);

beforeEach(() => {
    fileCreds = require('../creds.json');
});

test('properly reads and type-checks creds from file', () => {
    // read token from file
    let fileToken : string = String(fileCreds.discordToken);
    expect(fileToken).not.toBeUndefined();
    expect(fileToken).not.toEqual("undefined");
    expect(typeof fileToken).toStrictEqual("string");

    // read channel id from file
    let fileChannelId : number = Number(fileCreds.discordTestChannelId);
    expect(fileChannelId).not.toBeNaN();
    expect(fileChannelId).not.toBeFalsy();

    // ensure token from creds is correct
    let testToken = testCreds.getString('discordToken');
    expect(testToken).not.toBeNull();
    expect(typeof testToken).toStrictEqual("string");
    expect(testToken).toStrictEqual(fileToken);

    // ensure channel id from creds is correct
    let testChannelId = testCreds.getNumber('discordTestChannelId');
    expect(testChannelId).not.toBeNull();
    expect(typeof testChannelId).toStrictEqual("number");
    expect(testChannelId).toStrictEqual(fileChannelId);
});

test('properly reads and type-checks creds from process.env', () => {
    // load token from file into env under different name
    process.env.discordTokenFromEnv = String(fileCreds.discordToken);
    expect(process.env.discordTokenFromEnv).not.toStrictEqual('undefined');

    // load channel id from file into env under different name
    process.env.channelIdFromEnv = String(fileCreds.discordTestChannelId);
    expect(process.env.channelIdFromEnv).not.toStrictEqual('undefined');

    // ensure token is read properly from env
    let testToken = testCreds.getString('discordTokenFromEnv');
    expect(testToken).not.toBeNull();
    expect(typeof testToken).toStrictEqual("string");
    expect(testToken).toStrictEqual(process.env.discordTokenFromEnv);

    // ensure channel id is read properly from env
    let testChannelId = testCreds.getNumber('channelIdFromEnv');
    expect(testChannelId).not.toBeNull();
    expect(typeof testChannelId).toStrictEqual("number");
    expect(testChannelId).toStrictEqual(Number(process.env.channelIdFromEnv));
});

test('properly returns null for missing keys', () => {
    expect(testCreds.getString('bogusKeyShouldBeNull')).toBeNull();
    expect(testCreds.getNumber('bogusKeyShouldBeNull')).toBeNull();
});

test('properly throws if creds filepath is invalid', () => {
    try {
        expect(() => { return new Credentials('bogus.json'); }).toThrowError();
    } catch (e) {
        expect(e).not.toBeUndefined();
        expect(e.message).not.toBeUndefined();
    }
});

afterEach(() => {
    process.env = env;
});
