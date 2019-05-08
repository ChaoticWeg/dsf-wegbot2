import Contents from "./Contents";
import { EchoCommand, EchoCommandFootprint } from "./EchoCommand";

function commandFromFootprint(fp: EchoCommandFootprint): EchoCommand {
    return new EchoCommand(fp);
}

const commands: EchoCommand[] = Contents.map(commandFromFootprint);
export default commands;
