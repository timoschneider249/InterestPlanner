<template>
 <div class="calculator-container">
  <div class="card shadow-lg">
   <div class="card-header bg-primary text-white">
    <h2 class="mb-0"><i class="bi bi-currency-exchange me-2"></i>Token Calculator</h2>
   </div>
   <div class="card-body">
    <div class="row">
     <div class="col-md-6 mb-4">
      <div class="input-group-custom">
       <label for="roiPercentage" class="form-label text-primary fw-bold">
        <i class="bi bi-percent me-2"></i>ROI Percentage
       </label>
       <input
         id="roiPercentage"
         v-model.number="roiPercentage"
         type="number"
         class="form-control form-control-lg"
         placeholder="Enter ROI percentage"
       />
      </div>
     </div>
     <div class="col-md-6 mb-4">
      <div class="input-group-custom">
       <label for="totalTokens" class="form-label text-primary fw-bold">
        <i class="bi bi-coin me-2"></i>Total Tokens
       </label>
       <input
         id="totalTokens"
         v-model.number="totalTokens"
         type="number"
         class="form-control form-control-lg"
         placeholder="Enter total tokens"
       />
      </div>
     </div>
    </div>

    <div class="text-center mt-4">
     <button @click="calculateTokens" class="btn btn-primary btn-lg px-5">
      <i class="bi bi-calculator me-2"></i>Calculate Tokens
     </button>
    </div>

    <div v-if="tokens !== null" class="results-section mt-4">
     <h3 class="text-primary mb-4">
      <i class="bi bi-clipboard-data me-2"></i>Results
     </h3>
     <div class="row justify-content-center">
      <div class="col-md-6">
       <div class="result-card">
        <div class="result-label">Expected Tokens</div>
        <div class="result-value">{{ formatNumber(tokens) }}</div>
        <div class="result-details mt-3">
         <div class="detail-item">
          <small class="text-muted">ROI Rate</small>
          <div class="fw-bold text-success">{{ roiPercentage }}%</div>
         </div>
         <div class="detail-item">
          <small class="text-muted">Initial Tokens</small>
          <div class="fw-bold text-primary">{{ formatNumber(totalTokens) }}</div>
         </div>
        </div>
       </div>
      </div>
     </div>
    </div>
   </div>
  </div>
 </div>
</template>

<script>
export default {
 name: "TokenPage",
 data() {
  return {
   roiPercentage: 0,
   totalTokens: 0,
   tokens: null
  };
 },
 methods: {
  calculateTokens() {
   if (this.roiPercentage <= 0 || this.totalTokens <= 0) {
    this.tokens = null;
    return;
   }
   this.tokens = (this.roiPercentage / 100) * this.totalTokens;
  },
  formatNumber(value) {
   return new Intl.NumberFormat().format(value.toFixed(2));
  }
 }
};
</script>
