import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useStore = create(
  persist(
    (set, get) => ({
      // Tasks Management
      tasks: [],

      // Add a new task
      addTask: (task) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            {
              id: Date.now(),
              title: task.title,
              category: task.category || 'Wellness',
              status: 'todo',
              priority: task.priority || 'normal',
              createdAt: new Date().toISOString(),
            },
          ],
        })),

      // Toggle task completion
      toggleTask: (taskId) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId
              ? { ...task, status: task.status === 'done' ? 'todo' : 'done' }
              : task
          ),
        })),

      // Delete a task
      deleteTask: (taskId) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== taskId),
        })),

      // Add multiple tasks from a template
      addTasksFromTemplate: (tasks) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            ...tasks.map((task) => ({
              id: Date.now() + Math.random(),
              title: task.title,
              category: task.category || 'Wellness',
              status: 'todo',
              priority: task.priority || 'normal',
              createdAt: new Date().toISOString(),
            })),
          ],
        })),

      // Clear all completed tasks
      clearCompleted: () =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.status !== 'done'),
        })),

      // User Vibe / Energy Level
      spoons: 5, // Energy level from 0-5
      setSpoons: (value) => set({ spoons: value }),

      // Low Spoon Mode
      lowSpoonMode: false,
      toggleLowSpoonMode: () =>
        set((state) => ({ lowSpoonMode: !state.lowSpoonMode })),

      // Progress Tracking
      getProgress: () => {
        const { tasks } = get();
        if (tasks.length === 0) return 0;
        const completedTasks = tasks.filter((task) => task.status === 'done').length;
        return Math.round((completedTasks / tasks.length) * 100);
      },

      // Get tasks filtered by Low Spoon Mode
      getVisibleTasks: () => {
        const { tasks, lowSpoonMode } = get();
        const incompleteTasks = tasks.filter((task) => task.status === 'todo');

        if (lowSpoonMode) {
          // Return only top 3 critical tasks
          return incompleteTasks
            .sort((a, b) => {
              // Priority sorting: emergency > high > normal > low
              const priorityOrder = { emergency: 0, high: 1, normal: 2, low: 3 };
              return (priorityOrder[a.priority] || 2) - (priorityOrder[b.priority] || 2);
            })
            .slice(0, 3);
        }

        return incompleteTasks;
      },

      // Get today's one thing (highest priority incomplete task)
      getTodaysOneThing: () => {
        const { tasks } = get();
        const incompleteTasks = tasks.filter((task) => task.status === 'todo');

        if (incompleteTasks.length === 0) return null;

        // Sort by priority and return the first one
        const sorted = incompleteTasks.sort((a, b) => {
          const priorityOrder = { emergency: 0, high: 1, normal: 2, low: 3 };
          return (priorityOrder[a.priority] || 2) - (priorityOrder[b.priority] || 2);
        });

        return sorted[0];
      },
    }),
    {
      name: 'capytracker-storage', // LocalStorage key
    }
  )
);

export default useStore;
