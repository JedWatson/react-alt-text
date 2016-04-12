const React = require('react');
const blacklist = require('blacklist');
const vkey = require('vkey');

const AltText = React.createClass({
	displayName: 'AltText',
	getDefaultProps: function () {
		return {
			component: 'span',
			modifier: '<alt>',
			normal: '',
			modified: '',
		};
	},
	getInitialState: function () {
		return {
			modified: false,
		};
	},
	componentDidMount: function () {
		document.body.addEventListener('keydown', this.handleKeyDown, false);
		document.body.addEventListener('keyup', this.handleKeyUp, false);
	},
	componentWillUnmount: function () {
		document.body.removeEventListener('keydown', this.handleKeyDown);
		document.body.removeEventListener('keyup', this.handleKeyUp);
	},
	handleKeyDown: function (e) {
		if (vkey[e.keyCode] !== this.props.modifier) return;
		this.setState({
			modified: true,
		});
	},
	handleKeyUp: function (e) {
		if (vkey[e.keyCode] !== this.props.modifier) return;
		this.setState({
			modified: false,
		});
	},
	render: function () {
		var props = blacklist(this.props, 'component', 'modifier', 'normal', 'modified');
		return React.createElement(this.props.component, props, this.state.modified ? this.props.modified : this.props.normal);
	},
});

module.exports = AltText;
