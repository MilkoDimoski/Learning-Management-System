<template>
  <div class="container">
    <header class="header">
      <h1 class="title">Course Lessons</h1>
    </header>

    <section class="lessons-section">
      <ul class="lessons-list">
        <li v-for="lesson in lessons" :key="lesson.id" class="lesson-item">
          <span class="lesson-title">{{ lesson.title }}</span>
          <span class="lesson-id">{{ lesson.id }}</span>
          <div class="lesson-actions">
            <button @click="editLesson(lesson)" class="action-button edit-lesson-button">
              Edit
            </button>
            <button @click="showConfirmModal(lesson.id)" class="action-button delete-lesson-button">
              Delete
            </button>
          </div>
        </li>
      </ul>

      <div class="button-group">
        <button @click="goToCourseDetails" class="action-button go-to-course-button">
          Go to Course Details
        </button>
        <button @click="addLesson" class="action-button add-lesson-button">
          Add New Lesson
        </button>
      </div>

      <p v-if="!lessons.length" class="loading-text">Loading lessons...</p>
    </section>

    <ConfirmationModal
        v-if="modalVisible"
        :visible="modalVisible"
        @confirm="confirmDeletion"
        @cancel="cancelDeletion"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import ConfirmationModal from './ConfirmationModal.vue';

const store = useStore();
const route = useRoute();
const router = useRouter();

const lessons = computed(() => store.getters.getLessonsByCourseId(route.params.id));

const modalVisible = ref(false);
const lessonToDelete = ref(null);

onMounted(async () => {
  const courseId = route.params.id;
  try {
    await store.dispatch('fetchLessons', courseId);
  } catch (error) {
    console.error('Error loading lessons:', error);
  }
});

const showConfirmModal = (lessonId) => {
  lessonToDelete.value = lessonId;
  modalVisible.value = true;
};

const confirmDeletion = async () => {
  if (lessonToDelete.value) {
    try {
      await store.dispatch('deleteLesson', lessonToDelete.value);
    } catch (error) {
      console.error('Error deleting lesson:', error);
    } finally {
      modalVisible.value = false;
    }
  }
};

const cancelDeletion = () => {
  modalVisible.value = false;
};

const editLesson = (lesson) => {
  router.push({ name: 'LessonEditForm', params: { id: lesson.id, courseId: route.params.id } });
};

const goToCourseDetails = () => {
  const courseId = route.params.id;
  router.push({ name: 'CourseDetails', params: { id: courseId } });
};

const addLesson = () => {
  const courseId = route.params.id;
  router.push({ name: 'AddLesson', params: { courseId } });
};
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
  height: 100vh; /* Full viewport height */
  width: 100vw; /* Full viewport width */
  background-image: url('/src/images/sign-up-bg.jpg');
  background-size: cover; /* Changed to cover for better scaling */
}

/* Header Styles */
.header {
  text-align: center;
  margin-bottom: 40px;
}

.title {
  font-size: 3rem;
  color: #2d3748;
  margin-bottom: 10px;
  font-weight: 700;
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

.go-to-course-button {
  background: linear-gradient(90deg, #c33f80, #c64574);
}

.go-to-course-button:hover {
  background: linear-gradient(90deg, #bd2b4f, #951230);
  transform: scale(1.05);
}

.add-lesson-button {
  background: linear-gradient(90deg, #4caf50, #66bb6a);
}

.add-lesson-button:hover {
  background: linear-gradient(90deg, #43a047, #388e3c);
  transform: scale(1.05);
}

.button-group {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-top: 20px;
}

/* Lessons Section Styles */
.lessons-section {
  padding: 20px;
}

.lessons-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
}

.lesson-item {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 400px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.lesson-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
}

.lesson-title {
  font-size: 1.25rem;
  color: #2d3748;
  font-weight: 600;
}

.lesson-id {
  color: #4a5568;
  font-size: 0.9rem;
}

.lesson-actions {
  display: flex;
  gap: 10px;
}

.edit-lesson-button {
  background: linear-gradient(90deg, #c33f80, #c64574);
}

.edit-lesson-button:hover {
  background: linear-gradient(90deg, #bd2b4f, #951230);
  transform: scale(1.05);
}

.delete-lesson-button {
  background: linear-gradient(90deg, #c33f80, #c64574);
}

.delete-lesson-button:hover {
  background: linear-gradient(90deg, #b12f47, #981b1b);
  transform: scale(1.05);
}

.loading-text {
  font-size: 1.2rem;
  color: #4a5568;
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
  .title {
    font-size: 2.5rem;
  }

  .action-button {
    font-size: 12px;
  }
}
</style>
