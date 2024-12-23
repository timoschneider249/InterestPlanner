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
        <i class="bi bi-coin me-2"></i>Total Amount of Coins
       </label>
       <input
         id="totalTokens"
         v-model="formattedTotalTokens"
         @blur="updateTotalTokens"
         @input="clearResults"
         type="text"
         class="form-control form-control-lg"
         placeholder="Enter total tokens"
       />
      </div>
     </div>
     <div class="col-md-6 mb-4">
      <div class="input-group-custom">
       <label for="tokensGained" class="form-label text-primary fw-bold">
        <i class="bi bi-plus-circle me-2"></i>Coins Gained
       </label>
       <input
         id="tokensGained"
         v-model="formattedTokensGained"
         @blur="updateTokensGained"
         @input="clearResults"
         type="text"
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
        <i class="bi bi-calendar me-2"></i>Days in which Coins where gained
       </label>
       <input
         id="days"
         v-model.number="days"
         @input="clearResults"
         type="number"
         class="form-control form-control-lg"
         placeholder="Enter number of days"
       />
      </div>
     </div>
     <div class="col-md-6 mb-4">
      <div class="input-group-custom">
       <label for="price" class="form-label text-primary fw-bold">
        <i class="bi bi-calendar me-2"></i>Current Price of Coin
       </label>
       <input
         id="price"
         v-model="formattedPrice"
         @blur="updatePrice"
         @input="clearResults"
         type="text"
         class="form-control form-control-lg"
         placeholder="Enter price of coin"
       />
      </div>
     </div>
     <div class="row">
      <!-- Dropdown to select coin -->
      <div class="col-md-6 mb-4">
       <div class="input-group-custom">
        <label for="coinSelect" class="form-label text-primary fw-bold">
         <i class="bi bi-currency-bitcoin me-2"></i>Select Coin
        </label>
        <select id="coinSelect" v-model="selectedCoin" @change="fetchPrice" class="form-control form-control-lg">
         <option value="cardano">Cardano (ADA)</option>
         <option value="bitcoin">Bitcoin (BTC)</option>
         <option value="ethereum">Ethereum (ETH)</option>
         <!-- Add more options as needed -->
        </select>
       </div>
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
     <div v-if="price > 0" class="row mt-2">
      <div class="col-md-4">
       <div class="result-card">
        <div class="result-label">Money Per Day</div>
        <div class="result-value">{{ moneyPerDay.toFixed(4) }}</div>
       </div>
      </div>
      <div class="col-md-4">
       <div class="result-card">
        <div class="result-label">Annualized Money</div>
        <div class="result-value">{{ annualizedMoney.toFixed(4) }}</div>
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
   price: 0,
   days: 0,
   roi: null,
   formattedTotalTokens: "0",
   formattedTokensGained: "0",
   formattedPrice: "0",
   selectedCoin: "cardano"
  };
 },
 mounted() {
  this.fetchPrice();
 },
 computed: {
  tokensPerDay() {
   return this.days > 0 && this.tokensGained > 0
     ? this.tokensGained / this.days
     : 0;
  },
  annualizedTokens() {
   if (this.days > 0) {
    const daysInYear = 365;
    const tokensPerDay = this.tokensGained / this.days;
    return tokensPerDay * daysInYear;
   }
   return 0;
  },
  moneyPerDay() {
   return this.days > 0 && this.tokensGained > 0
     ? (this.tokensGained / this.days) * this.price
     : 0;
  },
  annualizedMoney() {
   if (this.days > 0) {
    const daysInYear = 365;
    const tokensPerDay = this.tokensGained / this.days;
    return tokensPerDay * daysInYear * this.price;
   }
   return 0;
  },
 },
 methods: {
  calculateROI() {
   this.roi = null;
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
   const totalAmount = principal * Math.pow(1 + effectiveRate, periodsInYear);
   const annualROI = ((totalAmount - principal) / principal) * 100;
   this.roi = this.fixedDecimal(annualROI, 5);
  },
  fixedDecimal(x, y) {
   return Number.parseFloat(x).toFixed(y);
  },

  // Update totalTokens after losing focus and formatting
  updateTotalTokens() {
   this.totalTokens = this.parseNumber(this.formattedTotalTokens);
  },
  // Update tokensGained after losing focus and formatting
  updateTokensGained() {
   this.tokensGained = this.parseNumber(this.formattedTokensGained);
  },
  // Update price after losing focus and formatting
  updatePrice() {
   this.price = this.parseNumber(this.formattedPrice);
  },
  // Helper method to parse the formatted number (with commas) back to a number
  parseNumber(input) {
   const cleaned = input.trim();

   // If the input contains commas, replace commas with periods
   if (cleaned.includes(',') && !cleaned.includes('.')) {
    return parseFloat(cleaned.replace(',', '.'));
   }

   // If the input is already a valid number, just return it
   if (/^\d+(\.\d+)?$/.test(cleaned)) {
    return parseFloat(cleaned);
   }

   // Handle more complex formatting, such as thousand separators
   if (/^\d+(?:\.\d{3})*,\d+$/.test(cleaned)) {
    return parseFloat(cleaned.replace(/\./g, '').replace(',', '.'));
   }

   // Handle other formats like 1,000.00 (US style)
   if (/^\d+(?:,\d{3})*\.\d+$/.test(cleaned)) {
    return parseFloat(cleaned.replace(/,/g, ''));
   }

   return null;
  },

  // Clear results whenever any input changes
  clearResults() {
   this.roi = null;
   this.tokensPerDay = 0;
   this.annualizedTokens = 0;
   this.moneyPerDay = 0;
   this.annualizedMoney = 0;
  },
  async fetchPrice() {
   const coinIds = {
    cardano: "cardano",
    bitcoin: "bitcoin",
    ethereum: "ethereum",
   };
   const coin = coinIds[this.selectedCoin];
   const url = `https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=usd`;

   try {
    const response = await fetch(url);
    const data = await response.json();
    this.price = data[coin]?.usd || 0;
    this.formattedPrice = this.price.toString();
   } catch (error) {
    console.error("Error fetching coin price:", error);
   }
  },
 },
 watch: {
  totalTokens(newVal) {
   this.formattedTotalTokens = newVal;
  },
  tokensGained(newVal) {
   this.formattedTokensGained = newVal;
  },
  formattedPrice(newVal) {
   console.log(newVal);
   this.formattedPrice = newVal;
  },
  selectedCoin(newVal) {
   this.fetchPrice();
  },
 },
};
</script>

<style scoped>
/* Style for the formatted number with commas */
.input-group-custom input {
 text-align: right;
}
</style>
