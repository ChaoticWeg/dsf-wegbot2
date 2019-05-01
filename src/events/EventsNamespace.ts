import { EventHandler } from "./index";

export interface IEventsNamespace {
    asList(): EventHandler[];
}
