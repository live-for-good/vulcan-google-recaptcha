Package.describe({
  name: "vulcan:google-recaptcha",
  version: "0.0.1",
  summary: "A Vulcan.js package to integrate Google ReCaptcha in your forms",
  documentation: "README.md",
});

Package.onUse(api => {
  api.use(["vulcan:core@1.12.3", "vulcan:users@1.12.3", "vulcan:lib@1.12.3"]);

  api.mainModule("lib/server/main.js", "server");
  api.mainModule("lib/client/main.js", "client");
});
