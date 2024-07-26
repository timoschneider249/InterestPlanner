<template>
 <div class="container mt-4">
  <h1 class="mb-4">ROI Calculator</h1>
  <div class="mb-3">
   <label for="totalTokens" class="form-label">Total Tokens</label>
   <input
     id="totalTokens"
     v-model.number="totalTokens"
     type="number"
     class="form-control"
     placeholder="Enter total tokens"
   />
  </div>
  <div class="mb-3">
   <label for="tokensGained" class="form-label">Tokens Gained (in input period)</label>
   <input
     id="tokensGained"
     v-model.number="tokensGained"
     type="number"
     class="form-control"
     placeholder="Enter tokens gained"
   />
  </div>
  <div class="mb-3">
   <label for="days" class="form-label">Days</label>
   <input
     id="days"
     v-model.number="days"
     type="number"
     class="form-control"
     placeholder="Enter number of days"
   />
  </div>
  <button @click="calculateROI" class="btn btn-primary">Calculate ROI</button>
  <div v-if="roi !== null" class="mt-3">
   <h3>Results</h3>
   <p><strong>ROI:</strong> {{ roi }}%</p>
   <p><strong>Tokens Per Day:</strong> {{ tokensPerDay.toFixed(2) }}</p>
   <p><strong>Annualized Tokens:</strong> {{ annualizedTokens.toFixed(2) }}</p>
  </div>
 </div>
</template>

<script>
export default {
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

   // Calculate number of compounding periods in a year
   const compoundingPeriod = this.days; // days
   const daysInYear = 365;
   const periodsInYear = daysInYear / compoundingPeriod;

   // Calculate gain rate per period
   const gainPerPeriod = this.tokensGained / (this.days / compoundingPeriod);
   const principal = this.totalTokens;

   // Apply compound interest formula
   const effectiveRate = gainPerPeriod / principal;
   const totalAmount = principal * Math.pow((1 + effectiveRate), periodsInYear);

   // Calculate ROI
   const annualROI = ((totalAmount - principal) / principal) * 100;
   this.roi = this.fixedDecimal(annualROI, 5);
  },
  fixedDecimal(x, y) {
   return Number.parseFloat(x).toFixed(y);
  }
 }
};
</script>

<style scoped>
/* Scoped styles if needed */
</style>
