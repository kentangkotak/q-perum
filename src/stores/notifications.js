import { defineStore } from 'pinia'
import { notif } from 'src/modules/notifs'

export const useNotificationStore = defineStore('notifications', {
  state: () => ({
    messages: [],
  }),
  actions: {
    addMessage(message) {
      console.log('addMessage', message)
      //notifSuccess(message)
      notif(message)
      this.messages.push(message)
    },
    clear() {
      this.messages = []
    },
  },
})
