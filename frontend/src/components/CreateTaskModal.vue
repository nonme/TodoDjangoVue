<template>
  <div class="modal" v-if="isVisible" @click.self="emit('close')">
    <div class="modal-content">
      <h2>Create New Task</h2>
      <form @submit.prevent="submitTask">
        <div class="form-group">
          <label for="caption">Caption</label>
          <input type="text" id="caption" v-model="task.caption" required />
        </div>
        <div class="form-group">
          <label for="description">Description</label>
          <textarea
            id="description"
            v-model="task.description"
            required
          ></textarea>
        </div>
        <div class="form-actions">
          <button type="submit" class="action-button">Create Task</button>
          <button type="button" class="close-button" @click="emit('close')">
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  props: {
    isVisible: Boolean,
  },
  setup(props, { emit }) {
    const store = useStore();
    const task = ref({ caption: "", description: "" });

    const submitTask = async () => {
      await store.dispatch("createTask", task.value);
      task.value = { caption: "", description: "" }; // Reset the form
      emit("close");
    };

    return { task, submitTask, emit };
  },
});
</script>
<style scoped lang="scss">
@import "@/assets/styles/variables.scss";

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background-color: $background-color;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 500px;
}

h2 {
  color: $text-color;
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 20px;
}

.form-group label {
  color: $text-color;
  margin-bottom: 5px;
}

input[type="text"],
textarea {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: none;
  border-radius: 5px;
  box-sizing: border-box;
  background-color: lighten($background-color, 5%);
  color: $text-color;
  text-align: left;
}

.form-actions {
  display: flex;
  justify-content: space-between;
}

.action-button,
.close-button {
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 5px;
  color: $text-color;
  cursor: pointer;
  margin: 5px;
  font-weight: bold;
}

.action-button {
  background-color: $accent-color;
  &:hover {
    background-color: darken($accent-color, 10%);
  }
}

.close-button {
  background-color: $error-color;
  &:hover {
    background-color: $error-hover-color;
  }
}
</style>
