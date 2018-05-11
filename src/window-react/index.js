// "Fake" React implementation. Take global variable provided by Portal and export it.
// It's necessary, as it's impossible to have two instances of React on the single page.
// And some NPM modules require react as a peer dependency.
module.exports = window.React
