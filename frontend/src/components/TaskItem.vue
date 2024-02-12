<template>
  <div class="task-item">
    <div class="task-content">
      <div class="caption">{{ task.caption }}</div>
      <div class="task-body">
        <div class="task-description">{{ task.description }}</div>
        <div class="task-date">{{ formatDate(task.created_at) }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Task } from "@/store";

export default defineComponent({
  props: {
    task: {
      type: Object as PropType<Task>,
      required: true,
    },
  },
  emits: ["toggle-task"],
  setup(props, { emit }) {
    const formatDate = (dateString: string): string => {
      const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "short",
        day: "numeric",
      };
      return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return {
      formatDate,
    };
  },
});
</script>

<style scoped lang="scss">
@import "@/assets/styles/variables.scss";

.task-item {
  display: flex;
  align-items: flex-start;
  padding: 10px;
  border-radius: 5px;
  background-color: $background-active-color;
  color: $text-color;
  margin-bottom: 10px;

  .task-content {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-left: 10px;

    .caption {
      font-weight: bold;
      font-size: 1.2em;
      text-align: left;
    }

    .task-body {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      width: 100%;
      margin-top: 10px;

      .task-description {
        color: $text-secondary-color;
        text-align: left;
        flex: 1;
        font-size: 0.9em;
      }

      .task-date {
        color: $text-secondary-color;
        font-size: 0.8em;
        white-space: nowrap;
      }
    }
  }
}
</style>
