import { Current } from "@/map/document";
import { LayerType } from "@/map/layer";

export function isEnable(current: Current, supports: LayerType[]) {
    for (const support of supports) {
        if (!current) {
            return false;
        }
        if (support === current.type) {
            return true;
        }
    }
    return false;
}
