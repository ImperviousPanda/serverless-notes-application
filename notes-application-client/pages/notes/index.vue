<template>
  <div class="container">
    <div class="hero-body">
      <div class="column is-6 is-offset-3">
        <div class="box has-text-centered">
          YOU're AUTHd
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    middleware: 'auth'
  };
</script>

<style>
  html {
    background-color: #dddddd;
  }
</style>
