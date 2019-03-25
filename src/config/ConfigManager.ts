import * as fs from "fs";
import { WegbotConfig } from "../models";

export class ConfigManager {
    public static readonly filename: string = "wegbot.json";
    public static readonly fileConfig: any = { encoding: "utf-8" };

    public static load(filepath: string = this.filename): Promise<WegbotConfig> {
        return new Promise<WegbotConfig>(
            (resolve: (c: WegbotConfig) => void, reject: (e: Error) => void) => {
                fs.readFile(filepath, this.fileConfig, (err: NodeJS.ErrnoException, data: string) => {
                    if (err) { return reject(err); }

                    // successful read
                    return resolve(JSON.parse(data) as WegbotConfig);
                });
            }
        );
    }

    public static save(config: WegbotConfig, filepath: string = this.filename): Promise<void> {
        return new Promise<void>((resolve: () => void, reject: (e: NodeJS.ErrnoException) => void) => {
            const outData: string = JSON.stringify(config);

            fs.writeFile(filepath, outData, this.fileConfig,
                (e: NodeJS.ErrnoException) => e ? reject(e) : resolve());
        });
    }

}
