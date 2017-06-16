var waitForAutoShowingLightboxToClose = function (callback) {
  if (PortalPages && PortalPages.settings.autoShowingLightboxResource) {
    var pollForChange = function () {
      if (!PortalPages.settings.autoShowingLightboxResource) {
        clearInterval(pollInterval);
        callback();
      }
    };
    var pollInterval = setInterval(pollForChange, 10);
  }
  else {
    callback();
  }
};

module.exports = waitForAutoShowingLightboxToClose;