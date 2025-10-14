<template>
  <div>
    <q-list bordered padding>
      <q-item-label header>Notifikasi</q-item-label>
      <q-item v-for="(msg, i) in store.messages" :key="i">
        <q-item-section>{{ msg }} : {{ i }}</q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script setup>
import { useNotificationStore } from 'src/stores/notifications'
const store = useNotificationStore()
</script>

<style scoped>
q-list {
  max-width: 400px;
  margin: 20px;
}
</style>
