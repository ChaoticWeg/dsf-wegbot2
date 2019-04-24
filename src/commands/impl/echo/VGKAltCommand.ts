import { EchoCommand, EchoCommandProps } from "./EchoCommand";

const props: EchoCommandProps = {
    name: "vgk2"
};

export class VGKAltCommand extends EchoCommand {
    public constructor() {
        super(props);
    }
}
