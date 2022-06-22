# Client App

This is the frontend for the covid social media dashboard project\
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Development

for first time users, install dependencies with `npm i`

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

<!--
The page will reload if you make edits.\
You will also see any lint errors in the console. -->

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds Production

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## CSS development

We preprocess with PostCSS, which allows us to automate cross-browser compatibility with [autoprefixer](https://github.com/postcss/autoprefixer), among other things.

We are using [Tailwind CSS](https://tailwindcss.com/) as our css framwork. frameworks helps us have a unified design accross the websites, and helps avoid certain pitfalls with css by writing more maintainable code. It also can help with accessibility considerations.

Tailwind differs from other frameworks in that they use a "utility first" approach, which aims to solve certain issues with css development at scale.

To get started, skim through these to see how tailwind works:

(listed in order of importance)

1. https://tailwindcss.com/docs/utility-first (read this first!)
2. https://tailwindcss.com/docs/reusing-styles
3. https://tailwindcss.com/docs/hover-focus-and-other-states
4. https://tailwindcss.com/docs/responsive-design
5. https://tailwindcss.com/docs/adding-custom-styles (optional)

you can also take a look at example components to see how its implemented:

- https://tailwindcomponents.com/
- https://tailwindui.com/

### Project Setup

Our global css is under the `src/css/` folder, and tailwind global styles can be configured under `tailwindconfig.json`.

If you've noticed, the tailwind config just copies css variables from `src/css/variables.css`. the idea behind this is to keep a "single source of truth" to things like color, spacing, type, etc.

### Isolated CSS

Additionally, we are using CSS modules when writing component-specific stylesheets. CSS modules help "isolate" css styles so they don't accidentally affect other code.

> generally, we should not need to use this as tailwind should take care of things, but having this option will help us as a backup / hotfix & a smooth refactor experience.

import the CSS into the a component by first writing:

```
import c from './index.module.css'
```

this exposes the css class names into the component as js code, and then you use in your code like how you would a js variable:

```
<div className={c.exampleClass}>
</div>
```

if you have multiple classnames, you can join them using template literals, take note of the use of the tilda instead of quotes:

```
<div className={`style ${c.exampleClass} ${c.anotherExampleClass}`}>
</div>
```

### Other notes on CSS

- with isolated css you cannot uses dashes (`-`) in your names. instead you should use camel case or underscores.

- I would also recommend camelCase over PascalCase just so we dont confuse css classes with react components

- dont use html id to define css (js and css should be separate)

- most layouts in css can be built with `flexbox` and `css grids`. you should use these over other methods, as those are old workarounds.

- you should avoid the use of `!important`

- be careful when using `z-index`, `positon`, `overflow`, as their properties depend heavily on cascading and parents.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### `react-scripts eject`

**Note: for this project, we most likely will never need to run this script.**

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

"ejects" webpack configuration into the project folder so you have full control, however now you must manually manage webpack/babel/eslint instead of CRA handling it for you.

<!-- If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it. -->

<!-- ### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify) -->
