// src/event-bus.js
import { reactive } from 'vue';

const eventBus = reactive({
  notifications: [],
  addNotification(notification) {
    this.notifications.push(notification);
  },
  clearNotifications() {
    this.notifications = [];
  }
});

export default eventBus;
