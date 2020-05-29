export default function createToast(type, message, duration, position) {
  return {
    type: type || 'error',
    message: message || 'Toast message',
    duration: duration || 5000,
    position: position || 'TOP_RIGHT',
  };
}
