import { Message } from "discord.js";
import { WegbotCommand } from "../WegbotCommand";
import { WegbotCommandResult } from "../WegbotCommandResult";

// tslint:disable-next-line:max-line-length
const clapTxt: string = "Yeah :thumbsup: fuck off buddy :rage: :triumph: :triumph: we absolutely :clap: need :clap: more :clap: Laine :clap: clips :clap: Fuckin every time :alarm_clock: :clock: :timer: this kid :baby: steps on the ice :ice_skate: :hockey: someone scores :heart_eyes: kids fuckin dirt :nauseated_face: nasty :poop: man. Does fuckin :eagle: ovi :flag_ru: have 14 goals this season I dont :x: fuckin :x: think so bud. I'm fuckin tellin ya Patrik \"golden :money_mouth: flow\" Laine is pottin :five: :zero: in '17 :calendar: fuckin callin :telephone: :telephone: it right now. Clap bombs :bomb: fuck :point_right: :ok_hand: moms :woman: wheel :wheelchair: snipe :gun: and fuckin celly :selfie: boys fuck :postal_horn: :postal_horn: :postal_horn: :loudspeaker: :loudspeaker: :loudspeaker:";

export class ClapCommand extends WegbotCommand {
    public constructor() {
        super("clap");
    }

    protected async execute(context: Message): Promise<WegbotCommandResult> {
        return new Promise<WegbotCommandResult>(
            async (resolve: (r: WegbotCommandResult) => void, reject: (r: WegbotCommandResult) => void) => {
                const command: WegbotCommand = this;
                const trigger: Message = context;

                let success: boolean = true;
                let error: Error | undefined = void 0;
                let reason: string | undefined = void 0;

                await context.channel.send(clapTxt).catch((e) => {
                    error = e;
                    success = false;
                    reason = "unable to send";
                    return e;
                });

                const fn: (r: WegbotCommandResult) => void = success ? resolve : reject;
                return fn({ command, error, reason, success, trigger });
            }
        );
    }
}
