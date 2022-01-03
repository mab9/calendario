# tldr; build and start frontend (linux)

**Copy code to build directory and remove unwanted parts**

    rm -r build 2> /dev/null
    mkdir -p ./build && cp -R ./ ./build 2> /dev/null
    rm -r ./build/build # remove recursive copied directorie

**Prepare config and code for prod**
- config ./build/config.js file
- update ./build/index.html server values
- bundle js code: `rollup -o ./build/starter.bundle.js -f es -w . ./build/starter.js`
- minify code: [toptal minifier](https://www.toptal.com/developers/javascript-minifier)

**Refer to bundle.minified.js and remove obsolete files**

    sed -i -e 's/starter.js/starter.bundle.minified.js/g' ./build/index.html
    find ./build -name "*.js" ! -name "*.bundle.minified.js" -type f -delete # remove bundled js code
    rm ./build/.gitignore ./build/.editorconfig ./build/test.html ./build/*.md # remove unwanted files
    find ./build -depth -type d -empty -delete  # remove empty directories

**Start serving** `npx http-server -c-1`

**We usually don't minify code for local and dev environments.**

## running code
For running the code that is build on the ES6 module feature you either

- have to run a local server like with `npx http-server -c-1` or
- use the [intellij local server](https://www.jetbrains.com/help/idea/creating-local-server-configuration.html) or
- [lighttpd server](https://redmine.lighttpd.net/projects/lighttpd/wiki)

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

- minifying - compress code for quick loading times
  - js code minifying with [toptal minifier](https://www.toptal.com/developers/javascript-minifier) (copy past bundled code - use whitespace option)
  - css code minfying with [minifier.org](https://www.minifier.org)
  - we don't minify html code. html code is genereted ad hoc via JS
  - not every minifier strategy works with our self written fancy JS code. Arrow functions causes some problems...

We don't bundle and minify CSS code at this point. There are many threads and example on that topic.

Cool would be to build the code into a dedicated folder and remove all not necessary files (test, git, readme, ...).

## fast loading infos

Performance matters, but it is quite a complex topic. For example, bundling application's assets in a single file is necessary only when using HTTP/1.
With HTTP/2, many files can be downloaded concurrently, allowing fine tune the assets delivered to the client instead of sending to everyone the same bulky bundle.

Always fact-check assumptions, measuring every aspect to improve before and after implementing any “optimization”, and make use of the available tools to analyze the impact of performance issues in your users’ experience.

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



## lighttpd webserver

    sudo apt-get install lighttpd # install
    lighttpd -tt -f ./lighttpd.conf # lint
    lighttpd -D -f lighttpd.conf # start server


**lighttpd.conf**

    #server.document-root = "/var/www/servers/www.mab.ch"
    server.document-root       = "/home/mab/development/source/calendario/js-client-iteration-5"

    server.port = 3000
    server.error-handler-404 = "/404.html"

    mimetype.assign = (
      ".html" => "text/html",
      ".css"  => "text/css",
      ".js"   => "text/javascript",
      ".png"  => "image/png",
      ".jpg"  => "image/jpeg",
      ".jpeg" => "image/jpeg",
      ".svg"  => "image/svg+xml"
    )

    static-file.exclude-extensions = ( ".fcgi", ".cgi", ".php", ".rb", "~", ".inc" )
    index-file.names = ( "index.html" )
