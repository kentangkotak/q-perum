import { defineStore } from 'pinia'
import { api } from 'src/boot/axios'
import { notifError, notifSuccess } from 'src/modules/notifs'

export const useRegisterStore = defineStore('register', {
  state: () => ({
    loading: false,
    form: {
      name: '',
      username: '',
      password: '',
      confirm: '',
    },
  }),
  actions: {
    register() {
      this.loading = true
      return new Promise((resolve, reject) => {
        api
          .post('/regis/register', this.form)
          .then((response) => {
            console.log(response)
            if (response.status === 200) {
              notifSuccess('Data berhasil disimpan')
              resolve(response.data)
            } else {
              notifError(`Gagal, status: ${response.status}`)
              reject(response)
            }
            this.loading = false
          })
          .catch((error) => {
            notifError('Data Gagal Disimpan')
            this.loading = false
            reject(error)
          })
      })
    },
  },
})
