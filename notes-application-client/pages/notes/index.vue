<template>
  <section class="section">
    <div class="container">
      <amplify-authenticator
        v-if="authState !== 'signedin'"
      />
      <div class="notes tile is-ancestor is-12" v-if="authState === 'signedin' && user">
        <Note v-for="note of notes" :note="note" :key="note.id" v-on:delete-note="loadNotes"  />
        <CreateNote v-on:create-note="loadNotes" />
      </div>
    </div>
  </section>
</template>

<script>
import { onAuthUIStateChange } from '@aws-amplify/ui-components';
import { API } from '@aws-amplify/api';
import Note from '../../components/Note.vue';
import CreateNote from '../../components/CreateNote.vue';

export default {
  components: {
    Note,
    CreateNote,
  },
  async created() {
    onAuthUIStateChange((authState, authData) => {
      this.authState = authState;
      this.user = authData;
    });

    return this.loadNotes();
  },
  data() {
    return {
      user: undefined,
      authState: undefined,
      notes: [],
    };
  },
  beforeDestroy() {
    return onAuthUIStateChange;
  },
  methods: {
    async loadNotes() {
      const path = '/notes';
      const apiName = 'NotesBackend';

      const response = await API.get(apiName, path);
      this.notes = response;
    },
  },
};
</script>

<style>
html {
  background-color: #dddddd;
}

.notes {
  flex-wrap: wrap;
}
</style>
