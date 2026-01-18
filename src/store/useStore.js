import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Baseline tasks for each energy level
const BASELINE_TASKS = {
  1: [ // Low 🌿
    { title: '💧 Sip a glass of water', category: 'Wellness', energyCost: 1, priority: 'normal' },
    { title: '☀️ Let some light in (open your curtains or blinds)', category: 'Home', energyCost: 1, priority: 'normal' },
    { title: '🌬️ Take 1 minute to breathe deeply or gently stretch', category: 'Wellness', energyCost: 1, priority: 'normal' },
  ],
  2: [ // Medium 🍃
    { title: '💧 Hydrate with a glass of water', category: 'Wellness', energyCost: 1, priority: 'normal' },
    { title: '🛏️ Smooth out your bed covers', category: 'Home', energyCost: 1, priority: 'normal' },
    { title: '🍎 Enjoy a piece of fruit or some veggies', category: 'Wellness', energyCost: 2, priority: 'normal' },
    { title: '🌿 Get 5 minutes of fresh air (even just at your door or window)', category: 'Wellness', energyCost: 2, priority: 'normal' },
    { title: '✨ Clear off one small spot that\'s been bugging you', category: 'Home', energyCost: 2, priority: 'normal' },
  ],
  3: [ // High ✨
    { title: '💧 Start your day with a glass of water', category: 'Wellness', energyCost: 1, priority: 'normal' },
    { title: '🛏️ Make your bed feel cozy', category: 'Home', energyCost: 2, priority: 'normal' },
    { title: '🥗 Treat yourself to something fresh (fruit or veggies)', category: 'Wellness', energyCost: 2, priority: 'normal' },
    { title: '🚶 Take a 10-15 minute walk around your neighborhood', category: 'Wellness', energyCost: 3, priority: 'normal' },
    { title: '🏠 Tackle one thing around the house that needs doing', category: 'Home', energyCost: 3, priority: 'normal' },
    { title: '💬 Reach out to someone you care about (a quick text counts!)', category: 'Social', energyCost: 2, priority: 'normal' },
    { title: '🎨 Spend 10 minutes doing something you enjoy', category: 'Wellness', energyCost: 2, priority: 'normal' },
    { title: '🍳 Put together or plan a nourishing meal', category: 'Wellness', energyCost: 3, priority: 'normal' },
  ],
};

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
              energyCost: task.energyCost || 1,
              createdAt: new Date().toISOString(),
            },
          ],
        })),

      // Toggle task completion
      toggleTask: (taskId) =>
        set((state) => {
          const task = state.tasks.find((t) => t.id === taskId);
          return {
            tasks: state.tasks.map((t) =>
              t.id === taskId
                ? { ...t, status: t.status === 'done' ? 'todo' : 'done' }
                : t
            ),
            // Store last completed task for Capybara to react
            lastCompletedTask: task && task.status === 'todo' ? task : state.lastCompletedTask,
          };
        }),

      // Clear last completed task (for Capybara speech bubble dismissal)
      clearLastCompletedTask: () => set({ lastCompletedTask: null }),

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
            ...tasks.map((task, index) => ({
              id: Date.now() + index + Math.random(),
              title: task.title,
              category: task.category || 'Wellness',
              status: 'todo',
              priority: task.priority || 'normal',
              energyCost: task.energyCost || 1,
              createdAt: new Date().toISOString(),
            })),
          ],
        })),

      // Replace all tasks with baseline tasks
      replaceWithBaseline: (energyLevel) => {
        const baselineTasks = BASELINE_TASKS[energyLevel] || [];
        set({
          tasks: baselineTasks.map((task, index) => ({
            id: Date.now() + index + Math.random(),
            title: task.title,
            category: task.category,
            status: 'todo',
            priority: task.priority,
            energyCost: task.energyCost,
            createdAt: new Date().toISOString(),
            isBaseline: true,
          })),
        });
      },

      // Add baseline tasks to existing tasks
      addBaselineToExisting: (energyLevel) => {
        const baselineTasks = BASELINE_TASKS[energyLevel] || [];
        set((state) => ({
          tasks: [
            ...state.tasks,
            ...baselineTasks.map((task, index) => ({
              id: Date.now() + index + Math.random(),
              title: task.title,
              category: task.category,
              status: 'todo',
              priority: task.priority,
              energyCost: task.energyCost,
              createdAt: new Date().toISOString(),
              isBaseline: true,
            })),
          ],
        }));
      },

      // Clear all completed tasks
      clearCompleted: () =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.status !== 'done'),
        })),

      // Energy Level (1-3: Low/Medium/High)
      energyLevel: 2, // Default to Medium
      lastCompletedTask: null,

      setEnergyLevel: (value) => {
        set({ energyLevel: value });
      },

      // Gentle Mode (formerly Low Spoon Mode)
      gentleMode: false,
      toggleGentleMode: () =>
        set((state) => ({ gentleMode: !state.gentleMode })),

      // Progress Tracking
      getProgress: () => {
        const { tasks } = get();
        if (tasks.length === 0) return 0;
        const completedTasks = tasks.filter((task) => task.status === 'done').length;
        return Math.round((completedTasks / tasks.length) * 100);
      },

      // Get tasks filtered by Gentle Mode
      getVisibleTasks: () => {
        const { tasks, gentleMode, energyLevel } = get();
        let incompleteTasks = tasks.filter((task) => task.status === 'todo');

        if (gentleMode) {
          // Filter by energyCost <= current energyLevel
          incompleteTasks = incompleteTasks.filter(
            (task) => (task.energyCost || 1) <= energyLevel
          );

          // Still return top 3 by priority
          return incompleteTasks
            .sort((a, b) => {
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

      // Get incomplete tasks count
      getIncompleteTasksCount: () => {
        const { tasks } = get();
        return tasks.filter((task) => task.status === 'todo').length;
      },
    }),
    {
      name: 'capytracker-storage-v2', // Changed storage key to force reset
    }
  )
);

export default useStore;
