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
      // Mund të bësh gjithashtu ndonjë logjikë për largimin si fshirja e tokenit ose statusit të përdoruesit
      localStorage.removeItem('token'); // Ose ndonjë operacion tjetër për daljen

      // Pasi të bësh daljen, bëj redirect në /landing
      this.$router.push({ name: 'landing' });
    }
  }
}
</script>
