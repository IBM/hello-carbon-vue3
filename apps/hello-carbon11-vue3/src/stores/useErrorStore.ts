import {defineStore} from "pinia";
import {type ComponentPublicInstance, ref} from "vue";

export const useErrorStore = defineStore('error', () => {
    const message = ref<String>(null)
    const err = ref<unknown>(null)
    const instance = ref<ComponentPublicInstance>(null)
    const info = ref<String>(null)

    function $reset() {
        message.value = null
        err.value = null
        instance.value = null
        info.value = null
    }
    function clear() { $reset() }

    return { message, err, instance, info, $reset, clear }
})