import { defineConfig } from "cypress";
const { GoogleSocialLogin } = require("cypress-social-logins").plugins;

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    setupNodeEvents(on, config) {
      on("task", {
        GoogleSocialLogin: GoogleSocialLogin,
      });
    },
  },
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
  chromeWebSecurity: false,
});
