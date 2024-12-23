<template>
 <div class="calculator-container">
  <div class="card shadow-lg">
   <div class="card-header bg-primary text-white">
    <h2 class="mb-0"><i class="bi bi-graph-up me-2"></i>ROI Calculator</h2>
   </div>
   <div class="card-body">
    <div class="row">
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
     <div class="col-md-6 mb-4">
      <div class="input-group-custom">
       <label for="tokensGained" class="form-label text-primary fw-bold">
        <i class="bi bi-plus-circle me-2"></i>Tokens Gained
       </label>
       <input
         id="tokensGained"
         v-model.number="tokensGained"
         type="number"
         class="form-control form-control-lg"
         placeholder="Enter tokens gained"
       />
      </div>
     </div>
    </div>

    <div class="row">
     <div class="col-md-6 mb-4">
      <div class="input-group-custom">
       <label for="days" class="form-label text-primary fw-bold">
        <i class="bi bi-calendar me-2"></i>Days
       </label>
       <input
         id="days"
         v-model.number="days"
         type="number"
         class="form-control form-control-lg"
         placeholder="Enter number of days"
       />
      </div>
     </div>
    </div>

    <div class="text-center mt-4">
     <button @click="calculateROI" class="btn btn-primary btn-lg px-5">
      <i class="bi bi-calculator me-2"></i>Calculate ROI
     </button>
    </div>

    <div v-if="roi !== null" class="results-section mt-4">
     <h3 class="text-primary mb-4">
      <i class="bi bi-clipboard-data me-2"></i>Results
     </h3>
     <div class="row">
      <div class="col-md-4">
       <div class="result-card">
        <div class="result-label">ROI</div>
        <div class="result-value">{{ roi }}%</div>
       </div>
      </div>
      <div class="col-md-4">
       <div class="result-card">
        <div class="result-label">Tokens Per Day</div>
        <div class="result-value">{{ tokensPerDay.toFixed(2) }}</div>
       </div>
      </div>
      <div class="col-md-4">
       <div class="result-card">
        <div class="result-label">Annualized Tokens</div>
        <div class="result-value">{{ annualizedTokens.toFixed(2) }}</div>
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
 name: "ROIPage",
 data() {
  return {
   totalTokens: 0,
   tokensGained: 0,
   days: 0,
   roi: null
  };
 },
 computed: {
  tokensPerDay() {
   return this.days > 0 && this.tokensGained > 0
     ? (this.tokensGained / this.days)
     : 0;
  },
  annualizedTokens() {
   if (this.days > 0) {
    const daysInYear = 365;
    const tokensPerDay = this.tokensGained / this.days;
    return tokensPerDay * daysInYear;
   }
   return 0;
  }
 },
 methods: {
  calculateROI() {
   if (this.totalTokens <= 0 || this.tokensGained <= 0 || this.days <= 0) {
    this.roi = null;
    return;
   }

   const compoundingPeriod = this.days;
   const daysInYear = 365;
   const periodsInYear = daysInYear / compoundingPeriod;
   const gainPerPeriod = this.tokensGained / (this.days / compoundingPeriod);
   const principal = this.totalTokens;
   const effectiveRate = gainPerPeriod / principal;
   const totalAmount = principal * Math.pow((1 + effectiveRate), periodsInYear);
   const annualROI = ((totalAmount - principal) / principal) * 100;
   this.roi = this.fixedDecimal(annualROI, 5);
  },
  fixedDecimal(x, y) {
   return Number.parseFloat(x).toFixed(y);
  }
 }
};
</script>
