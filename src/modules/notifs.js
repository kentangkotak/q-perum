import { Notify } from 'quasar'

export function notifSuccess(msg) {
  Notify.create({
    message: msg,
    color: 'positive',
    icon: 'done_all',
    classes: 'glossy', // langsung pakai nama ikon
  })
}

export function notifError(msg) {
  Notify.create({
    message: msg,
    color: 'negative',
    icon: 'error', // langsung pakai nama ikon
    classes: 'glossy',
  })
}

export function notif(msg) {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then((reg) => {
      reg.showNotification('Notifikasi baru', {
        body: msg,
        icon: '/icons/icon-192x192.png',
      })
    })
  }
}
