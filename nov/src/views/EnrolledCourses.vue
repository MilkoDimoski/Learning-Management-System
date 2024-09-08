<template>
  <div>
    <h2>Enrolled Courses</h2>
    <ul>
      <li v-for="course in enrolledCourses" :key="course.id">
        <h3>{{ course.title }}</h3>
      </li>
    </ul>
  </div>
</template>

<script setup>
import {computed, onMounted} from 'vue';
import {useStore} from 'vuex';

const store = useStore();

const enrolledCourses = computed(() => store.getters.enrolledCourses);

onMounted(() => {
  console.log('Fetching enrolled courses'); // Debugging line
  store.dispatch('fetchEnrolledCourses');
});
</script>
