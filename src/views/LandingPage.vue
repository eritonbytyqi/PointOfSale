
<template>
  <div>
    <Navbar />
    <HomeSection />
    <AboutSection />
    <DepartmentsSection />
    <BlogSection />
    <DoctorsSection />
    <ContactSection />
    <FooterSection />
  </div>
</template>

<script>
import Navbar from "@/components/Landing/Navbar.vue";
import HomeSection from "@/components/Landing/HomeSection.vue";
import AboutSection from "@/components/Landing/AboutSection.vue";
import DepartmentsSection from "@/components/Landing/DepartmentsSection.vue";
import BlogSection from "@/components/Landing/BlogSection.vue";
import DoctorsSection from "@/components/Landing/DoctorsSection.vue";
import ContactSection from "@/components/Landing/ContactSection.vue";
import FooterSection from "@/components/Landing/FooterSection.vue";

export default {
  components: {
    Navbar,
    HomeSection,
    AboutSection,
    DepartmentsSection,
    BlogSection,
    DoctorsSection,
    ContactSection,
    FooterSection,
  },
};
</script>