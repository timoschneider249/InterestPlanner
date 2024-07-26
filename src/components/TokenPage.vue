<template>
 <div class="container mt-4">
  <h1 class="mb-4">Token Calculator</h1>
  <div class="mb-3">
   <label for="roiPercentage" class="form-label">ROI Percentage</label>
   <input id="roiPercentage" v-model.number="roiPercentage" type="number" class="form-control" placeholder="Enter ROI percentage" />
  </div>
  <div class="mb-3">
   <label for="totalTokens" class="form-label">Total Tokens</label>
   <input id="totalTokens" v-model.number="totalTokens" type="number" class="form-control" placeholder="Enter total tokens" />
  </div>
  <button @click="calculateTokens" class="btn btn-primary">Calculate Tokens</button>
  <div v-if="tokens !== null" class="mt-3">
   <h3>Results</h3>
   <p><strong>Tokens:</strong> {{ tokens.toFixed(2) }}</p>
  </div>
 </div>
</template>

<script setup>
import { ref } from 'vue';

const roiPercentage = ref(0);
const totalTokens = ref(0);
const tokens = ref(null);

const calculateTokens = () => {
 if (roiPercentage.value <= 0 || totalTokens.value <= 0) {
  tokens.value = null;
  return;
 }
 const tokensAmount = (roiPercentage.value / 100) * totalTokens.value;
 tokens.value = tokensAmount;
};
</script>

<style scoped>
/* Scoped styles if needed */
</style>
