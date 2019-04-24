import { EchoCommand, EchoCommandProps } from "./EchoCommand";

const props: EchoCommandProps = {
    name: "vgk"
};

export class VGKCommand extends EchoCommand {
    public constructor() {
        super(props);
    }
}
