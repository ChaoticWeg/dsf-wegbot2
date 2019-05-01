import { EchoCommand, EchoCommandProps } from "./EchoCommand";

const props: EchoCommandProps = {
    name: "preds"
};

export class PredsCommand extends EchoCommand {
    public constructor() {
        super(props);
    }
}
