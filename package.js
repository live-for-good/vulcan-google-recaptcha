Package.describe({
  name: "vulcan:google-recaptcha",
  version: "0.0.1",
  summary: "A Vulcan.js package to integrate Google ReCaptcha in your forms",
  documentation: "README.md",
});

Package.onUse(api => {
  api.use(["vulcan:core", "vulcan:users", "vulcan:lib"]);

  api.mainModule("lib/server/main.js", "server");
  api.mainModule("lib/client/main.js", "client");
});
