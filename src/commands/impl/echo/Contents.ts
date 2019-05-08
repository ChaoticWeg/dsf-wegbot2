import { readFileSync } from "fs";
import G from "glob";
import path from "path";
import { EchoCommandFootprint } from "./EchoCommand";

function readFile(filepath: string): EchoCommandFootprint {
    const name: string = path.basename(filepath, path.extname(filepath));
    return {
        name,
        contents: readFileSync(path.resolve(filepath), "utf-8")
    };
}

function read(globStr: string): EchoCommandFootprint[] {
    return G.sync(globStr).map(readFile);
}

const contentsGlob: string = path.resolve(__dirname, "contents", "*.txt");
const contents = read(contentsGlob);
export default contents;
