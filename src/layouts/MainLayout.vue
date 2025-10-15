<template>
  <q-layout view="hHh LpR fFf">
    <q-header elevated class="bg-dark text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          Perum Bengawan Indah
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-drawer v-model="leftDrawerOpen" side="left" overlay elevated>
      <div class="q-pa-sm q-mb-xs flex items-center bg-grey-9 text-white rounded-lg shadow-sm">
        <q-icon name="menu" size="sm" class="q-mr-sm text-white" />
        <div class="text-subtitle2 text-weight-bold">Menu</div>
      </div>

      <q-separator color="white" inset />

      <q-list padding>
        <template v-for="(item, index) in menuItems" :key="index">
          <!-- jika punya children -->
          <q-expansion-item
            v-if="item.children && item.children.length"
            :icon="item.icon"
            :label="item.label"
            expand-separator
          >
            <q-item
              v-for="(child, idx) in item.children"
              :key="idx"
              clickable
              v-ripple
              :to="child.to"
              active-class=" bg-blue-grey text-white"
              exact
              class="q-ml-md"
            >
              <q-item-section avatar>
                <q-icon :name="child.icon" />
              </q-item-section>
              <q-item-section>{{ child.label }}</q-item-section>
            </q-item>
          </q-expansion-item>

          <!-- jika tidak punya children -->
          <q-item
            v-else
            clickable
            v-ripple
            :to="item.to"
            active-class="bg-blue-grey text-white"
            exact
          >
            <q-item-section avatar>
              <q-icon :name="item.icon" />
            </q-item-section>
            <q-item-section>{{ item.label }}</q-item-section>
          </q-item>
        </template>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useAutoLogout } from 'src/boot/autologout'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const leftDrawerOpen = ref(false)
const menuItems = ref([])

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

const router = useRouter()
useAutoLogout(router)

// Ambil data dari localStorage saat layout dimuat
onMounted(() => {
  const storedMenu = localStorage.getItem('menus')
  if (storedMenu) {
    try {
      menuItems.value = JSON.parse(storedMenu)
      // console.log('menuItems', menuItems.value)
    } catch (e) {
      console.error('Gagal parse menu dari localStorage', e)
    }
  }
})
</script>
