TODO

- the examples need to be generated since in production they will reference an css file directly but in development that css will be bundled in the js file. There are plugins which can inject the appropriate html tags in html files, so this should be doable.
- the script/build.js is probably broken right now, and it compiles the collection page components, which the current webpack setup does not. So if this was merged there would be no way to build the collection pages.
- the server/routes/index.js is probably also broken, this is used to locally test changes to collection pages. So if this was merged that would make collection page work harder to manage.
