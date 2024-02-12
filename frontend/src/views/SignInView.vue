<template>
  <div class="login">
    <h1>Sign In</h1>
    <div class="input-group">
      <input v-model="username" placeholder="Username" />
    </div>
    <div class="input-group">
      <input type="password" v-model="password" placeholder="Password" />
    </div>
    <button @click="login">Sign In</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const username = ref("johndoe");
    const password = ref("password123");
    const store = useStore();
    const router = useRouter();

    const login = async () => {
      await store.dispatch("login", {
        username: username.value,
        password: password.value,
      });

      if (store.state.isAuthenticated) {
        router.push("/tasks");
      } else {
        alert("Authentication failed");
      }
    };

    return { username, password, login };
  },
});
</script>
<style lang="scss">
@import "@/assets/styles/variables.scss";

.login {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  background-color: $background-color;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);

  h1 {
    color: $text-color;
  }

  .input-group {
    margin-bottom: 20px;

    input {
      width: 100%;
      padding: 10px;
      margin-top: 5px;
      border: none;
      border-radius: 5px;
      box-sizing: border-box;
      background-color: lighten($background-color, 5%);
      color: $text-color;
    }
  }

  button {
    width: 100%;
    padding: 10px;
    background-color: $accent-color;
    border: none;
    border-radius: 5px;
    color: white;
    font-size: 16px;
    cursor: pointer;

    &:hover {
      background-color: $accent-color-darker;
    }
  }
}
</style>
