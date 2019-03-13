import Wegbot from '../src/index';

test('creates the instance', () => {
    expect(Wegbot.instance).not.toBeNull();
    expect(Wegbot.instance).not.toBeUndefined();
    expect(Wegbot.instance).not.toBeFalsy();
});

test('logs in and out successfully', async () => {
    expect.assertions(8);

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
