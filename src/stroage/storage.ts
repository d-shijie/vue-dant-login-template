import storage from "store";
import { TOKEN } from "./stroage_types";
export const token = storage.get(TOKEN);
