// // src/boot/socket.js
// import { boot } from 'quasar/wrappers'
// import { io } from 'socket.io-client'

// export default boot(({ app, $q }) => {
//   // Ganti localhost:3000 sesuai alamat container Socket.IO
//   const socket = io('http://localhost:6001', {
//     transports: ['websocket'],
//   })

//   // Simpan ke globalProperties supaya bisa diakses di seluruh komponen
//   app.config.globalProperties.$socket = socket

//   // Event connect
//   socket.on('connect', () => {
//     console.log('Connected to Socket.IO:', socket.id)
//   })

//   // Event new-member
//   socket.on('new-member', (data) => {
//     console.log('New member registered:', data)

//     // Notifikasi Quasar
//     $q.notify({
//       type: 'positive',
//       message: `Anggota baru: ${data.name}`,
//       timeout: 5000,
//     })
//   })
// })
