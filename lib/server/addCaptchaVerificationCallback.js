import { addCallback, getSetting } from "meteor/vulcan:core";
import request from "request"; // from "web-request": "^1.0.7",
import { getDefaultFragmentName } from "meteor/vulcan:lib";

// @see https://developers.google.com/recaptcha/docs/verify
const verifyCaptcha = async (recaptchaResponse /*, remoteAddress*/) => {
  // TODO: document secret
  const secretKey = getSetting("recaptcha.secretkey");
  return new Promise((resolve, reject) => {
    const verificationUrl =
      "https://www.google.com/recaptcha/api/siteverify?secret=" +
      secretKey +
      "&response=" +
      recaptchaResponse;
    //+ '&remoteip=' + remoteAddress;
    request(verificationUrl, function(error, response, body) {
      if (error) {
        console.log(error);
        return reject(false);
      }
      if (response.statusCode !== 200) {
        console.log(response.statusCode);
        return reject(false);
      }

      body = JSON.parse(body);
      const passCaptcha = !(body.success !== undefined && !body.success);
      resolve(passCaptcha);
    });
  });
};

// verify captcha
const verifyCaptchaCallback = async (validationErrors, properties) => {
  const { data } = properties;
  if (!data.captchaToken) {
    return validationErrors;
  }
  try {
    const isValidToken = await verifyCaptcha(data.captchaToken);
    // invalid captcha
    if (!isValidToken) {
      validationErrors.push({
        id: "errors.invalid_captcha",
        properties: {
          type: "custom"
        }
      });
      return validationErrors;
    }
  } catch (err) {
    throw err;
  }
  return validationErrors;
};

export const addCaptchaVerificationCallback = collection => {
  callbackName = getDefaultFragmentName(collection) + ".create.validate";
  addCallback(callbackName, verifyCaptchaCallback);
};
