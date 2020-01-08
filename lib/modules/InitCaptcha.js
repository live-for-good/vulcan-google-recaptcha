import React, { Component } from "react";
import { addCallback } from "meteor/vulcan:core";
import { loadReCaptcha } from "react-recaptcha-google";

class InitCaptchaComponent extends Component {
	componentDidMount() {
		loadReCaptcha();
	}
	render() {
		return this.props.children;
	}
}

export const InitCaptcha = () => {
	addCallback("router.client.wrapper", function CaptchaProvider(app) {
		return <InitCaptchaComponent>{app}</InitCaptchaComponent>;
	});
};
