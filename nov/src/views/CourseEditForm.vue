<template>
  <div class="container">
    <h1 class="form-title">{{ isEditing ? 'Edit Course' : 'Add Course' }}</h1>
    <form @submit.prevent="submitForm" class="course-form">
      <label for="title" class="form-label">Title:</label>
      <input type="text" v-model="course.title" id="title" class="form-input" required />

      <label for="description" class="form-label">Description:</label>
      <textarea v-model="course.description" id="description" class="form-input" required></textarea>

      <div class="button-group">
        <button type="submit" class="action-button submit-button">
          {{ isEditing ? 'Update' : 'Add' }} Course
        </button>
        <button type="button" @click="cancelForm" class="action-button cancel-button">Cancel</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';

const store = useStore();
const route = useRoute();
const router = useRouter();
const isEditing = computed(() => !!route.params.id);
const course = ref({
  title: '',
  description: '',
});

onMounted(async () => {
  if (isEditing.value) {
    await fetchCourse();
  }
});

const fetchCourse = async () => {
  const courseId = route.params.id;
  try {
    const courseData = await store.dispatch('getCourse', courseId);
    course.value = courseData;
  } catch (error) {
    console.error('Failed to fetch course:', error);
  }
};

const submitForm = async () => {
  const courseData = {
    ...course.value,
  };

  try {
    if (isEditing.value) {
      await store.dispatch('editCourse', courseData);
    } else {
      await store.dispatch('createCourse', courseData);
    }
    router.push('/allCourses');
  } catch (error) {
    console.error('Failed to submit form:', error);
  }
};

const cancelForm = () => {
  router.push('/allCourses');
};
</script>

<style>
/* General Form Styles */
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background: linear-gradient(135deg, #f3f4f6, #e2e2e2);
}

.form-title {
  font-size: 2rem;
  color: #2d3748;
  margin-bottom: 20px;
  text-align: center;
}

.course-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 500px;
  background: #fff;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.form-label {
  font-size: 1.2rem;
  color: #4a5568;
}

.form-input {
  padding: 12px 15px;
  border: 1px solid #cbd5e0;
  border-radius: 8px;
  font-size: 1rem;
  width: 100%;
  box-sizing: border-box;
  transition: border-color 0.3s ease;
}

.form-input:focus {
  border-color: #c33f80;
  outline: none;
}

.button-group {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.action-button {
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}

.submit-button {
  background: linear-gradient(90deg, #c33f80, #c64574);
}

.submit-button:hover {
  background: linear-gradient(90deg, #bd2b4f, #951230);
  transform: scale(1.05);
}

.cancel-button {
  background: #718096;
}

.cancel-button:hover {
  background: #4a5568;
  transform: scale(1.05);
}

/* Responsive Design */
@media (max-width: 768px) {
  .course-form {
    width: 90%;
  }

  .action-button {
    font-size: 14px;
    padding: 8px 16px;
  }
}

@media (max-width: 576px) {
  .form-title {
    font-size: 1.8rem;
  }

  .form-label {
    font-size: 1rem;
  }
}
</style>
