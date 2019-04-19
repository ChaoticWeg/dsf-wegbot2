import { EchoCommand, EchoCommandProps } from "./EchoCommand";

const props: EchoCommandProps = {
    name: "clap"
};

export class ClapCommand extends EchoCommand {
    public constructor() {
        super(props);
    }
}
