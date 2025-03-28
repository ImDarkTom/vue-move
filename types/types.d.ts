import { Directive } from 'vue';
import { MoverOptions } from '../src/directives/mover';

declare module 'vue-move-directives';

declare module "vue" {
	interface Directives {
	  mover: Directive<Element, MoverOptions>;
	  moverTarget: Directive<Element, string>;
	}
}