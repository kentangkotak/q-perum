export default async () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then((reg) => {
      reg.showNotification('Notifikasi baru', {
        body: 'Ada data masuk',
        icon: '/icons/icon-192x192.png',
      })
    })
  }
}
