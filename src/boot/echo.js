// import { boot } from 'quasar/wrappers'
// import Echo from 'laravel-echo'
// import Pusher from 'pusher-js'
// import { useNotificationStore } from 'src/stores/notifications'
// import { Notify } from 'quasar'

// window.Pusher = Pusher

// export default boot(() => {
//   const store = useNotificationStore()

//   const echo = new Echo({
//     broadcaster: 'pusher',
//     key: import.meta.env.VITE_PUSHER_APP_KEY,
//     wsHost: import.meta.env.VITE_PUSHER_HOST,
//     wsPort: import.meta.env.VITE_PUSHER_PORT,
//     forceTLS: false,
//     disableStats: true,
//     encrypted: false,
//     // authEndpoint: `http://${import.meta.env.VITE_PUSHER_HOST}:8888/broadcasting/auth`,
//   })

//   window.Echo = echo

//   // Public channel
//   echo.channel('test-channel').listen('TestEvent', (e) => {
//     if (Array.isArray(e.messages)) {
//       store.addMessages(e.messages)
//       e.messages.forEach((msg) => {
//         Notify.create({ message: msg, color: 'green', timeout: 5000 })
//       })
//     } else {
//       store.addMessage(e.message)
//       Notify.create({ message: e.message, color: 'green', timeout: 5000 })
//     }
//   })

//   // Private channel
//   // echo.private('orders').listen('UserMessage', (e) => {
//   //   store.addMessage(e.message)
//   //   Notify.create({ message: e.message, color: 'blue', timeout: 5000 })
//   // })
// })
