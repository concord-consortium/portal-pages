# Concord Portal Pages

This respository serves multiple purposes:

1. It allows for version control for the various custom portal page content areas like the homepage and project pages.
2. It contains a server that fetches remote portal pages and then injects local page content for development and testing.
2. It features a build system via Travis that exports the static pages to S3.

## Organization

At the top level there are four folders:

* `/src` - contains the html and css for the custom portal page content and the portal pages library
* `/server` - contains the development server
* `/dest` - contains the results of concatenating all the .css and .html files in src, this is not kept in git
* `/scripts` - contains npm build script that generates the files in /dest
* `/mock-ajax` - contains the json responses when mocking is enabled

The `/src/portals` folder is further organized by portal, using the full domain, eg `/src/portals/learn.concord.org`.  Each static page content is then named for the same page on the portal, eg `/src/portals/learn.concord.org/index.html`.  Each .html file in src should resolve to the same page on the remote portal and can optionally have a seperate .css file with the same basename, eg `/src/portals/learn.concord.org/index.css`.  The seperate css file allows for live updating of the css using the development server.   Each final static page is built using seperate css and html pages that are then concatenated (css first).

The `/src/library` folder contains the shared component library code that is included both the in development server and built as a standalone file by the build script.

## Build the Static Files

To build the static files do a one time install of the node modules needed (if not already done to run the development server):

`npm install`

and then run the following each time you want build the files:

`npm run build`

## Development & Testing Server

To run the local development and testing server do a one time install of the node modules needed (if not already done to build the static files):

`npm install`

and then run the following each time you want to start the server:

`npm start` or `npm start -- --port <port>` to use a different port than 10000 (note the two sets of --, the first -- causes the remainder of the line to be appended to the start script in package.json)

This should bring up the development server homepage in your browser where you will be presented with a form asking for the following:

1. A dropdown select where you can select any .html file in the `/src/portals` folder, eg `/src/portals/learn.concord.org/index.html`
2. A text input for the remote portal url, eg `https://learn.concord.org/`
3. A text input for the jQuery selector to use to select the content in the remote url that will be replaced by the local .html, eg `div.home-page-content`
4. A checkbox enabling AJAX requests to use the mocked values in the mock-ajax folder

The values of fields 2 and 3 will be saved in localstorage based on the selection of the file in field 1.

Once you hit submit the following will happen:

1. The server will load the local .html and .css from form field 1 and then place a watch on those files so that any change to the html results in an automatic page reload and any change to the .css will result in a automatic style change without a reload (just like [live-server](https://github.com/tapio/live-server) does)
2. The server will fetch the contents of the remote portal url and then do the following before displaying it
    1. It will add a <base href="..."> tag right after the opening head tag pointing to the remote portal url so that relative url references are      automatically resolved to the remote server
    2. It will add a style tag pointing to the local server which will return the .css file in step 1 so that automatic style changes can be done on css changes.
    3. It will use the selector in the form to create a "hole" in the document which is then filled with the .html in step 1.
    4. It will add a script tag pointing to a script on the server that will open a websocket and either reload the page or cause the style links to reload based on a file watch change event sent from the server.  The script also overrides the XMLHttpRequest.open function so that relative urls are rewritten to point to the /ajax-proxy/ endpoint on the developement server to get around CORS restictions.

### Mocking AJAX Requests

To use the mock ajax requests just enable the checkbox in the form.  This will cause the /ajax-proxy/ endpoint to lookup the mocked file in the mock-ajax folder.  The file name is based on the portal url domain and the path to the ajax endpoint with the query string encoded as base64.  These files are read for each request so you can change the content without restarting the server.

The server will also record all the non-mocked ajax responses if you start the server with this parameter:

`npm start -- --recordAjax` (note the two sets of --, the first -- causes the remainder of the line to be appended to the start script in package.json)

## License

Portal Pages is released under the [MIT License](LICENSE).