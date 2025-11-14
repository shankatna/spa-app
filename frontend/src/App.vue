<template>
  <div class="home">
    <h1>Vue.js + FastAPI Example</h1>

    <button @click="callBackend">Call Python Backend</button>

    <p v-if="response">Backend says: {{ response }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      response: null,
    };
  },
  methods: {
    async callBackend() {
      try {
        const res = await fetch("http://localhost:8000/api/hello");
        const data = await res.json();
        this.response = data.message;
      } catch (err) {
        console.error(err);
      }
    },
  },
};
</script>
