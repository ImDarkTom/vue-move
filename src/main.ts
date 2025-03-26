import { Emitter } from "mitt";
import { App } from "vue";
import { moveTarget } from "./directives/moveTarget";
import { moveTo } from "./directives/moveTo";

export function setupDirectives(
    app: App, 
    emitter: Emitter<any>,
    options?: {
        moveNameOverride?: string,
        moveToNameOverride?: string,
    }
) {
    app.directive(options?.moveNameOverride || 'move-to', moveTo(emitter));
    app.directive(options?.moveToNameOverride || 'move-target', moveTarget(emitter));
}