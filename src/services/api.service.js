import axios from "axios";

class ApiService {
  constructor() {
    this.coinGeckoBaseApi = "https://api.coingecko.com/api/v3";
  }

  async getCoinPrice(coinId) {
    try {
      const endpoint = `/simple/price?ids=${coinId}&vs_currencies=usd`;
      const response = await axios.get(`${this.coinGeckoBaseApi}${endpoint}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching coin price:", error);
      throw error;
    }
  }
}

export default new ApiService();
