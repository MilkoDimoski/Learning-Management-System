<script setup>
import {ref} from "vue";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {useRouter} from 'vue-router';
import {useStore} from 'vuex';

const email = ref("");
const password = ref("");
const errMsg = ref();
const router = useRouter();
const store = useStore();

const register = () => {
  signInWithEmailAndPassword(getAuth(), email.value, password.value)
      .then(async (data) => {
        console.log("Successfully signed in!");

        // Wait for users to be fetched
        await store.dispatch("fetchUsers");

        // Retrieve the user by email from the fetched users
        const users = store.state.users;
        console.log(users);
        const userByEmail = users.find(user => user.email === email.value);
        console.log(userByEmail);
        console.log("tuka");
        if (!userByEmail) {
          throw new Error("User not found in the store");
        }

        // Set the current user in the store
        await store.dispatch("setUser", userByEmail);

        // Get the current user from the store
        const user = store.getters.currentUser;

        if (user.role === 'teacher') {
          router.push('/teacher');
        } else if (user.role === 'student') {
          router.push('/student');
        } else {
          router.push('/feed');  // Fallback route
        }
      })
      .catch((error) => {
        console.log(error.code);
        switch (error.code) {
          case "auth/invalid-email":
            errMsg.value = "Email is invalid!";
            break;
          case "auth/invalid-password":
            errMsg.value = "Password is invalid!";
            break;
          case "auth/user-not-found":
            errMsg.value = "User does not exist!";
            break;
          default:
            errMsg.value = "Email or password is incorrect!";
            break;
        }
      });
};

const signInWithGoogle = () => {
  // Implement Google sign-in logic here
};
</script>

<template>
  <div class="container">
    <form>
      <h1 class="sign-in-text">Sign In to Your Account</h1> <!-- Heading inside the form -->
      <p><input type="text" placeholder="Email" v-model="email"></p>
      <p><input type="password" placeholder="Password" v-model="password"></p>
      <p v-if="errMsg" class="error-message">{{ errMsg }}</p>
      <p>
        <button class="cta-button" @click.prevent="register">Submit</button>
      </p>
    </form>
  </div>
</template>

<style>
html, body {
  height: 100%;
  margin: 0;
}

.sign-in-text {
  font-size: 2rem; /* Adjust the font size as needed */
  font-weight: bold; /* Make the text bold */
  background: linear-gradient(135deg, #ff6b6b, #f06595, #ff84b6); /* Pink gradient */
  -webkit-background-clip: text; /* Clip the background to text */
  -webkit-text-fill-color: transparent; /* Make the text color transparent to show the gradient */
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2); /* Optional: subtle shadow for better readability */
  margin-bottom: 20px; /* Space below the text */
  text-align: center; /* Center-align text */
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

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 400px; /* Reduced width of the form */
  background: rgba(255, 255, 255, 0.9); /* Slightly more opaque background for readability */
  border-radius: 15px; /* Rounded corners */
  padding: 20px; /* Adjusted padding */
  backdrop-filter: blur(10px); /* Add blur effect */
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2); /* Optional: add shadow for depth */
  border: 1px solid rgba(0, 0, 0, 0.1); /* Optional: subtle border */
  min-height: 350px; /* Ensure enough height for the form content */
  text-align: center; /* Center text within the form */
}

input {
  margin: 10px 0;
  padding: 10px;
  width: 100%;
  box-sizing: border-box; /* Ensure padding is included in the width */
  border-radius: 8px; /* Rounded corners for inputs */
  border: 1px solid #ddd; /* Subtle border for inputs */
  background: #fff; /* Background color for inputs */
  font-size: 1rem;
}

input:focus {
  outline: none;
  border-color: #007bff; /* Border color on focus */
  box-shadow: 0 0 0 2px rgba(38, 143, 255, 0.2); /* Subtle glow effect on focus */
}

.cta-button {
  color: #fff;
  padding: 12px 24px; /* Slightly larger padding for better appearance */
  border-radius: 10px; /* Slightly smaller border radius */
  text-decoration: none;
  font-size: 1.1rem; /* Slightly larger font size for better readability */
  cursor: pointer;
  position: relative;
  z-index: 0;
  border: none;
  transition: background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
  background: linear-gradient(135deg, #ff6b6b, #f06595); /* Gradient background */
}

.cta-button::after {
  content: "";
  z-index: -1;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1); /* Slight overlay color */
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
  color: #ff84b6; /* Change text color on click to a lighter pink */
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

.error-message {
  color: red;
}

form > p + p {
  margin-top: 15px; /* Add space between the buttons */
}


</style>