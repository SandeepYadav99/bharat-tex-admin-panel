import EventEmitter from "./Events.utils";

class SnackbarUtils {
    success = (message) => {
        EventEmitter.dispatch(EventEmitter.SHOW_SNACKBAR, {
            error: message,
            type: 'success'
        });
    }
    
    error = (message) => {
        EventEmitter.dispatch(EventEmitter.SHOW_SNACKBAR, {
            error: message,
            type: 'error'
        });
    }
}

export default new SnackbarUtils();
