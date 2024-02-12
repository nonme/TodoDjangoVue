import { createStore } from "vuex";
import axios from "axios";

export interface Task {
  id: number;
  caption: string;
  description: string;
  created_at: string;
}

export interface State {
  isAuthenticated: boolean;
  token: string;
  tasks: Task[];
}

export default createStore<State>({
  state: {
    isAuthenticated: false,
    token: "",
    tasks: [],
  },
  mutations: {
    setAuthentication(state, token: string) {
      state.isAuthenticated = !!token;
      state.token = token;
    },
    setTasks(state, tasks: Task[]) {
      state.tasks = tasks;
    },
    addTask(state, task: Task) {
      state.tasks.push(task);
    },
  },
  actions: {
    async login(
      { commit },
      credentials: { username: string; password: string }
    ) {
      try {
        const response = await axios.post(
          "http://localhost:8000/api-token-auth/",
          credentials
        );
        commit("setAuthentication", response.data.token);
      } catch (error) {
        console.error("Authentication failed:", error);
      }
    },
    async fetchTasks({ commit, state }) {
      if (state.token) {
        try {
          const response = await axios.get("http://localhost:8000/tasks/", {
            headers: { Authorization: `Token ${state.token}` },
          });
          commit("setTasks", response.data);
        } catch (error) {
          console.error("Fetching tasks failed:", error);
        }
      }
    },
    async createTask({ commit, state }, task) {
      if (state.token) {
        try {
          await axios.post("http://localhost:8000/tasks/", task, {
            headers: { Authorization: `Token ${state.token}` },
          });
          commit("addTask", task);
        } catch (error) {
          console.error("Creating task failed:", error);
        }
      }
    },
  },
});
