import type { PersistenceOptions } from 'pinia-plugin-persistedstate'
const piniaPersistConfig = (key: string): PersistenceOptions => {
  const persist: PersistenceOptions = {
    key,
    storage: localStorage,
  }
  return persist
}
export default piniaPersistConfig
