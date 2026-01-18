import { create } from 'zustand';

const useStore = create((set, get) => ({
  // User Vibe / Energy Level (Spoons)
  spoons: 3,
  setSpoons: (value) => set({ spoons: value }),

  // Low Spoon Mode Toggle
  lowSpoonMode: false,
  toggleLowSpoonMode: () => set((state) => ({ lowSpoonMode: !state.lowSpoonMode })),

  // Tasks
  tasks: [
    {
      id: 1,
      title: 'Take a shower',
      category: 'Hygiene',
      status: 'todo',
      priority: 1,
    },
    {
      id: 2,
      title: 'Drink a glass of water',
      category: 'Wellness',
      status: 'todo',
      priority: 1,
    },
    {
      id: 3,
      title: 'Open the blinds',
      category: 'Home',
      status: 'todo',
      priority: 2,
    },
  ],

  // Add a new task
  addTask: (task) => set((state) => ({
    tasks: [
      ...state.tasks,
      {
        ...task,
        id: Date.now(),
        status: 'todo',
      },
    ],
  })),

  // Toggle task status
  toggleTask: (id) => set((state) => ({
    tasks: state.tasks.map((task) =>
      task.id === id
        ? { ...task, status: task.status === 'done' ? 'todo' : 'done' }
        : task
    ),
  })),

  // Delete a task
  deleteTask: (id) => set((state) => ({
    tasks: state.tasks.filter((task) => task.id !== id),
  })),

  // Add tasks from template
  addTasksFromTemplate: (templateTasks) => set((state) => ({
    tasks: [
      ...state.tasks,
      ...templateTasks.map((task) => ({
        ...task,
        id: Date.now() + Math.random(),
        status: 'todo',
      })),
    ],
  })),

  // Get tasks filtered by Low Spoon Mode
  getVisibleTasks: () => {
    const state = get();
    const tasks = state.tasks.filter((task) => task.status === 'todo');

    if (state.lowSpoonMode) {
      // Return top 3 tasks sorted by priority
      return tasks
        .sort((a, b) => (a.priority || 999) - (b.priority || 999))
        .slice(0, 3);
    }

    return tasks;
  },

  // Get Today's One Thing (highest priority incomplete task)
  getTodaysOneThing: () => {
    const state = get();
    const incompleteTasks = state.tasks.filter((task) => task.status === 'todo');

    if (incompleteTasks.length === 0) return null;

    return incompleteTasks.sort((a, b) => (a.priority || 999) - (b.priority || 999))[0];
  },

  // Calculate progress percentage
  getProgress: () => {
    const state = get();
    if (state.tasks.length === 0) return 0;

    const completedTasks = state.tasks.filter((task) => task.status === 'done').length;
    return Math.round((completedTasks / state.tasks.length) * 100);
  },

  // Get completed tasks count
  getCompletedCount: () => {
    const state = get();
    return state.tasks.filter((task) => task.status === 'done').length;
  },
}));

export default useStore;
