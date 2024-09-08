<template>
  <div>
    <nav>
      <router-link to="/student/myCourses">My Courses</router-link>
      <router-link to="/allCourses">All Courses</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script setup>
// No specific script needed for this component
</script>

<style scoped>
nav {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background-color: #f5f5f5;
}
nav a {
  text-decoration: none;
  color: #333;
}
nav a.router-link-exact-active {
  font-weight: bold;
}
</style>
