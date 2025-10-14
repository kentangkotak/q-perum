<template>
  <q-page class="flex flex-center">
    <q-btn label="Aktifkan Notifikasi" @click="mintaNotif" />
  </q-page>
</template>

<script setup>
const mintaNotif = async () => {
  if ('Notification' in window) {
    const permission = await Notification.requestPermission()

    if (permission === 'granted') {
      new Notification('Notifikasi aktif 🎉', {
        body: 'Sekarang kamu bisa terima notifikasi',
        icon: '/icons/pwa-192x192.png',
      })
    }
  }
}
</script>
