<template>
  <div class="tile is-parent is-vertical is-4">
    <div class="tile is-child notification is-primary">
      <p class="content">{{ this.note.noteText }}</p>
      <a @click="deleteNote">delete</a>
    </div>
  </div>
</template>

<script>
import { API } from '@aws-amplify/api';

export default {
  name: 'Note',
  props: ['note'],
  methods: {
    async deleteNote() {
      const path = `/note/${this.note.id}`;
      await API.del('NotesBackend', path);
      this.$emit('delete-note');
    },
  },
};
</script>
