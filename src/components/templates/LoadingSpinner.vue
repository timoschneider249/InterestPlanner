<template>
  <div class="loading-container" :class="{ overlay: isOverlay }">
    <div
      class="spinner"
      :class="[size, color, { pulse: type === 'pulse' }]"
      :style="customStyle"
    >
      <template v-if="type === 'spinner'">
        <div class="spinner-circle"></div>
      </template>
      <template v-else-if="type === 'dots'">
        <div class="bounce1"></div>
        <div class="bounce2"></div>
        <div class="bounce3"></div>
      </template>
      <template v-else-if="type === 'pulse'">
        <div class="pulse-circle"></div>
      </template>
    </div>
    <div v-if="text" class="loading-text" :class="textSize">
      {{ text }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoadingSpinner',
  props: {
    // Type of spinner: 'spinner', 'dots', or 'pulse'
    type: {
      type: String,
      default: 'spinner',
      validator: value => ['spinner', 'dots', 'pulse'].includes(value)
    },
    // Size of the spinner: 'small', 'medium', or 'large'
    size: {
      type: String,
      default: 'medium',
      validator: value => ['small', 'medium', 'large'].includes(value)
    },
    // Color theme of the spinner
    color: {
      type: String,
      default: 'primary',
      validator: value => ['primary', 'secondary', 'success', 'danger', 'warning'].includes(value)
    },
    // Optional loading text
    text: {
      type: String,
      default: ''
    },
    // Text size
    textSize: {
      type: String,
      default: 'normal',
      validator: value => ['small', 'normal', 'large'].includes(value)
    },
    // Whether to show as overlay
    isOverlay: {
      type: Boolean,
      default: false
    },
    // Custom styles (optional)
    customStyle: {
      type: Object,
      default: () => ({})
    }
  }
};
</script>

<style scoped>
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 9999;
}

/* Spinner sizes */
.spinner.small {
  width: 20px;
  height: 20px;
}

.spinner.medium {
  width: 40px;
  height: 40px;
}

.spinner.large {
  width: 60px;
  height: 60px;
}

/* Spinner colors */
.spinner.primary .spinner-circle,
.spinner.primary .bounce1,
.spinner.primary .bounce2,
.spinner.primary .bounce3,
.spinner.primary .pulse-circle {
  background-color: #0d6efd;
}

.spinner.secondary .spinner-circle,
.spinner.secondary .bounce1,
.spinner.secondary .bounce2,
.spinner.secondary .bounce3,
.spinner.secondary .pulse-circle {
  background-color: #6c757d;
}

.spinner.success .spinner-circle,
.spinner.success .bounce1,
.spinner.success .bounce2,
.spinner.success .bounce3,
.spinner.success .pulse-circle {
  background-color: #198754;
}

.spinner.danger .spinner-circle,
.spinner.danger .bounce1,
.spinner.danger .bounce2,
.spinner.danger .bounce3,
.spinner.danger .pulse-circle {
  background-color: #dc3545;
}

.spinner.warning .spinner-circle,
.spinner.warning .bounce1,
.spinner.warning .bounce2,
.spinner.warning .bounce3,
.spinner.warning .pulse-circle {
  background-color: #ffc107;
}

/* Circular spinner */
.spinner-circle {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 3px solid transparent;
  border-top-color: currentColor;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Bouncing dots */
.spinner.dots {
  width: auto;
  display: flex;
  gap: 6px;
}

.bounce1, .bounce2, .bounce3 {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  animation: bounce 1.4s infinite ease-in-out both;
}

.bounce1 {
  animation-delay: -0.32s;
}

.bounce2 {
  animation-delay: -0.16s;
}

@keyframes bounce {
  0%, 80%, 100% { transform: scale(0); }
  40% { transform: scale(1); }
}

/* Pulse animation */
.pulse-circle {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  opacity: 0.6;
  animation: pulse 1s infinite;
}

@keyframes pulse {
  0% { transform: scale(0.8); opacity: 0.5; }
  50% { transform: scale(1.2); opacity: 0.8; }
  100% { transform: scale(0.8); opacity: 0.5; }
}

/* Loading text styles */
.loading-text {
  margin-top: 10px;
  text-align: center;
}

.loading-text.small {
  font-size: 0.875rem;
}

.loading-text.normal {
  font-size: 1rem;
}

.loading-text.large {
  font-size: 1.25rem;
}
</style>
