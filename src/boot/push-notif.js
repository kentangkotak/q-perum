import { boot } from 'quasar/wrappers'
import { Notify } from 'quasar'

export default boot(async () => {
  if ('serviceWorker' in navigator && 'PushManager' in window) {
    try {
      const registration = await navigator.serviceWorker.ready

      // Subscribe push
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey:
          'BPwWkSbFQxnutJyGstag_NWolrt5XflqX1_ajuycZs3I4La0CrFrGEN09rCH7BWua1vDKnUXUqeYUK_cJbM5piQ',
      })

      // Kirim subscription ke backend Laravel
      await fetch('https://192.168.33.101:8888/api/save-subscription', {
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: { 'Content-Type': 'application/json' },
      })

      console.log('✅ Push subscription sukses!')
    } catch (err) {
      console.error('❌ Gagal subscribe push:', err)
      Notify.create({
        message: 'Gagal subscribe push notification',
        color: 'negative',
      })
    }
  } else {
    console.warn('Push notifications / service worker tidak didukung browser ini.')
  }
})
