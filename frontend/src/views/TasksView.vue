<template>
  <div class="tasks">
    <h1>Tasks</h1>
    <button class="create-task-button" @click="showModal = true">
      Create New Task
    </button>
    <CreateTaskModal :isVisible="showModal" @close="showModal = false" />
    <ul>
      <TaskItem v-for="task in tasks" :key="task.id" :task="task" />
    </ul>
  </div>
</template>

<script lang="ts">
import TaskItem from "@/components/TaskItem.vue";
import CreateTaskModal from "@/components/CreateTaskModal.vue";

import { defineComponent, onMounted, computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default defineComponent({
  components: {
    TaskItem,
    CreateTaskModal,
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const showModal = ref(false);

    onMounted(() => {
      if (!store.state.isAuthenticated) {
        router.push("/login");
      } else {
        store.dispatch("fetchTasks");
      }
    });

    return {
      tasks: computed(() => store.state.tasks),
      showModal,
    };
  },
});
</script>
<style lang="scss">
@import "@/assets/styles/variables.scss";

.tasks {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px auto;

  h1 {
    color: $text-color;
  }

  ul {
    list-style-type: none;
    padding: 0;
    width: 100%;
  }

  .create-task-button {
    width: 100%;
    padding: 15px;
    background-color: $accent-color;
    border: none;
    border-radius: 5px;
    color: white;
    font-size: 16px;
    cursor: pointer;
    margin-bottom: 20px;

    &:hover {
      background-color: $accent-color-darker;
    }
  }
}

@media (max-width: 768px) {
  .tasks {
    max-width: 100%;
    padding: 0 10px;
  }
}

@media (min-width: 768px) {
  .tasks {
    max-width: 800px;
  }
}
</style>
