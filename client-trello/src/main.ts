import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style/index.scss'
import './style/tailwind.css'
const app = createApp(App)
app.use(router)
app.directive('atuofocus', {
  mounted (el) {
    el.focus()
  }
})
app.mount('#app')
