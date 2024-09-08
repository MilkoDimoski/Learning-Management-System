<template>
  <div class="container">
    <form @submit.prevent="handleSubmit">
      <h2 class="form-title">Add User</h2>
      <div class="input-field">
        <input v-model="form.first_name" id="first_name" type="text" required/>
        <label for="first_name">First Name:</label>
      </div>
      <div class="input-field">
        <input v-model="form.last_name" id="last_name" type="text" required/>
        <label for="last_name">Last Name:</label>
      </div>
      <div class="input-field">
        <input v-model="form.userName" id="userName" type="text" required/>
        <label for="userName">Username:</label>
      </div>
      <div class="input-field">
        <input v-model="form.email" id="email" type="email" required/>
        <label for="email">Email:</label>
      </div>
      <div class="input-field">
        <input v-model="form.password" id="password" type="password" required/>
        <label for="password">Password:</label>
      </div>
      <div class="input-field">
        <select v-model="form.role" id="role" required>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="admin">Admin</option>
        </select>
        <label for="role">Role:</label>
      </div>
      <div class="input-field">
        <textarea v-model="form.bio" id="bio"></textarea>
        <label for="bio">Bio:</label>
      </div>
      <div class="input-field">
        <input v-model="form.date_of_birth" id="dob" type="date"/>
        <label for="dob">Date of Birth:</label>
      </div>
      <div class="input-field">
        <input v-model="form.phone_number" id="phone_number" type="text"/>
        <label for="phone_number">Phone Number:</label>
      </div>
      <button class="cta-button" type="submit">Add User</button>
      <p class="login-prompt">
        Already have an account?
        <router-link to="/sign-in" class="login-link">Log in here</router-link>
      </p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const form = ref({
  first_name: '',
  last_name: '',
  userName: '',
  email: '',
  password: '',
  role: 'student',
  bio: '',
  date_of_birth: '',
  phone_number: ''
});

const store = useStore();
const router = useRouter();

const handleSubmit = async () => {
  try {
    const auth = getAuth();
    await createUserWithEmailAndPassword(auth, form.value.email, form.value.password);

    const userData = {
      first_name: form.value.first_name,
      last_name: form.value.last_name,
      userName: form.value.userName,
      email: form.value.email,
      role: form.value.role,
      bio: form.value.bio,
      date_of_birth: form.value.date_of_birth,
      phone_number: form.value.phone_number
    };

    await store.dispatch('createUser', userData);

    router.push('/users');
  } catch (error) {
    console.error('Failed to add user:', error);
  }
};
</script>

<style scoped>
html, body {
  height: 100%;
  margin: 0;
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

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 400px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  padding: 20px;
  backdrop-filter: blur(10px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(0, 0, 0, 0.1);
  min-height: 450px;
  text-align: center;
}

.form-title {
  font-size: 2rem;
  font-weight: bold;
  background: linear-gradient(135deg, #ff6b6b, #f06595, #ff84b6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
  margin-bottom: 20px;
  text-align: center;
}

.input-field {
  position: relative;
  margin: 10px 0;
  width: 100%;
}

.input-field input,
.input-field select,
.input-field textarea {
  margin: 0;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
  border-radius: 8px;
  border: 1px solid #ddd;
  background: #fff;
  font-size: 1rem;
}

.input-field input:focus,
.input-field select:focus,
.input-field textarea:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(38, 143, 255, 0.2);
}

.input-field label {
  position: absolute;
  top: 0;
  left: 10px;
  font-size: 0.9rem;
  color: #666;
  pointer-events: none;
  transition: 0.2s;
}

.input-field input:focus + label,
.input-field select:focus + label,
.input-field textarea:focus + label,
.input-field input:not(:placeholder-shown) + label,
.input-field select:not(:placeholder-shown) + label,
.input-field textarea:not(:placeholder-shown) + label {
  top: -1.5em;
  left: 0.5em;
  font-size: 1rem;
  color: grey;
}

.cta-button {
  color: #fff;
  padding: 12px 24px;
  border-radius: 10px;
  text-decoration: none;
  font-size: 1.1rem;
  cursor: pointer;
  position: relative;
  z-index: 0;
  border: none;
  transition: background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
  background: linear-gradient(135deg, #ff6b6b, #f06595);
}

.cta-button::after {
  content: "";
  z-index: -1;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  left: 0;
  top: 0;
  border-radius: 10px;
}

.cta-button::before {
  content: "";
  background: linear-gradient(45deg, #ff8da1, #ff6b6b, #f06595, #ff84b6);
  position: absolute;
  top: -2px;
  left: -2px;
  background-size: 600%;
  z-index: -1;
  width: calc(100% + 4px);
  height: calc(100% + 4px);
  filter: blur(8px);
  animation: glowing 20s linear infinite;
  transition: opacity .3s ease-in-out;
  border-radius: 10px;
  opacity: 0;
}

.cta-button:hover::before {
  opacity: 1;
}

.cta-button:active:after {
  background: transparent;
}

.cta-button:active {
  color: #ff84b6;
  font-weight: bold;
}

@keyframes glowing {
  0% {
    background-position: 0 0;
  }
  50% {
    background-position: 400% 0;
  }
  100% {
    background-position: 0 0;
  }
}
</style>
