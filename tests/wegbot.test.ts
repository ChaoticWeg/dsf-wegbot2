import { Wegbot } from '../src/wegbot';

// instance
const _wegbot = new Wegbot();

test('creates the instance', () => {
    expect(_wegbot.discord).not.toBeNull();
    expect(_wegbot.discord).not.toBeUndefined();
    expect(_wegbot.discord).not.toBeFalsy();
});

test('properly reads and type-checks the token', () => {
    expect(_wegbot.token).not.toBeUndefined();
    expect(_wegbot.token).toStrictEqual(String(process.env.DISCORD_TOKEN));
});

test('properly reads and type-checks the test channel id', () => {
    expect(_wegbot.testChannelId).not.toBeUndefined();
    expect(_wegbot.testChannelId).toStrictEqual(Number(process.env.DISCORD_TEST_CHANNEL_ID));
});

test('logs in and out successfully', async () => {
    expect.assertions(8); // necessary since function is async

    let loginPromise : Promise<string> = _wegbot.start();

    expect(loginPromise).not.toBeFalsy();
    expect(loginPromise).toHaveProperty("then");
    expect(typeof loginPromise.then).toEqual("function");

    let token : string = await loginPromise;

    expect(token).not.toBeFalsy();
    expect(token).toEqual(_wegbot.token);

    let logoutPromise : Promise<any> = _wegbot.logout();

    expect(logoutPromise).not.toBeFalsy();
    expect(logoutPromise).toHaveProperty("then");
    expect(typeof logoutPromise.then).toEqual("function");
});
