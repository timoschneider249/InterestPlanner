const { ipcMain } = require("electron");
import service from "./../services/api.service";

class IpcService {
  registerHandlers() {
    // Coin price handler
    ipcMain.handle("get-coin-price", async (event, coinId) => {
      try {
        return await service.getCoinPrice(coinId);
      } catch (error) {
        console.error("Error in IPC handler:", error);
        return null;
      }
    });
  }
}

export default new IpcService();
