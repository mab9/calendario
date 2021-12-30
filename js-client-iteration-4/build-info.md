# running code
For running the code that is build on the ES6 module feature you either

- have to run a local server like with `npx http-server -c-1` or
- use the [intellij local server](https://www.jetbrains.com/help/idea/creating-local-server-configuration.html)

## build code

- config client - don't forget to check the environment, domain and port values!
  - config.js  - `config.environment = env.LOCAL;`
  - index.html - `window.springServerName = "localhost";`
  - index.html - `window.springServerPort = "8080";`
  - index.html - `window.restPath = '/event';`
  - index.html - `window.appRootId = 'vakansie';`
  - index.html - `<script src="./starter.bundle.minified.js" type="module">` update script paths
  - CORS are disabled (allow all) at the moment.

- js bundling - use a bundler like webpack, or [rollup](https://rollupjs.org) , e.g.
    - install with  `sudo npm install --global rollup`
    - run via `rollup -o starter.bundle.js -f es -w . starter.js`

- css bundling

- minifying - compress code for quick loading times
  - js code minifying with [toptal minifier](https://www.toptal.com/developers/javascript-minifier) (copy past bundled code - use whitespace option)
  - css code minfying with [minifier.org](https://www.minifier.org)
  - we don't minify html code. html code is genereted ad hoc via JS
  - not every minifier strategy works with our self written fancy JS code. Arrow functions causes some problems...

## quick loading infos (bundling and compression with minifying)

Is a bundle and minified code always loaded faster compared to non optimized code? It depends!
Application ready may be delayed through a bundle. A bundle has to be fully charged. In the meantimes several smaller files could be loaded...
An optimized loading strategy is crucial for fast and quick initializations of websites..


## npx infos
For NPM to execute a package, you have to install the package from
the NPM registry into your system. NPX executes packages without
necessarily having previously installed the package. When executing
a package, it will look for the package binaries either from the local
or global installation.

NPX binaries executors are bundled with NPM.
When you install NPM version 5.2.0 or higher, get NPX installed.
Or you can install NPX as a stand-alone with `npm i npx`.

## rollup infos
Rollup is a module bundler for JavaScript which compiles small pieces of code
into something larger and more complex, such as a library or application.
It uses the new standardized format for code modules included in the ES6 revision
of JavaScript, instead of previous idiosyncratic solutions such as CommonJS and AMD.
ES modules let you freely and seamlessly combine the most useful individual functions
from your favorite libraries. This will eventually be possible natively everywhere,
but Rollup lets you do it today.
