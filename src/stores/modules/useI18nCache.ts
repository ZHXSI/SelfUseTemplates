import { defineStore } from 'pinia'
import piniaPersistConfig from '@/config/piniaPersist'
export const useI18nCache = defineStore(
  'useI18nCache',
  () => {
    const lang = ref('zh')
    const { locale } = useI18n()
    const changeLanguage = (val: string) => {
      locale.value = val
      lang.value = val
    }
    return {
      lang,
      changeLanguage,
    } as const
  },
  {
    persist: piniaPersistConfig('I18nCache'),
  },
)
