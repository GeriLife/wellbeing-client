import Vue from "vue";
import VueI18n from "vue-i18n";

const en = require("../i18n/en.i18n.json");
const fi = require("../i18n/fi.i18n.json");

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: "en-us",
  fallbackLocale: "en-us",
  messages: {
    en,
    fi
  }
});

export default ({ app }) => {
  // Set i18n instance on app
  app.i18n = i18n;
};

// if you need to import it from
// other files, then:
export { i18n };
