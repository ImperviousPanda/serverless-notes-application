import Amplify, { API } from "aws-amplify";
import Vue from "vue";
import awsmobile from "../aws-exports";
import "@aws-amplify/ui-vue";

Amplify.configure(awsmobile);
// Vue.use(AmplifyVue.AmplifyPlugin, AmplifyModules);
