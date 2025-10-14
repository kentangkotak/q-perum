<template>
  <q-page class="flex flex-center">
    <q-btn label="Aktifkan Notifikasi" @click="mintaNotif" />
  </q-page>
</template>

<script setup>
const mintaNotif = async () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then((reg) => {
      reg.showNotification('Notifikasi baru', {
        body: 'Ada data masuk',
        icon: '/icons/icon-192x192.png',
      })
    })
  }
}
</script>
