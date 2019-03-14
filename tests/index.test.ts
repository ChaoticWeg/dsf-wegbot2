import Wegbot from '../src/index';

// reset process.env after each test
const previousEnv = Object.assign({}, process.env);
afterEach(() => { process.env = previousEnv; });

test('creates the instance', () => {
    expect(Wegbot.instance).not.toBeNull();
    expect(Wegbot.instance).not.toBeUndefined();
    expect(Wegbot.instance).not.toBeFalsy();
});

test('properly reads and type-checks the token', () => {
    expect(Wegbot.token).not.toBeUndefined();
    expect(Wegbot.token).toStrictEqual(String(process.env.DISCORD_TOKEN));
});

test('properly reads and type-checks the test channel id', () => {
    expect(Wegbot.testChannelId).not.toBeUndefined();
    expect(Wegbot.testChannelId).toStrictEqual(Number(process.env.DISCORD_TEST_CHANNEL_ID));
});

test('logs in and out successfully', async () => {
    expect.assertions(8); // necessary since function is async

    let loginPromise : Promise<string> = Wegbot.start();

    expect(loginPromise).not.toBeFalsy();
    expect(loginPromise).toHaveProperty("then");
    expect(typeof loginPromise.then).toEqual("function");

    let token : string = await loginPromise;

    expect(token).not.toBeFalsy();
    expect(token).toEqual(Wegbot.token);

    let logoutPromise : Promise<any> = Wegbot.logout();

    expect(logoutPromise).not.toBeFalsy();
    expect(logoutPromise).toHaveProperty("then");
    expect(typeof logoutPromise.then).toEqual("function");
});
