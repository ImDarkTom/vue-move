# 🏃‍♂️ vue-move-directives
A set of Vue 3 directives to animate elements moving to other elements.

![Demo Video](https://github.com/user-attachments/assets/abee678b-e5d6-4c31-9fdc-e2dfcff6fc65)

[Link to demo](https://github.com/ImDarkTom/vue-move-directives-demo)

## Highlights
- **🌿 Simple**: Adds `v-mover` and `v-mover-target` to easily set which elements to move/move to.
- **🎨 Highly customisable**: Set transition duration, timing function, z-index, etc. per mover.
- **🔄 Callback-friendly**: Allows setting options as static values or by passing in a function.

## Install

Node:
```sh
npm install vue-move-directives
```

Bun:
```sh
bun install vue-move-directives
```

## Usage

### Setup:
```typescript
...

import { createApp } from 'vue'
import App from './App.vue'
import { MoveDirectivesPlugin } from 'vue-move-directives';

const app = createApp(App)
app.use(MoveDirectivesPlugin);

...

app.mount('#app')
```

### Use in component
```vue
<template>

  ...

  <div class="container">
    <div class="text" v-mover="{ target: 'my-target' }">Click me</div>
    <div class="box" v-mover-target="'my-target'"></div>
  </div>

  ...

</template>
```

> For a more detailed example, check out the [demo](https://github.com/ImDarkTom/vue-move-directives-demo).

## Options

### v-mover
- `target`: A string or a callback that returns a string. The callback is passed a `MouseEvent` parameter.
- `afterClick?`: An optional callback that is ran after the transition has finished. Callback is passed a `MouseEvent` parameter from the inital click.
- `transition?`:
  - `durationMs?`: The length in milliseconds of the duration.
  - `timingFunction?`: The timing function for the transiton. See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-timing-function) for available values.
  - `zIndex?`: The z-index the element should have for the duration of the transition.
- `deleteAfterFinish?`: Whether the element should be removed from the DOM after transition completion.

### v-mover-target
- `v-mover-target` only takes a string to use as the target's id.

## License
vue-move-directives is licensed under [MIT](LICENSE) license.

## Support
If you find this project useful and would like to support development you can donate using the button below.

<a href="https://www.buymeacoffee.com/ImDarkTom" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-yellow.png" alt="Buy Me A Coffee" height="41" width="174"></a>
