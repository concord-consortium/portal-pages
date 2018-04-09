var Component = require('../helpers/component');

var div = React.DOM.div;
var p = React.DOM.p;
var strong = React.DOM.strong;
var br = React.DOM.br;

var Tooltip = Component({
  getInitialState: function () {
    return {
      id: this.props.id,
      text: this.props.text,
      posx: this.props.posx,
      posy: this.props.posy,
      type: this.props.type || '',
      close_delay: this.props.close_delay || 3000
    };
  },

  getDefaultProps: function () {
    return {};
  },

  componentWillMount: function () {

  },

  componentDidMount: function () {
    this.setTimer();
  },

  componentWillUnmount: function () {
    window.clearTimeout(this._timer);
  },

  setTimer: function() {
    this._timer != null ? window.clearTimeout(this._timer) : null;

    this._timer = window.setTimeout(function() {
      jQuery('#' + this.state.id).fadeOut();
      this._timer = null;
    }.bind(this), this.state.close_delay);
  },

  handleClose: function (e) {
    this.props.toggleTooltip(e);
  },

  render: function (e) {
    var tooltip_timer;
    return div({className: "portal-pages-tooltip-wrapper", onClick: this.handleClose},
      div({className: "portal-pages-tooltip " + this.state.type, id: this.state.id, style: {left: this.state.posx, top: this.state.posy}, onClick: this.handleClose},
        p({},
          this.state.text
        )
      )
    );
  }
});

module.exports = Tooltip;
