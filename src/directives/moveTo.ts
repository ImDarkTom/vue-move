import { Emitter } from "mitt";
import { nanoid } from "nanoid";
import { Directive } from "vue";

export const moveTo = (emitter: Emitter<any>) => <Directive<
    HTMLElement & { _cleanup?: () => void }, 
    { 
        target: string | ((e: MouseEvent) => string), 
        afterClick: (e: MouseEvent) => any,
        durationMs?: number,
        deleteAfterFinish?: boolean,
    }
>
> {
    mounted(el, binding) {
        const moveCallbackListener = (event: { elementId: string, x: number, y: number }) => {
            if (event.elementId === elementId) {
                const { x: fromX, y: fromY } = el.getBoundingClientRect();
                const { x: toX, y: toY } = event;

                const translateX = toX - fromX;
                const translateY = toY - fromY;

                position = { x: translateX, y: translateY };

                el.style.zIndex = '1000';
                el.style.transition = `transform ${transitionDurationSec}s ease-out`;
                el.style.transform = `translate(${translateX}px, ${translateY}px)`;

                setTimeout(() => {
                    binding.value.afterClick(clickEvent!);

                    if (binding.value.deleteAfterFinish) {
                        el.remove();
                    }
                }, transitionDurationSec * 1000);
            }
        };

        const transitionDurationSec = ( binding.value.durationMs || 300 ) / 1000;
        const elementId = nanoid();
        let position = { x: 0, y: 0 };

        let clickEvent: MouseEvent | null = null;

        emitter.on('moveElementCallback', moveCallbackListener);

        el._cleanup = () => {
            emitter.off('moveElementCallback', moveCallbackListener);
        }

        el.addEventListener('click', (e: MouseEvent) => {
            clickEvent = e;

            let targetId = '';

            if (typeof binding.value.target === 'function') {
                targetId = binding.value.target(e);
            } else {
                targetId = binding.value.target;
            }

            emitter.emit('moveElement', {
                elementId: elementId,
                targetId: targetId,
            });
        });
    },
    beforeUnmount(el) {
        if (el._cleanup) {
            el._cleanup();
        }
    }
};