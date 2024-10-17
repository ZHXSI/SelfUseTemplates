import { defineStore } from "pinia";
import piniaPersistConfig from '@/config/piniaPersist'
export const useComponents1 = defineStore(
  "useComponents1",
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
    persist: piniaPersistConfig('components1')
  },
);
