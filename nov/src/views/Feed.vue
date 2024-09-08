<template>
  <div class="feed-container">
    <header class="feed-header">
      <h1 class="feed-title">Feed</h1>
      <input type="text" v-model="searchTerm" placeholder="Search feed..." class="search-bar" />
      <button @click="createNewPost" class="action-button create-post-button">
        <i class="icon icon-add"></i> Create New Post
      </button>
    </header>
    <section class="feed-section">
      <ul class="feed-list">
        <li v-for="post in filteredPosts" :key="post.id" class="feed-card">
          <img :src="post.image || defaultImage" alt="Post Image" class="feed-image" />
          <div class="feed-info">
            <h3 class="feed-title">{{ post.title }}</h3>
            <p class="feed-content">{{ post.content }}</p>
            <p class="feed-date">{{ post.date }}</p>
          </div>
          <div class="feed-actions">
            <button @click="likePost(post.id)" class="action-button like-button">
              <i class="icon icon-like"></i> Like
            </button>
            <button @click="commentOnPost(post.id)" class="action-button comment-button">
              <i class="icon icon-comment"></i> Comment
            </button>
            <button @click="sharePost(post.id)" class="action-button share-button">
              <i class="icon icon-share"></i> Share
            </button>
          </div>
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';

const searchTerm = ref('');
const defaultImage = 'path/to/default-image.jpg'; // Replace with actual default image path

// Example data for posts
const posts = ref([
  { id: 1, title: 'Post 1', content: 'This is the first post.', date: '2024-09-08', image: '' },
  { id: 2, title: 'Post 2', content: 'This is the second post.', date: '2024-09-07', image: '' },
  // Add more posts as needed
]);

// Filter posts based on the search term
const filteredPosts = computed(() => {
  const term = searchTerm.value.toLowerCase();
  return posts.value.filter(post =>
      post.title.toLowerCase().includes(term) ||
      post.content.toLowerCase().includes(term)
  );
});

// Methods for actions
const createNewPost = () => {
  // Logic to create a new post
};

const likePost = (postId) => {
  // Logic to like a post
};

const commentOnPost = (postId) => {
  // Logic to comment on a post
};

const sharePost = (postId) => {
  // Logic to share a post
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');

.feed-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Full viewport height */
  width: 100vw; /* Full viewport width */
  background-image: url('/src/images/feed-bg.jpg');
  background-size: cover; /* Changed to cover for better scaling */
  padding: 20px;
}

.feed-header {
  text-align: center;
  margin-bottom: 40px;
}

.feed-title {
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

.create-post-button {
  background: linear-gradient(90deg, #33bfa6, #048e85);
  padding: 10px 20px;
  border-radius: 25px;
  color: #fff;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;
}

.create-post-button:hover {
  background: linear-gradient(90deg, #b12f47, #981b1b);
  transform: scale(1.05);
}

.feed-section {
  padding: 20px;
}

.feed-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.feed-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 300px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;
}

.feed-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
}

.feed-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 15px;
}

.feed-info {
  padding: 10px 0;
}

.feed-title {
  font-size: 1.5rem;
  color: #2d3748;
  margin: 0;
  font-weight: 600;
}

.feed-content {
  font-size: 1rem;
  color: #4a5568;
}

.feed-date {
  font-size: 0.9rem;
  color: #6c757d;
}

.feed-actions {
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

.like-button {
  background: linear-gradient(90deg, #ff6b6b, #f06595);
}

.like-button:hover {
  background: linear-gradient(90deg, #ff8da1, #493667);
  transform: scale(1.05);
}

.comment-button {
  background: linear-gradient(90deg, #ff6b6b, #f06595);
}

.comment-button:hover {
  background: linear-gradient(90deg, #ff8da1, #493667);
  transform: scale(1.05);
}

.share-button {
  background: linear-gradient(90deg, #ff6b6b, #f06595);
}

.share-button:hover {
  background: linear-gradient(90deg, #ff8da1, #493667);
  transform: scale(1.05);
}

.icon-add::before { content: '\f055'; } /* FontAwesome plus icon */
.icon-like::before { content: '\f004'; } /* FontAwesome heart icon */
.icon-comment::before { content: '\f075'; } /* FontAwesome comment icon */
.icon-share::before { content: '\f064'; } /* FontAwesome share icon */

/* Responsive Design */
@media (max-width: 768px) {
  .feed-card {
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

  .feed-title {
    font-size: 2.5rem;
  }
}
</style>
