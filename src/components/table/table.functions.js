import {resizeHandler} from "@/components/table/table.resize";

export function shouldResize(event) {
    return event.target.dataset.resize
}