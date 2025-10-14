<template>
  <q-page class="flex flex-center bg-dark">
    <q-form @submit="onSubmit">
      <div class="ring">
        <i style="--clr: #36d1dc"></i>
        <i style="--clr: #ff0057"></i>
        <i style="--clr: #fffd44"></i>

        <div class="register">
          <h2 class="text-weight-bold text-center">Pendaftaran Anggota Perum BI</h2>

          <div class="inputBx">
            <q-input
              v-model="store.form.name"
              outlined
              rounded
              placeholder="Nama Lengkap Kepala Keluarga"
              class="white-border"
              dense
              required
            />
          </div>

          <div class="inputBx">
            <q-input
              v-model="store.form.username"
              outlined
              rounded
              placeholder="Username Untuk Login"
              class="white-border"
              dense
              required
              @update:model-value="(val) => (store.form.username = val.replace(/\s/g, ''))"
            />
          </div>

          <div class="inputBx">
            <q-input
              v-model="store.form.password"
              type="password"
              outlined
              rounded
              placeholder="Password"
              class="white-border"
              dense
              required
            />
          </div>

          <div class="inputBx">
            <q-input
              v-model="store.form.confirm"
              type="password"
              outlined
              rounded
              placeholder="Ulangi Password"
              class="white-border"
              dense
              required
            />
          </div>

          <div class="inputBx">
            <q-btn
              type="submit"
              label="Create Account"
              color="primary"
              rounded
              unelevated
              class="full-width gradient-btn"
              :loading="store.loading"
            />
          </div>

          <div class="text-white text-center">
            Sudah punya akun?
            <router-link to="/awal/login"><span class="text-red">Login</span></router-link>
          </div>
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script setup>
import { Notify } from 'quasar'
import { useRegisterStore } from 'src/stores/master/register'

const store = useRegisterStore()

function onSubmit() {
  if (store.form.username.includes(' ')) {
    Notify.create({
      message: 'Username tidak boleh mengandung spasi!',
      color: 'negative',
      position: 'top',
    })
    return
  } else if (store.form.password !== store.form.confirm) {
    Notify.create({
      message: 'Password dan Konfirmasi tidak cocok!',
      color: 'negative',
      position: 'top',
    })
    return
  } else {
    store.register()
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Quicksand', sans-serif;
}
.bg-dark {
  background: #111;
}
.ring {
  position: relative;
  width: 500px;
  height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.ring i {
  position: absolute;
  inset: 0;
  border: 2px solid #fff;
  transition: 0.5s;
}
.ring i:nth-child(1) {
  border-radius: 38% 62% 63% 37% / 41% 44% 56% 59%;
  animation: animate 6s linear infinite;
}
.ring i:nth-child(2) {
  border-radius: 41% 44% 56% 59%/38% 62% 63% 37%;
  animation: animate 4s linear infinite;
}
.ring i:nth-child(3) {
  border-radius: 41% 44% 56% 59%/38% 62% 63% 37%;
  animation: animate2 10s linear infinite;
}
.ring:hover i {
  border: 6px solid var(--clr);
  filter: drop-shadow(0 0 20px var(--clr));
}
@keyframes animate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes animate2 {
  0% {
    transform: rotate(360deg);
  }
  100% {
    transform: rotate(0deg);
  }
}
.register {
  position: absolute;
  width: 320px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
}
.register h2 {
  font-size: 2em;
  color: #fff;
}
.inputBx {
  width: 100%;
}

/* custom border putih untuk q-input */
:deep(.white-border .q-field__control) {
  border: 2px solid white !important;
  border-radius: 40px;
  background: transparent;
}
:deep(.white-border .q-field__native) {
  color: white !important;
}
:deep(.white-border input::placeholder) {
  color: rgba(255, 255, 255, 0.75) !important;
}

/* button gradient */
.gradient-btn {
  background: linear-gradient(45deg, #36d1dc, #5b86e5);
  color: white;
}
</style>
