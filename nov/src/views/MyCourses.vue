<template>
  <div>
    <h2>My Courses</h2>
    <ul>
      <li v-for="course in myCourses" :key="course.id">
<!--        ovde se enrolled courses -->
        <!-- Link to the CourseDetail page using the course ID -->
        <router-link :to="{ name: 'CourseDetails', params: { id: course.id }}">{{ course.title }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const myCourses = computed(() => {
  // Assuming `currentUser` has enrolled courses
  const currentUser = store.getters.currentUser;
  return store.getters.getCoursesByUserId(currentUser.id) ;
});
</script>
<style scoped>
/* Add your styles here */
</style>
