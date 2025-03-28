import { Emitter } from "mitt";
import { nanoid } from "nanoid";
import { Directive } from "vue";

type TimingFunctions = 'ease' | 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out' | string;

export const mover = (emitter: Emitter<any>) => <Directive<
    HTMLElement & { _cleanup?: () => void }, 
    { 
        target: string | ((e: MouseEvent) => string), 
        afterClick: (e: MouseEvent) => any,
        transition?: {
            durationMs?: number,
            timingFunction?: TimingFunctions,
            zIndex: number,
        }
        deleteAfterFinish?: boolean,
    }
>
> {
    mounted(el, binding) {
        const transitionDurationSec = ( binding.value.transition?.durationMs || 300 ) / 1000;
        const timingFunction = binding.value.transition?.timingFunction || 'ease-out';
        const zIndex = binding.value.transition?.zIndex;

        const moveCallbackListener = (event: { elementId: string, x: number, y: number }) => {
            if (event.elementId === elementId) {
                const { x: fromX, y: fromY } = el.getBoundingClientRect();
                const { x: toX, y: toY } = event;

                const translateX = toX - fromX;
                const translateY = toY - fromY;

                position = { x: translateX, y: translateY };

                if (zIndex) {
                    el.style.zIndex = String(zIndex);
                }

                el.style.transition = `transform ${transitionDurationSec}s ${timingFunction}`;
                el.style.transform = `translate(${translateX}px, ${translateY}px)`;

                setTimeout(() => {
                    if (binding.value.afterClick) {
                        binding.value.afterClick(clickEvent!);
                    }

                    if (binding.value.deleteAfterFinish) {
                        el.remove();
                    }
                }, transitionDurationSec * 1000);
            }
        };

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