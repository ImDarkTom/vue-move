import mitt, { Emitter } from "mitt";
import { App, ObjectPlugin } from "vue";
import { moverTarget } from "./directives/moverTarget";
import { mover } from './directives/mover';

export interface MoveDirectivesPluginOptions {
    customEmitter?: Emitter<Record<string, unknown>>,
    moverNameOverride?: string,
    moverTargetNameOverride?: string,
};

export const MoveDirectivesPlugin: ObjectPlugin<MoveDirectivesPluginOptions | []> = {
    install(app: App, options?: MoveDirectivesPluginOptions) {
        const emitter = options?.customEmitter || mitt();

        app.directive(options?.moverNameOverride || 'mover', mover(emitter));
        app.directive(options?.moverTargetNameOverride || 'mover-target', moverTarget(emitter));
    },
};