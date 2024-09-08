<template>
  <div class="container">
    <header class="header">

      <h1 class="course-title">{{ course.title || 'Loading...' }}</h1>
      <p class="course-description">{{ course.description || 'No description available.' }}</p>
    </header>
    <section class="lessons-section" v-if="lessons?.length">
      <h2 class="lessons-title">Lessons</h2>
      <ul class="lessons-list">
        <li v-for="lesson in lessons" :key="lesson.id" class="lesson-item">
          {{ lesson.title }}
        </li>
      </ul>
      <router-link :to="`/course/${course.id}/lessons/add`" class="action-button add-lesson-button">
        Add Lesson
      </router-link>
    </section>
    <button @click="goToCourseList" class="action-button back-to-list-button">
      Back to Course List
    </button>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';

const store = useStore();
const route = useRoute();
const router = useRouter();
const courseId = parseInt(route.params.id);

const course = computed(() => {
  return store.state.courses.find(course => course.id === courseId) || {};
});

const lessons = computed(() => {
  const course = store.state.courses.find(course => course.id === courseId);
  return course ? course.lessons : [];
});

onMounted(async () => {
  await store.dispatch('fetchCourses');
  if (courseId) {
    await store.dispatch('fetchLessons', courseId);
  }
});

function goToCourseList() {
  router.push({ name: 'CourseList' });
}
</script>

<style>
/* General Styles */
body {
  font-family: 'Roboto', sans-serif;
  line-height: 1.6;
  color: #333;
  background: linear-gradient(135deg, #f3f4f6, #e2e2e2);
  margin: 0;
  padding: 0;
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-image: url('/src/images/sign-up-bg.jpg');
  background-size: cover;
}

/* Header Styles */
.header {
  text-align: center;
  margin-bottom: 40px;
}

.course-title {
  font-size: 3.5em;
  color: #2d3748;
  margin-bottom: 20px;
  font-weight: 700;
}

.course-description {
  font-size: 1.2rem;
  color: #4a5568;
  margin-bottom: 20px;
}

.action-button {
  padding: 10px 20px;
  font-size: 14px;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  color: #fff;
  transition: background-color 0.3s ease, transform 0.3s ease;
  display: flex;
  align-items: center;
  text-decoration: none;
}

.action-button i {
  margin-right: 8px;
  font-size: 16px;
}

.back-to-list-button {
  background: linear-gradient(90deg, #c33f80, #c64574);
}

.back-to-list-button:hover {
  background: linear-gradient(90deg, #bd2b4f, #951230);
  transform: scale(1.05);
}

/* Lessons Section Styles */
.lessons-section {
  padding: 20px;
  text-align: center;
}

.lessons-title {
  font-size: 2rem;
  color: #2d3748;
  margin-bottom: 20px;
}

.lessons-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
}

.lesson-item {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  padding: 15px;
  width: 80%;
  max-width: 600px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;
}

.lesson-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
}

.add-lesson-button {
  display: inline-block;
  margin-top: 20px;
  background: linear-gradient(90deg, #c33f80, #c64574);
}

.add-lesson-button:hover {
  background: linear-gradient(90deg, #bd2b4f, #951230);
  transform: scale(1.05);
}

/* Responsive Design */
@media (max-width: 768px) {
  .lesson-item {
    width: 100%;
  }

  .action-button {
    font-size: 12px;
    padding: 8px 16px;
  }
}

@media (max-width: 576px) {
  .course-title {
    font-size: 2rem;
  }

  .course-description {
    font-size: 1rem;
  }

  .action-button {
    font-size: 12px;
  }
}
</style>
