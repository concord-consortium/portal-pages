# Concord Portal Pages

This respository serves multiple purposes:

1. It contains the code for portal-pages.js which is a library of React components used by the Portal.
1. It allows for version control for the various custom portal page content areas like the homepage and project or collection pages.
1. It contains a server that fetches remote portal pages and then injects local page content for development and testing.
1. It features a build system via Travis that exports the static pages to S3.

## Organization

Top level folders:

* `/src` - contains the html and css for the custom portal page content and the portal pages library
* `/server` - contains the development server for custom portal page content
* `/dest-portals` - contains the results of concatenating all the .css and .html files in src/portals, this is not kept in git
* `/dest` - contains the build of the portal pages library and its assets
* `/scripts` - contains npm build script that generates the files in /dest-portals
* `/mock-ajax` - contains the json responses when mocking is enabled

The `/src/portals` folder is further organized by portal, using the full domain, eg `/src/portals/learn.concord.org`.  Each static page content is then named for the same page on the portal, eg `/src/portals/learn.concord.org/index.html`.  Each `.html` file in src should resolve to the same page on the remote portal and can optionally have a seperate .css file with the same basename, eg `/src/portals/learn.concord.org/index.css`.  The seperate css file allows for live updating of the css using the development server.   Each final static page is built using seperate css and html pages that are then concatenated (css first).

The `/src/library` folder contains the shared component library code that is included both the in development server and built as a standalone file by the build script.

The `/src/examples` folder contains the example html files for testing the components in the library. The html files are modified by webpack to include the portal-pages.js. If webpack is run in production mode then it will also include portal-pages.css.

## Build the Static Files

To build the static files do a one time install of the node modules needed (if not already done to run the development server):

`npm install`

and then run the following each time you want to build the files:

`npm run build`

## Development & Testing Servers

To run the local development and testing server do a one time install of the node modules needed (if not already done to build the static files):

`npm install`

and then run one of the following to start the appropriate server. In all cases you can pass `-- --port <port>` to change the port of the server (note the two sets of --, the first -- causes the remainder of the line to be appended to the start script in package.json)

`npm start` - serve up the examples as well as the library. default port 8080, will choose random port if that one is taken.

`npm run start:prod` - serve up the examples and library in production mode. This is used when integrating with a local portal. It will dynamically create both portal-pages.js and portal-pages.css. default port 8080, will choose random port if that one is taken.

`npm run start-portals` - serve up the files in src/portals with a special proxy server to make development of these pages easier.  See below. default port 10000.

`npm run start-portals:prod` - serve up the files in src/portals with a special proxy server to make development of these pages easier. See below. default port 10000.

### Development of the homepage and project/collection pages.

Use either the `npm start-portals` or `npm start-portals:prod` to start a development server homepage in your browser where you will be presented with a form asking for the following:

1. A dropdown select where you can select any .html file in the `/src/portals` folder, eg `/src/portals/learn.concord.org/index.html`
2. A text input for the remote portal url, eg `https://learn.concord.org/`
3. A text input for the jQuery selector to use to select the content in the remote url that will be replaced by the local .html, eg `div.home-page-content`
4. A checkbox enabling AJAX requests to use the mocked values in the mock-ajax folder

The values of fields 2 and 3 will be saved in localstorage based on the selection of the file in field 1.

Once you hit submit the following will happen:

