import { Credentials } from '../src/creds';

// reset process.env after each test
const previousEnv = Object.assign({}, process.env);
afterEach(() => { process.env = previousEnv; });

// create new credentials object for each test
let testCreds : Credentials;
beforeEach(() => { testCreds = new Credentials(); });

test('properly reads from .env and type-checks', () => {
    // ensure token is read properly from env
    let testToken = testCreds.getString('DISCORD_TOKEN');
    expect(testToken).not.toBeNull();
    expect(typeof testToken).toStrictEqual("string");
    expect(testToken).toStrictEqual(String(process.env.DISCORD_TOKEN));

    // ensure channel id is read properly from env
    let testChannelId = testCreds.getNumber('DISCORD_TEST_CHANNEL_ID');
    expect(testChannelId).not.toBeNull();
    expect(typeof testChannelId).toStrictEqual("number");
    expect(testChannelId).toStrictEqual(Number(process.env.DISCORD_TEST_CHANNEL_ID));
});

test('properly returns null for missing keys', () => {
    expect(testCreds.getString('bogusKeyShouldBeNull')).toBeNull();
    expect(testCreds.getNumber('bogusKeyShouldBeNull')).toBeNull();
});
