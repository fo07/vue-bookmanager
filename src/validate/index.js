import Vue from "vue";
import {
  ValidationProvider,
  ValidationObserver,
  localize,
  extend
} from "vee-validate";
import ja from "vee-validate/dist/locale/ja.json";
import * as rules from "vee-validate/dist/rules";

for (let rule in rules) {
  extend(rule, rules[rule]);
}

Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);
localize("ja", ja);