1. The server will load the local .html and .css from form field 1 and then place a watch on those files so that any change to the html results in an automatic page reload and any change to the .css will result in a automatic style change without a reload (just like [live-server](https://github.com/tapio/live-server) does)
2. The server will fetch the contents of the remote portal url and then do the following before displaying it
    1. It will add a <base href="..."> tag right after the opening head tag pointing to the remote portal url so that relative url references are automatically resolved to the remote server
    2. It will add a style tag pointing to the local server which will return the .css file in step 1 so that automatic style changes can be done on css changes.
    3. It will use the selector in the form to create a "hole" in the document which is then filled with the .html in step 1.
    4. It will add a script tag pointing to a script on the server that will open a websocket and either reload the page or cause the style links to reload based on a file watch change event sent from the server.  The script also overrides the XMLHttpRequest.open function so that relative urls are rewritten to point to the /ajax-proxy/ endpoint on the development server to get around CORS restrictions.

By default the `start-portals` does not replace the remote portals portal-pages.js and portal-pages.css. If you want to develop portal-pages.* at the same time as you are working on the home page or collection pages, you can use the ResourceOverride Chrome extension.  You will need to run a second server: `npm run start:prod`. This will provide the portal-pages.js and portal-pages.css. See the 'Testing local Portal Pages with a remote Portal' below for info on setting up ResourceOverride.

#### Mocking AJAX Requests

To use the mock ajax requests just enable the checkbox in the form.  This will cause the /ajax-proxy/ endpoint to lookup the mocked file in the mock-ajax folder.  The file name is based on the portal url domain and the path to the ajax endpoint with the query string encoded as base64.  These files are read for each request so you can change the content without restarting the server.

The server will also record all the non-mocked ajax responses if you start the server with this parameter:

`npm start -- --recordAjax` (note the two sets of --, the first -- causes the remainder of the line to be appended to the start script in package.json)

## Testing local Portal Pages with local Portal

The best way to do this is to configure your local Portal to point at your local Portal pages server.  The portal expects both a portal-pages.js and a portal-pages.css file so you need to use `npm run start:prod` portal pages server.

You configure your portal by editing the `.env` file in your portal src folder. And adding the line `PORTAL_PAGES_LIBRARY_URL=http://localhost:8080/library`. If you customized the port of the portal pages server you need to update this line. After changing your `.env` file you need to update your portal's app container with `docker-compose up app`.

Using this approach the live-reload feature of the portal pages server works. When you make a change in the portal pages code, the page you are looking at in the portal should reload automatically.

As an alternative you can use the ResourceOverride chrome plugin described in the next section instead of modifying your local portal config. However the live-reload feature of the portal pages server does not work with ResourceOverride.

## Testing local Portal Pages with a remote Portal

You can test how your changes to portal pages will look any deployed portal with the [ResourceOverride Chrome extension](https://github.com/kylepaulsen/ResourceOverride). You use this extension to override the requests to the portal-pages.js and portal-pages.css.

Go into ResourceOverride extension page and add a Rule. Choose the `URL -> URL` type. Use these settings `From:  '**/library/portal-pages.*'  To: http://localhost:8080/library/portal-pages.*` The `*` and `**` have a special meaning in the ResourceOverride extension, see the Help section of the extension for more info.

Now load in the page you want to test. It is useful to verify your local code is being picked up. You can look a the Chrome DevTools Sources tab, and then Page tab to see the list of domains files have been loaded from.  You should see localhost:8080, and you should not see portal-pages.concord.org.

Remember to disable the override when you are done testing.

Note: live-reload or hot module replacement does not work in this case. So you will need to manually reload the page after making a change to source. If you look at the browser console you can see that it is partially working. The console prints out the compile messages. But after compiling the page is not updated. This might be fixable.

## Travis S3 Deployments ##

Travis will automatically build these resources:
https://portal-pages.concord.org/<branch|version>/<branch-or-tag>/library/portal-pages.js


## Building an example page for a new Portal React Component ##

Create an HTML file in `src/examples/`.  It will be easiest to copy one of the existing examples. You also need to a new line to webpack.config.js: look for the lines that look like `example(...)`, and add a new one for your example.  

`npm run start` and `npm run start:prod` can both be used to view these examples locally.  `npm run build` will build them and put the result in `dest/examples`.  When you push a branch the examples will be built by travis and deployed to  `https://portal-pages.concord.org/<branch|version>/<branch-or-tag>/examples/<your-example>.html`.

The html files in `src/examples` are modified by webpack. It adds a reference to portal-pages.js. And if `npm run start:prod` or `npm run build` is called then it will also add a reference to portal-pages.css.

Note: the example pages need to bring in React and ReactDOM, often they also need to bring in other libraries that the Portal provides. This is something we should improve. The easiest approach (until we fix this) is to bring in the full portal application.js. However if you can identify which libraries are needed and only bring in those libraries from CDN sites that is better, it will help us improve this later.


## Unit Testing of React Components

A **Jest** unit-testing framework is included in portal-pages. To see how it works, an example with the name `unit-test-example` contains a React component called `DisplayText` that will be our "code under test".

Although the most desirable developer experience is one where we start by writing a failing test; followed by adding just enough code to make the test pass; and, finally demonstrating the visual result for human eyeballs. However, to demo this framework, it will be described in the reverse order.


This example can be demonstrated by using the techniques previously described in this document. It goes something like this:

* Refresh the dependencies. Typically done with `npm install`.
* Build and serve up the example page: `npm run start`
* Navigating a browser to the unit-testing-example's html page.

  Use `localhost:8080/examples/unit-test-example.html`. Note: if you already have a server running on 8080, a random port will be chosen. The base URL is added to the clipboard so you can paste it into your browser.

At this point you should see a boring little html page with some descriptive text. But most important, there is a small display at the bottom of the page,

```
The Meaning of Life:"42"
```

This display is coming from our React component that is under test, `DisplayText`.

To run the unit tests, use the command `npm test`, which will run all the tests and start a file watcher. As files change, the tests will be re-run for you. The display should look something like this:

```
 PASS  tests/library/components/unit-test-example/display-text.test.js
   When I try to display some text
    ✓ shows what I asked for in the label (3ms)
    ✓ shows what I asked for as the value

Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total
Snapshots:   0 total
Time:        1.098s
Ran all test suites related to changed files.

Watch Usage: Press w to show more.
```

Of course, as time proceeds, this display will show the results of more and more unit tests are they are added to the Portal-Pages project.

## License

Portal Pages is released under the [MIT License](LICENSE).
