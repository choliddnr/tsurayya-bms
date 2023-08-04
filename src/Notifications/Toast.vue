<script setup>
import { ref, watch, onMounted } from 'vue'
import { useNotificationStore } from '@/stores.js'
const { Toast } = bootstrap

const notif = useNotificationStore()
const toastRef = ref()

watch(notif, () => {
    
    const toastBootstrap = new Toast(toastRef.value)
    toastBootstrap.show()
    notif.show = false
})

</script>

<template>
    <div class="container">
        

        <div class="toast-container position-fixed bottom-0 end-0 p-3">
            <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true" ref="toastRef">
                <div class="toast-header">
                    <i class="bi" :class="notif.data.icon"></i>  
                <!-- <img src="..." class="rounded me-2" alt="..."> -->
                <strong class="me-auto ms-1">   {{ notif.data.name }}</strong>
                <!-- <small>11 mins ago</small> -->
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div class="toast-body">
                {{ notif.data.message }}
                </div>
            </div>
        </div>
    </div>
    
</template>
<style>
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css");

.toast-header {
    background-color: v-bind(notif.data.header_bg);
}
.toast-body {
    background-color: v-bind(notif.data.body_bg);
}

</style>