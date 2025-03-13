<template>

</template>

<script setup>
import { watchEffect } from "vue";
import { useNotification } from '@kyvg/vue3-notification';  // Importoni useNotification
import { eventBus } from "@/notification"; // Importoni eventBus nga file notification.js

const { notify } = useNotification();  // Inicializoni notify për të përdorur notifikimet

// Duke dëgjuar për ngjarjet e event bus dhe duke treguar notifikimin
watchEffect(() => {
    if (eventBus.notifications.length > 0) {
        const notification = eventBus.notifications[eventBus.notifications.length - 1];
        notify({
            title: notification.title,
            text: notification.message,
            type: 'success', // Ose mund ta bëni këtë 'error' në varësi të mesazhit
        });
    }
});
</script>
