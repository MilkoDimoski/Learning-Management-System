<template>
  <div class="container">
    <h2 class="title">Edit User</h2>
    <form @submit.prevent="handleSubmit" class="user-form">
      <div class="form-group">
        <label for="first_name">First Name:</label>
        <input v-model="form.first_name" id="first_name" type="text" required class="input-field" />
      </div>
      <div class="form-group">
        <label for="last_name">Last Name:</label>
        <input v-model="form.last_name" id="last_name" type="text" required class="input-field" />
      </div>
      <div class="form-group">
        <label for="userName">Username:</label>
        <input v-model="form.userName" id="userName" type="text" required class="input-field" />
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input v-model="form.email" id="email" type="email" required class="input-field" />
      </div>
      <div class="form-group">
        <label for="role">Role:</label>
        <select v-model="form.role" id="role" required class="input-field">
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <div class="form-group">
        <label for="bio">Bio:</label>
        <textarea v-model="form.bio" id="bio" class="input-field"></textarea>
      </div>
      <div class="form-group">
        <label for="dob">Date of Birth:</label>
        <input v-model="form.date_of_birth" id="dob" type="date" class="input-field" />
      </div>
      <div class="form-group">
        <label for="phone_number">Phone Number:</label>
        <input v-model="form.phone_number" id="phone_number" type="text" class="input-field" />
      </div>
      <button type="submit" class="submit-button">Update User</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex';

const form = ref({
  first_name: '',
  last_name: '',
  userName: '',
  email: '',
  role: '',
  bio: '',
  date_of_birth: '',
  phone_number: ''
});

const store = useStore();
const router = useRouter();
const route = useRoute();

const userId = route.params.id;

onMounted(async () => {
  try {
    const user = await store.dispatch('getUser', userId);
    form.value.first_name = user.first_name;
    form.value.last_name = user.last_name;
    form.value.userName = user.userName;
    form.value.email = user.email;
    form.value.role = user.role;
    form.value.bio = user.bio;
    form.value.date_of_birth = user.date_of_birth;
    form.value.phone_number = user.phone_number;
  } catch (error) {
    console.error('Failed to load user data:', error);
  }
});

const handleSubmit = async () => {
  try {
    const updatedUserData = {
      first_name: form.value.first_name,
      last_name: form.value.last_name,
      userName: form.value.userName,
      email: form.value.email,
      role: form.value.role,
      bio: form.value.bio,
      date_of_birth: form.value.date_of_birth,
      phone_number: form.value.phone_number
    };

    await store.dispatch('editUser', { userId, userData: updatedUserData });
    router.push('/users');
  } catch (error) {
    console.error('Failed to update user:', error);
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');

* {
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
  margin: 0;
  padding: 0;
}

/* Container */
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  padding: 20px;
  margin-top: 100px;
  background: linear-gradient(135deg, #f7f8fa, #ececec);
}

/* Title */
.title {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 30px;
  text-align: center;
  font-weight: 600;
  letter-spacing: 1.5px;
}

/* Form Styles */
.user-form {
  width: 100%;
  max-width: 600px;
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

/* Form Group */
.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  font-size: 1rem;
  font-weight: 500;
  color: #333;
  margin-bottom: 8px;
}

.input-field {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  color: #555;
  transition: border-color 0.3s ease;
}

.input-field:focus {
  border-color: #6c63ff;
  outline: none;
}

/* Button */
.submit-button {
  display: block;
  width: 100%;
  padding: 12px;
  font-size: 1rem;
  background-color: #6c63ff;
  color: #fff;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-weight: 600;
  margin-top: 20px;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.submit-button:hover {
  background-color: #4b47ff;
  transform: scale(1.05);
}

/* Responsive */
@media (max-width: 768px) {
  .user-form {
    padding: 15px;
  }

  .submit-button {
    font-size: 0.875rem;
  }
}
</style>
