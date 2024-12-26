<template>
  <div class="row">
    <loading-spinner
      v-if="isLoadingPrice || isLoadingCoins"
      :is-overlay="true"
      text="Calculating..."
    />
    <div class="col-md-6 mb-4">
      <div class="input-group-custom">
        <label for="price" class="form-label text-primary fw-bold">
          <i class="bi bi-calendar me-2"></i>Current Price of Coin
        </label>
        <input
          id="price"
          v-model="formattedPrice"
          @blur="handlePriceUpdate"
          type="text"
          class="form-control form-control-lg"
          placeholder="Enter price of coin"
        />
      </div>
    </div>

    <div class="col-md-6 mb-4">
      <div class="input-group-custom">
        <label for="coinSelect" class="form-label text-primary fw-bold">
          <i class="bi bi-currency-bitcoin me-2"></i>Select Coin
        </label>
        <SearchableSelect
          id="coinSelect"
          v-model="selectedCoin"
          :options="coinList"
          @change="handleCoinChange"
          placeholder="Search for a coin..."
        />
      </div>
    </div>
  </div>
</template>

<script>
import service from "../../services/api.service";
import LoadingSpinner from "./LoadingSpinner.vue";
import SearchableSelect from "./SearchableSelect.vue";

export default {
  name: "CoinPicker",
  components: { SearchableSelect, LoadingSpinner },
  props: {
    initialCoin: {
      type: String,
      default: 'cardano'
    }
  },
  data() {
    return {
      formattedPrice: "0",
      selectedCoin: this.initialCoin,
      price: 0,
      isLoadingPrice: false,
      isLoadingCoins: false,
      coinList: []
    };
  },
  async mounted() {
    await this.fetchCoins();
    await this.fetchPrice();
  },
  methods: {
    async fetchCoins() {
      const data = await service.getCoinList();
      this.coinList = [...data];
    },
    async fetchPrice() {
      this.isLoadingPrice = true;
      const coinIds = {
        cardano: "cardano",
        bitcoin: "bitcoin",
        ethereum: "ethereum",
      };
      const coin = coinIds[this.selectedCoin];

      try {
        const data = await service.getCoinPrice(coin, "usd");
        this.price = data[coin]?.usd || 0;
        this.formattedPrice = this.price.toFixed(8);
        this.emitPriceChange();
        this.isLoadingPrice = false;
      } catch (error) {
        this.isLoadingPrice = false;
        console.error("Error fetching coin price:", error);
      }
    },
    handlePriceUpdate() {
      const newPrice = parseFloat(this.formattedPrice) || 0;
      this.price = newPrice;
      this.formattedPrice = newPrice.toFixed(4);
      this.emitPriceChange();
    },
    async handleCoinChange() {
      await this.fetchPrice();
      this.$emit("coin-changed", this.selectedCoin);
    },
    emitPriceChange() {
      this.$emit("update-price", this.price);
    },
  },
  watch: {
    initialCoin(newVal) {
      this.selectedCoin = newVal;
      this.fetchPrice();
    }
  }
};
</script>
