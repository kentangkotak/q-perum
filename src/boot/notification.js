export default async () => {
  if ('Notification' in window) {
    const permission = await Notification.requestPermission()
    if (permission === 'granted') {
      new Notification('PWA Aktif 🚀', {
        body: 'Project kamu sudah jadi PWA',
        icon: '/icons/pwa-192x192.png',
      })
    }
  }
}
