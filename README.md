# Vulcan Google - ReCAPTCHA

## Use of ReCAPTCHA in Vulcan

This package helps to insert Google ReCAPTCHA in a [Vulcan.js](http://vulcanjs.org/) collection.

**/!\ This is an experimental package, API will certainly evolve in the months to come**.

## Installation

Clone this repo:

```sh
git clone https://github.com/lbke/vulcan-google-recaptcha
```

You can clone it directly in your app `packages` folder. You can also clone it in an isolated `vulcan-packages` folder outside of your app, and then set the `METEOR_PACKAGE_DIRS` environment variable to `"/some-dir/vulcan-packages"`. This way, you can put all your reusable package in this `vulcan-packages` folder without polluting your own app.

You need to install the react-recaptcha-google.

```sh
npm install react-recaptcha-google --save
```

To use the Google ReCAPTCHA in your app, normally you would have to:

1. Call the loadReCaptcha() in the main component of your app
2. Extend your schema to include a field who gets the token and whose input is the Google ReCAPTCH itself
3. Add a callback in order to check with your secretkey

With Vulcan Google ReCAPTCHA it is very easy:

1. Call in `client/main.js`

```sh
InitCaptcha();
```

2. Call in `collection.js`

```sh
enhanceCollectionWithCaptcha(YourCollection);
```

3. Call in `server/main.js`

```sh
addCaptchaVerificationCallback(YourCollection);
```

and include in `settings.json` the keys that you get from [Google](https://www.google.com/recaptcha/admin/)

```sh
{
  "public": {
    ...
    "recaptcha": {
      "codekey": "yourPublicKey"
    }
  },
  "recaptcha": {
    "secretkey": "yourSecretKey"
  }
}
```

Remember not to put your secretKey in the public side!!

This package won't be published on Atmosphere or npm until it is a bit more mature.

If you want to use the invisible reCaptcha change the onLoadRecaptcha method in captchaInput.js to:

```sh
  onLoadRecaptcha = () => {
    if (this.captchaDemo) {
      this.captchaDemo.execute();
    }
    this.setState({ loadedRecaptchaComponent: true });
  };
```

## Contributing

This package will evolve and improve depending on the use cases we encounter. Best way to contribute is to use it in your own app, and propose ideas, suggestions and PR based on your experience.

We seek for maximum reusability, so each method should be as configurable as possible, and split into independant functions whenever possible.
