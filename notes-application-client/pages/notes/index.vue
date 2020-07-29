<template>
  <div class="container">
    <div class="hero-body">
      <div class="column is-6 is-offset-3">
        <amplify-authenticator
          v-if="authState !== 'signedin'"
        ></amplify-authenticator>
        <div
          v-if="authState === 'signedin' && user"
          class="box has-text-centered"
        >
          YOU're AUTHd
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onAuthUIStateChange } from "@aws-amplify/ui-components";
import { API } from "@aws-amplify/api";

export default {
  async created() {
    onAuthUIStateChange((authState, authData) => {
      this.authState = authState;
      this.user = authData;
    });

    const path = "/note";
    const apiName = "NotesBackend";
    const request = {
      body: {
        text: "test"
      }
    };

    const response = await API.post(apiName, path, request);
    console.log(response);
  },
  data() {
    return {
      user: undefined,
      authState: undefined
    };
  },
  beforeDestroy() {
    return onAuthUIStateChange;
  }
};
</script>

<style>
html {
  background-color: #dddddd;
}
</style>
