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
                <i class="bi bi-calendar me-2"></i>Days when Coins were gained
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
        </div>
        <coin-picker
          @update-price="handlePriceUpdate"
          @coin-changed="handleCoinChange"
        />
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
                <div class="result-value">
                  {{ annualizedTokens.toFixed(2) }}
                </div>
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
import CoinPicker from "./templates/CoinPicker.vue";

export default {
  name: "ROIPage",
  components: { CoinPicker },
  data() {
    return {
      totalTokens: 0,
      tokensGained: 0,
      price: 0,
      days: 0,
      roi: null,
      formattedTotalTokens: "0",
      formattedTokensGained: "0",
      selectedCoin: "cardano",
    };
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
        return this.tokensPerDay * daysInYear;
      }
      return 0;
    },
    moneyPerDay() {
      return this.tokensPerDay * this.price;
    },
    annualizedMoney() {
      return this.annualizedTokens * this.price;
    },
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
      const totalAmount = principal * Math.pow(1 + effectiveRate, periodsInYear);
      const annualROI = ((totalAmount - principal) / principal) * 100;
      this.roi = this.fixedDecimal(annualROI, 5);
    },
    fixedDecimal(x, y) {
      return Number.parseFloat(x).toFixed(y);
    },
    updateTotalTokens() {
      const parsedValue = this.parseNumber(this.formattedTotalTokens);
      if (parsedValue !== null) {
        this.totalTokens = parsedValue;
        this.formattedTotalTokens = parsedValue.toLocaleString();
      }
      this.calculateROI();
    },
    updateTokensGained() {
      const parsedValue = this.parseNumber(this.formattedTokensGained);
      if (parsedValue !== null) {
        this.tokensGained = parsedValue;
        this.formattedTokensGained = parsedValue.toLocaleString();
      }
      this.calculateROI();
    },
    handlePriceUpdate(price) {
      this.price = price;
      this.calculateROI();
    },
    handleCoinChange(newCoin) {
      this.selectedCoin = newCoin;
    },
    clearResults() {
      this.roi = null;
    },
    parseNumber(input) {
      if (!input) return null;

      const cleaned = input.toString().trim();

      // Handle different number formats
      // 1. Numbers with comma as decimal separator (e.g., 1,23)
      if (cleaned.includes(",") && !cleaned.includes(".")) {
        return parseFloat(cleaned.replace(",", "."));
      }

      // 2. Numbers with thousand separators and comma decimal (e.g., 1.234,56)
      if (/^\d+(?:\.\d{3})*,\d+$/.test(cleaned)) {
        return parseFloat(cleaned.replace(/\./g, "").replace(",", "."));
      }

      // 3. Numbers with thousand separators and dot decimal (e.g., 1,234.56)
      if (/^\d+(?:,\d{3})*\.\d+$/.test(cleaned)) {
        return parseFloat(cleaned.replace(/,/g, ""));
      }

      // 4. Plain numbers (e.g., 1234.56)
      if (/^\d*\.?\d*$/.test(cleaned)) {
        return parseFloat(cleaned);
      }

      // 5. Remove all non-numeric characters except decimal point
      const numericValue = cleaned.replace(/[^\d.]/g, "");
      return parseFloat(numericValue) || null;
    },
  },
  watch: {
    days(newVal) {
      if (newVal > 0) {
        this.calculateROI();
      } else {
        this.clearResults();
      }
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
