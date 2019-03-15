import Wegbot from './lib';
import { EventRegistry } from "./lib/events";

EventRegistry.instance.applyAll(Wegbot.instance);
Wegbot.start();
