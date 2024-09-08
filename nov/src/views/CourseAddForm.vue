<template>
  <div class="container">
    <h1 class="form-title">Add Course</h1>
    <form @submit.prevent="handleSubmit" class="course-form">
      <div class="form-group">
        <label for="title" class="form-label">Title:</label>
        <input v-model="form.title" id="title" type="text" class="form-input" required />
      </div>

      <div class="form-group">
        <label for="description" class="form-label">Description:</label>
        <textarea v-model="form.description" id="description" class="form-input"></textarea>
      </div>

      <!-- Teachers Select -->
      <div class="form-group">
        <label for="teachers" class="form-label">Teachers:</label>
        <select v-model="form.teachers" id="teachers" class="form-input" multiple>
          <option v-for="teacher in teachers" :key="teacher.id" :value="teacher.id">
            {{ teacher.first_name }} {{ teacher.last_name }} (ID:{{ teacher.id }})
          </option>
        </select>
      </div>

      <!-- Debug selected teachers -->
      <div v-if="form.teachers.length > 0">
        <h4 class="form-label">Selected Teachers:</h4>
        <ul>
          <li v-for="teacherId in form.teachers" :key="teacherId" class="form-label">
            Teacher ID: {{ teacherId }}
          </li>
        </ul>
      </div>

      <!-- Students Select -->
      <div class="form-group">
        <label for="students" class="form-label">Students:</label>
        <select v-model="form.students" id="students" class="form-input" multiple>
          <option v-for="student in students" :key="student.id" :value="student.id">
            {{ student.first_name }} {{ student.last_name }} (ID: {{ student.id }})
          </option>
        </select>
      </div>

      <!-- Debug selected students -->
      <div v-if="form.students.length > 0">
        <h4 class="form-label">Selected Students:</h4>
        <ul>
          <li v-for="studentId in form.students" :key="studentId" class="form-label">
            Student ID: {{ studentId }}
          </li>
        </ul>
      </div>

      <!-- Thumbnail Upload -->
      <div class="form-group">
        <label for="thumbnail" class="form-label">Profile Image:</label>
        <input @change="handleImageUpload" id="thumbnail" type="file" class="form-input" />
      </div>

      <button type="submit" class="action-button submit-button">Add Course</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import axios from "axios";
import router from "@/router/index.js";

const form = ref({
  title: '',
  description: '',
  teachers: [],
  students: [],
  thumbnail: null,
});

const store = useStore();
const students = ref([]);
const teachers = ref([]);

onMounted(async () => {
  const response = await axios.get('http://localhost:8000/api/users/');
  teachers.value = response.data.filter(user => user.role === 'teacher');
  students.value = response.data.filter(user => user.role === 'student');
});

const handleImageUpload = (event) => {
  form.value.thumbnail = event.target.files[0];
};

const handleSubmit = async () => {
  const courseData = new FormData();
  courseData.append('title', form.value.title);
  courseData.append('description', form.value.description);
  courseData.append('teachers', form.value.teachers.join(','));
  courseData.append('students', form.value.students.join(','));

  if (form.value.thumbnail) {
    courseData.append('thumbnail', form.value.thumbnail);
  }

  try {
    await store.dispatch('createCourse', courseData);
    router.push('/allCourses');
  } catch (error) {
    console.error('Failed to create course:', error.response ? error.response.data : error.message);
  }
};
</script>

<style scoped>
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

.form-group {
  display: flex;
  flex-direction: column;
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

.action-button {
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  color: #fff;
  background: linear-gradient(90deg, #c33f80, #c64574);
  transition: background-color 0.3s ease, transform 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
}

.action-button:hover {
  background: linear-gradient(90deg, #bd2b4f, #951230);
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
