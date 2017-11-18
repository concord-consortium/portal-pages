var div = React.DOM,
    ref = React.DOM,
    input = ref.input;

var AsyncValidationMixin = function() {

  // console.log("INFO creating async_validation_mixin");

  return {
    getInitialState: function() {
      return {
        _asyncValidationPassed: true
      };
    },
    getDefaultProps: function() {
      return {
        asyncValidationTimeout: 500,
        asyncValidationError: 'Async validation failed'
      };
    },
    isValidAsync: function() {
      return this.isValid() && this.state._asyncValidationPassed;
    },
    validateAsync: function(value) {
      if (!this.props.asyncValidation) {
        return;
      }
      this.setState({
        _asyncValidationPassed: false
      });
      if (this._asyncValidationTimeoutID) {
        window.clearTimeout(this._asyncValidationTimeoutID);
      }
      this._asyncValidationTimeoutID = window.setTimeout((function(_this) {
        return function() {
          return _this.props.asyncValidation(value).done(function() {
            _this.setState({
              _asyncValidationPassed: true
            });
            return _this.context.formsy.validate(_this);
          }).fail(function() {
            return _this.setState({
              _asyncValidationPassed: false,
              _isValid: false,
              _externalError: [_this.props.asyncValidationError]
            });
          });
        };
      })(this), this.props.asyncValidationTimeout);
      return this._asyncValidationTimeoutID;
    }
  };
};

module.exports = AsyncValidationMixin;
