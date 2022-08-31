import { UniName } from "./name.model";
import { UniValue } from "./value.model";

export interface UniNameValue<T = string, V = unknown> extends UniName<T>, UniValue<V> {}
