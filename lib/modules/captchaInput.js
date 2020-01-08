import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { ReCaptcha } from "react-recaptcha-google";
import { Components, getSetting } from "meteor/vulcan:core";

export class CaptchaInput extends PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
      loadedRecaptchaComponent: false
    };
  }

  componentDidMount() {
    // reset captcha if already mounted
    if (this.captchaDemo) {
      this.captchaDemo.reset();
    }
  }

  onLoadRecaptcha = () => {
    if (this.captchaDemo) {
      this.captchaDemo.reset();
      // only for invisible recatpcha: this.captchaDemo.execute();
    }
    this.setState({ loadedRecaptchaComponent: true });
  };

  verifyCallback = recaptchaToken => {
    // Here you will get the final recaptchaToken!!!
    this.context.updateCurrentValues({ captchaToken: recaptchaToken });
  };

  render() {
    const codekey = getSetting("recaptcha.codekey");
    const { loadedRecaptchaComponent } = this.state;
    return (
      <div>
        {!loadedRecaptchaComponent && <Components.Loading />}
        {/* You can replace captchaDemo ref with whatever works for your component */}
        <ReCaptcha
          ref={el => {
            this.captchaDemo = el;
          }}
          size="normal"
          render="explicit"
          sitekey={codekey}
          onloadCallback={this.onLoadRecaptcha}
          verifyCallback={this.verifyCallback}
        />
      </div>
    );
  }
}

CaptchaInput.contextTypes = {
  updateCurrentValues: PropTypes.func
};

