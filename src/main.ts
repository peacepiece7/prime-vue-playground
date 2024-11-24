import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { router } from './router'
import primeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'

createApp(App)
  .use(router)
  .use(primeVue, {
    theme: {
      preset: Aura,
    },
  })
  .mount('#app')
