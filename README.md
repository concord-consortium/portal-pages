# Concord Portal Pages

This respository serves multiple purposes:

1. It allows for version control for the various custom portal page content areas like the homepage and project pages.
2. It contains a server that fetches remote portal pages and then injects local page content for development and testing.
2. It features a build system via Travis that exports the static pages to S3.

## Organization

At the top level there are four folders:

* `/src` - contains the html and css for the custom portal page content
* `/server` - contains the development server
* `/dest` - contains the results of concatenating all the .css and .html files in src, this is not kept in git
* `/scripts` - contains npm build script that generates the files in /dest

The `/src` folder is further organized by portal, using the full domain, eg `/src/learn.concord.org`.  Each static page content is then named for the same page on the portal, eg `/src/learn.concord.org/index.html`.  Each .html file in src should resolve to the same page on the remote portal and can optionally have a seperate .css file with the same basename, eg `/src/learn.concord.org/index.css`.  The seperate css file allows for live updating of the css using the development server.   Each final static page is built using seperate css and html pages that are then concatenated (css first).

## Build the Static Files

To build the static files do a one time install of the node modules needed (if not already done to run the development server):

`npm install`

and then run the following each time you want build the files:

`npm run build`

## Development & Testing Server

To run the local development and testing server do a one time install of the node modules needed (if not already done to build the static files):

`npm install`

and then run the following each time you want to start the server:

`npm start`

This should bring up the development server homepage in your browser where you will be presented with a form asking for the following:

1. A dropdown select where you can select any .html file in the `/src` folder, eg `/src/learn.concord.org/index.html`
2. A text input for the remote portal url, eg `https://learn.concord.org/`
3. A text input for the jQuery selector to use to select the content in the remote url that will be replaced by the local .html, eg `div.home-page-content`

The values of fields 2 and 3 will be saved in localstorage based on the selection of the file in field 1.

Once you hit submit the following will happen:

1. The server will load the local .html and .css from form field 1 and then place a watch on those files so that any change to the html results in an automatic page reload and any change to the .css will result in a automatic style change without a reload (just like [live-server](https://github.com/tapio/live-server) does)
2. The server will fetch the contents of the remote portal url and then do the following before displaying it
    1. It will add a <base href="..."> tag right after the opening head tag pointing to the remote portal url so that relative url references are      automatically resolved to the remote server
    2. It will add a style tag pointing to the local server which will return the .css file in step 1 so that automatic style changes can be done on css changes.
    3. It will use the selector in the form to create a "hole" in the document which is then filled with the .html in step 1.
    4. It will add a script tag pointing to a script on the server that will open a websocket and either reload the page or cause the style links to      reload based on a file watch change event sent from the server.
    5. It will replace all `/api/` strings in both the remote and local html to point to a proxy endpoint on the local server to get around CORS restrictions.  The remote portal url will be included in the local api endpoint, eg `/api/foo` will get rewritten to `http://localhost:8000/api-proxy/learn.concord.org/api/foo`

## TODO:

1. ~~Setup src folders for learn.concord.org and add their homepage content as seperate html and css files~~
2. ~~Create npm script build task~~
3. Create server
    1. Create Express based server and set package.json start script to start it
    2. Add form on homepage pointing to /proxy action using url parameters for the form fields.  Save form fields in localstorage.
    3. Add download of remote url in proxy with <base> tag injected
    4. Add load of local page content html and css in proxy
    5. Add replacement of local html using DOM selector
    6. Add local css server endpoint and add it to the downloaded html
    7. Add /api/ proxy endpoint and rewrite downloaded html to point to it
    8. Use live-server like injected html to talk to websocket endpoint on server for reloads and redraws
4. Create travis.yml build task using s3_website
5. Add src folders for the other portals

## License

Portal Pages is released under the [MIT License](LICENSE).