import { defineStore } from "pinia";
import piniaPersistConfig from '@/config/piniaPersist'
export const useComponents2 = defineStore(
  "useComponents2",
  () => {
    const count = ref(0);
    // 加法
    const increment = () => {
      count.value++;
    };
    // 减法
    const decrement = () => {
      count.value--;
    };

    return {
      count, increment, decrement
    } as const;
  },
  {
    persist: piniaPersistConfig('components2')
  },
);
