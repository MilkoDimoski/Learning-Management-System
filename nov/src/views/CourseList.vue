<template>
  <div class="container">
    <header class="header">
      <h1 class="title">Course Explorer</h1>
      <input type="text" v-model="searchTerm" placeholder="Search for courses..." class="search-bar" />
      <button @click="addNewCourse" class="action-button add-course-button">
        <i class="icon icon-add"></i> Add New Course
      </button>
    </header>
    <section class="course-section">
      <ul class="course-list">
        <li v-for="course in filteredCourses" :key="course.id" class="course-card">
          <img :src="course.image || defaultImage" alt="Course Image" class="course-image" />
          <div class="course-info">
            <h3 class="course-title">{{ course.title }}</h3>
            <p class="course-id">Course ID: {{ course.id }}</p>
          </div>
          <div class="course-actions">
            <button @click="enrollInCourse(course)" class="action-button enroll-button">
              <i class="icon icon-enroll"></i> Enroll
            </button>
            <button @click="viewLessons(course.id)" class="action-button view-lessons-button">
              <i class="icon icon-view"></i> View Lessons
            </button>
            <button @click="editCourse(course.id)" class="action-button edit-button">
              <i class="icon icon-edit"></i> Edit
            </button>
<!--            <button @click="removeCourse(course.id)" class="action-button delete-button">-->
<!--              <i class="icon icon-delete"></i> Delete-->

<!--            </button>-->
            <button @click="showConfirmModal(course.id)" class="action-button delete-button">
              <i class="icon icon-delete"></i> Delete
            </button>
          </div>
        </li>
      </ul>
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
import { computed, onMounted, ref, watch } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import ConfirmationModal from './ConfirmationModal.vue';
const modalVisible = ref(false);
const courseToDelete = ref(null);
// Access the Vuex store and router
const store = useStore();
const router = useRouter();

// Declare reactive properties
const searchTerm = ref('');
const defaultImage = 'path/to/default-image.jpg'; // Replace with actual default image path

// Fetch the list of courses and the current user when the component is mounted
onMounted(() => {
  store.dispatch('fetchCourses');
  store.dispatch('fetchCurrentUser'); // Fetch current user
});

// Define computed properties for the courses and current user
const courses = computed(() => store.state.courses);
const currentUser = computed(() => store.state.users.currentUser);
const currentUserRole = computed(() => currentUser.value ? currentUser.value.role : null);
console.log(currentUser, "asdasd");
console.log(courses);
// Filter courses based on the search term
const filteredCourses = computed(() => {
  const term = searchTerm.value.toLowerCase();
  return courses.value.filter(course =>
      course.title.toLowerCase().includes(term)
  );
});

// Define methods for navigating and managing courses
const viewLessons = (courseId) => {
  router.push({name: 'CourseLessons', params: {id: courseId}});
};

const editCourse = (courseId) => {
  router.push({name: 'CourseEditForm', params: {id: courseId}});
};

const removeCourse = async (courseId) => {
  try {
    await store.dispatch('removeCourse', courseId);
  } catch (error) {
    console.error('Error deleting course:', error);
  }
};

// Method for enrolling in a course
const enrollInCourse = async (course) => {
  try {
    await store.dispatch('enrollInCourse', course);
    router.push({name: 'EnrolledCourses'});
  } catch (error) {
    console.error('Error enrolling in course:', error);
  }
};

// Method for adding a new course
const addNewCourse = () => {
  router.push({ name: 'CourseAddForm' });
};

// Computed property to determine if the current user is a teacher
const isTeacher = computed(() => currentUserRole.value === 'teacher');

// Watch for changes in the current user to log updates
watch(currentUser, (newValue) => {
  if (newValue) {
    console.log('Current user (watched):', newValue);
    console.log('Updated role:', newValue.role);
  } else {
    console.log('Current user is null');
  }
});
const showConfirmModal = (courseId) => {
  courseToDelete.value = courseId;
  modalVisible.value = true;
};

const confirmDeletion = async () => {
  if (courseToDelete.value) {
    try {
      await store.dispatch('removeCourse', courseToDelete.value);
    } catch (error) {
      console.error('Error deleting course:', error);
    } finally {
      modalVisible.value = false;
    }
  }
};

const cancelDeletion = () => {
  modalVisible.value = false;
};
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');

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

.search-bar {
  width: 100%;
  max-width: 600px;
  padding: 12px 20px;
  font-size: 18px;
  border: 2px solid #4a5568;
  border-radius: 30px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  outline: none;
  transition: border-color 0.3s ease;
}

.search-bar:focus {
  border-color: #d53f8c;
}

.search-bar::placeholder {
  color: #888;
}

/* Course Section Styles */
.course-section {
  padding: 20px;
}

.course-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.course-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 300px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;
}

.course-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
}

.course-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 15px;
}

.course-info {
  padding: 10px 0;
}

.course-title {
  font-size: 1.5rem;
  color: #2d3748;
  margin: 0;
  font-weight: 600;
}

.course-id {
  color: #4a5568;
  font-size: 0.9rem;
}

/* Course Actions Styles */
.course-actions {
  display: flex;
  gap: 10px;
  justify-content: space-between; /* Better positioning for buttons */
  flex-wrap: wrap;
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
}

.action-button i {
  margin-right: 8px;
  font-size: 16px;
}

.enroll-button {
  background: linear-gradient(90deg, #c33f80, #c64574);
}

.enroll-button:hover {
  background: linear-gradient(90deg, #33bfa6, #048e85);
  transform: scale(1.05);
}

.view-lessons-button {
  background: linear-gradient(90deg, #c33f80, #c64574);
}

.view-lessons-button:hover {
  background: linear-gradient(90deg, #33bfa6, #048e85);
  transform: scale(1.05);
}

.edit-button {
  background: linear-gradient(90deg, #c33f80, #c64574);
}

.edit-button:hover {
  background: linear-gradient(90deg, #33bfa6, #048e85);
  transform: scale(1.05);
}

.delete-button {
  background: linear-gradient(90deg, #c33f80, #c64574);
}

.delete-button:hover {
  background: linear-gradient(90deg, #b12f47, #981b1b);
  transform: scale(1.05);
}
.add-course-button {
  background: linear-gradient(90deg, #b12f47, #981b1b);
  padding: 10px 20px;
  border-radius: 25px;
  color: #fff;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;
}

.add-course-button:hover {
  background: linear-gradient(90deg, #c33f80, #c64574);
  transform: scale(1.05);
}

.icon-add::before { content: '\f055'; } /* FontAwesome plus icon */
/* FontAwesome Icons */
.icon {
  font-family: 'Font Awesome 5 Free';
  font-weight: 900;
}

.icon-enroll::before { content: '\f02c'; }
.icon-view::before { content: '\f06e'; }
.icon-edit::before { content: '\f040'; }
.icon-delete::before { content: '\f1f8'; }

/* Responsive Design */
@media (max-width: 768px) {
  .course-card {
    width: 100%;
  }

  .action-button {
    font-size: 12px;
    padding: 8px 16px;
  }
}

@media (max-width: 576px) {
  .search-bar {
    font-size: 16px;
  }

  .title {
    font-size: 2.5rem;
  }
}


</style>
