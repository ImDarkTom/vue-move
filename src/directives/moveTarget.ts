import { Emitter } from "mitt";
import { Directive } from "vue";

export const moveTarget = (emitter: Emitter<any>) => <Directive<
    HTMLElement & { _cleanup?: () => void },
    string
>>{
    mounted(el, binding) {
        const moveListener = (event: { elementId: string, targetId: string } ) => {
            if (event.targetId !== binding.value) return;

            const position = el.getBoundingClientRect();
    
            emitter.emit('moveElementCallback', {
                elementId: event.elementId,
                x: position.x,
                y: position.y,
            });
        }

        emitter.on('moveElement', moveListener);

        el._cleanup = () => {
            emitter.off('moveElement', moveListener);
        }
    },
    beforeUnmount(el) {
        if (el._cleanup) {
            el._cleanup();
        }
    }
};