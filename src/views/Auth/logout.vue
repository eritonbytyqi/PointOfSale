<template>
  <div>
    <h1>Logging out...</h1>
  </div>
</template>

<script>
export default {
  name: 'Logout',
  mounted() {
    this.logoutUser(); // Thirr funksionin kur komponenti ngarkon
  },
  methods: {
    logoutUser() {
      localStorage.removeItem('token');

      this.$router.push({ name: 'landing' });
    }
  }
}
</script>
