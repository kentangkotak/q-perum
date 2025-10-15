const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      { path: '', component: () => import('pages/dasboard/IndexPage.vue') },
      {
        path: 'master',
        children: [
          {
            path: 'anggota',
            component: () => import('pages/master/anggota/IndexPage.vue'),
            meta: { requiresAuth: true },
          },
          {
            path: 'kas',
            component: () => import('pages/master/kas/IndexPage.vue'),
            meta: { requiresAuth: true },
          },
        ],
      },
      {
        path: 'transaksi',
        children: [
          {
            path: 'pembayaraniuran',
            component: () => import('pages/transaksi/pembayaraniuran/IndexPage.vue'),
            meta: { requiresAuth: true },
          },
          // {
          //   path: 'kas',
          //   component: () => import('pages/master/kas/IndexPage.vue'),
          //   meta: { requiresAuth: true },
          // },
        ],
      },
      {
        path: 'laporan',
        children: [
          {
            path: 'laporansudahbayariuran',
            component: () => import('pages/laporan/sudahbayariuran/IndexPage.vue'),
            meta: { requiresAuth: true },
          },
          // {
          //   path: 'kas',
          //   component: () => import('pages/master/kas/IndexPage.vue'),
          //   meta: { requiresAuth: true },
          // },
        ],
      },
      {
        path: 'logout',
        component: () => import('src/pages/LogoutPage.vue'),
      },
    ],
  },

  {
    path: '/awal',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: 'login', component: () => import('pages/LoginPage.vue') },
      { path: 'register', component: () => import('pages/ChatTest.vue') },
    ],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
