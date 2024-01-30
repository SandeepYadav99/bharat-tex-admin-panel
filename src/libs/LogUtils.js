import Constants from "../config/constants";

export default (function() {
  return {
    log: function() {
      if (Constants.LOG_ENABLED && JSON.parse(Constants.LOG_ENABLED)) {
        const args = Array.prototype.slice.call(arguments);
        console.log.apply(console, args);
      }
    },
    warn: function() {
      if (Constants.WARNING_ENABLED && JSON.parse(Constants.WARNING_ENABLED)) {
        const args = Array.prototype.slice.call(arguments);
        console.warn.apply(console, args);
      }
    },
    error: function() {
      if (Constants.ERROR_ENABLED && JSON.parse(Constants.ERROR_ENABLED)) {
        const args = Array.prototype.slice.call(arguments);
        console.error.apply(console, args);
      }
    },
  };
}());
