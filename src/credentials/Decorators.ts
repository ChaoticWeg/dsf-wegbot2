/**
 * Declare a property as an environment value, and change the getter and setter to
 * instead use process.env
 *
 * @param envKey The environment variable name
 * @constructor
 *
 * @author ChaoticWeg <shawn@chaoticweg.cc>
 */
export function EnvironmentValue(envKey: string): any {
    return () => ({
        get: () => process.env[envKey] || "missing",
        set: (val: string) => {
            process.env[envKey] = val;
        }
    });
}
