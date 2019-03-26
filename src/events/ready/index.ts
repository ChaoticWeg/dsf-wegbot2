import { WegbotEventHandler } from "../EventHandler";

export class ReadyEventHandler extends WegbotEventHandler<void> {

    public constructor() {
        super("ready");
    }

    public onTriggered(context: void): Promise<void> {
        return new Promise<void>((resolve: () => void) => {
            console.log("bot is ready");
            resolve();
        });
    }

}
