import { EchoCommand, EchoCommandProps } from "./EchoCommand";

const props: EchoCommandProps = {
    name: "canes"
};

export class CanesCommand extends EchoCommand {
    public constructor() {
        super(props);
    }
}
