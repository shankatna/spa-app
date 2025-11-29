<template>
  <div>
    <h1>Vue + FastAPI + Auth0</h1>

    <!-- LOGIN / LOGOUT -->
    <div v-if="!isAuthenticated">
      <button @click="login">Login</button>
    </div>

    <div v-else>
      <p>Welcome {{ user?.name }}</p>
      <button @click="logout">Logout</button>
    </div>

    <!-- CALL BACKEND -->
    <button @click="callApi">Call Protected FastAPI API</button>

    <p v-if="apiMessage">{{ apiMessage }}</p>
    <p v-if="response">{{ response }}</p>
  </div>
</template>

<script lang="ts">
import { getAuth0 } from './auth0'

interface User {
  name: string;
  email: string;
}

export default {
  data() {
    return {
      isAuthenticated: false,
      user: null as User | null,
      apiMessage: "",
      response: null as string | null,
    }
  },

  async created() {
    const auth0 = getAuth0()

    this.isAuthenticated = await auth0.isAuthenticated()
    if (this.isAuthenticated) {
      this.user = await auth0.getUser()
    }
  },

  methods: {
    login() {
      const auth0 = getAuth0()
      auth0.loginWithRedirect()
    },

    logout() {
      const auth0 = getAuth0()
      auth0.logout({ logoutParams: { returnTo: "http://localhost:5173" } })
    },

    async callApi() {
      const auth0 = getAuth0()
      const token = await auth0.getTokenSilently()

      const response = await fetch("http://localhost:8000/protected", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await response.json()
      this.apiMessage = JSON.stringify(data)

      // Clear message after displaying
      this.apiMessage = "";
    },

    async callBackend() {
      try {
        const res = await fetch("http://localhost:8000/api/hello");
        const data = await res.json();
        this.response = data.message;
      } catch (err) {
        console.error("Error calling backend:", err);
        this.response = "Error occurred while calling backend.";
      }
    },
  }
}
</script>
