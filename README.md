# Crypto Dashboard

## **Overview**
The **Crypto Dashboard** is a React-based web application designed to provide users with real-time cryptocurrency prices, historical price charts, and the ability to set custom price alerts. This dashboard integrates the CoinGecko API for market data and leverages WebSocket connections for live updates, creating a seamless user experience.

## **Features**
- **Real-Time Price Updates**: Stay updated with live cryptocurrency prices for selected trading pairs.
- **Historical Price Charts**: Visualize price trends over the past week for your favorite cryptocurrencies.
- **Price Alerts**: Set and manage custom price thresholds to receive notifications when prices cross specified limits.
- **User Wallet Connection**: Securely connect your cryptocurrency wallet to interact with blockchain-based features.
- **Dark Mode Support**: Switch between light and dark themes for a comfortable viewing experience.
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices.

---

## **Technologies Used**
- **React**: Modern library for building dynamic user interfaces.
- **Vite**: Fast and efficient build tool for modern web applications.
- **Axios**: Lightweight HTTP client for API requests.
- **WebSocket**: Enables real-time updates for cryptocurrency prices.
- **React Spinners**: Provides elegant loading indicators during data fetching.
- **Tailwind CSS**: Utility-first framework for efficient and scalable styling.

---

## **Installation**
To set up and run the Crypto Dashboard locally, follow these steps:

### **Step 1: Clone the Repository**
```bash
git clone https://github.com/yourusername/crypto-dashboard.git
cd crypto-dashboard
```

### **Step 2: Install Dependencies**
```bash
npm install
```

### **Step 3: Start the Development Server**
```bash
npm run dev
```

### **Step 4: Open in Browser**
Navigate to the URL displayed in the terminal (e.g., [http://localhost:5173](http://localhost:5173)) to view the application.

---

## **Usage**
1. **Connect Your Wallet**: Click the "Connect Wallet" button to link your cryptocurrency wallet.
2. **Select Trading Pair**: Choose a trading pair (e.g., BTC/USDT, ETH/USDT) from the dropdown menu.
3. **Set Price Alerts**: Input your desired price threshold and enable alerts to receive notifications.
4. **View Real-Time Prices**: Observe the live prices and visualize historical trends via interactive charts.

---

## **API Usage**
The application interacts with the CoinGecko API to fetch cryptocurrency market data:

- **Market Data**: 
  - Endpoint: `GET https://api.coingecko.com/api/v3/coins/markets`
  - Fetches current market data for cryptocurrencies.
- **Historical Market Chart**: 
  - Endpoint: `GET https://api.coingecko.com/api/v3/coins/{id}/market_chart`
  - Retrieves historical price data for selected cryptocurrencies.

---

## **Contributing**
Contributions to the project are welcome! Follow these steps to contribute:

1. **Fork the Repository**.
2. **Create a New Branch**: 
   ```bash
   git checkout -b feature/YourFeature
   ```
3. **Make Changes and Commit**:
   ```bash
   git commit -m "Add Your Feature"
   ```
4. **Push Changes to Your Branch**:
   ```bash
   git push origin feature/YourFeature
   ```
5. **Open a Pull Request**.

---

## **License**
This project is licensed under the [MIT License](LICENSE). Feel free to use, modify, and distribute it as per the terms of the license.

---

## **Acknowledgments**
- Thanks to the **CoinGecko API** team for their robust cryptocurrency data services.
- Appreciation to the open-source community for their incredible tools and libraries.
- Gratitude to contributors and testers for making this project a success.

---

## **Contact**
For inquiries, suggestions, or issues, feel free to reach out via:
- **Email**: your.email@example.com
- **GitHub Issues**: Open an issue [here](https://github.com/yourusername/crypto-dashboard/issues).
