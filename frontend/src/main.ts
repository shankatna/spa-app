import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { initAuth0 } from './auth0'

async function bootstrap() {
    try {
        await initAuth0()
        const app = createApp(App)
        app.use(router)
        app.mount('#app')
    } catch (error) {
        console.error("Failed to initialize Auth0", error);
    }
}

bootstrap()


