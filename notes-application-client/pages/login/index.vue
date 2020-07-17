<template>
  <div class="container">
    <div class="hero-body">
      <div class="column is-6 is-offset-3">
        <div class="box has-text-centered">
          <h3 class="title">Sign In</h3>

          <form @submit="onSubmit">
            <div class="field">
              <div class="control is-clearfix">
                <input
                  class="input"
                  type="email"
                  autocomplete="on"
                  placeholder="Email"
                  v-model="login.username"
                />
              </div>
            </div>
            <div class="field">
              <div class="control is-clearfix">
                <input
                  class="input"
                  type="password"
                  autocomplete="on"
                  placeholder="Password"
                  v-model="login.password"
                />
              </div>
            </div>
            <button class="button is-primary" type="submit">Login</button>
          </form>
        </div>
        <p class="has-text-gray has-text-centered">
          <nuxt-link to="/signup">Sign Up</nuxt-link> -
          <nuxt-link to="/forgotpassword">Forgot Password</nuxt-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      login: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    onSubmit() {
      console.log('on submit');
      this.$auth.loginWith('cognito', { data: this.login })
    }
  }
};
</script>

<style>
html {
  background-color: #dddddd;
}
</style>
