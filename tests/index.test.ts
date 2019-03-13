import Wegbot from '../lib/index';

test('creates the instance', () => {
    expect(Wegbot.instance).not.toBeNull();
    expect(Wegbot.instance).not.toBeUndefined();
    expect(Wegbot.instance).not.toBeFalsy();
});
