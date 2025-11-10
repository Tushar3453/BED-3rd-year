class OrderBook {
  constructor(symbol = "BTCUSD") {
    this.symbol = symbol;
    this.bids = []; // BUY orders
    this.ask = []; // SELL orders
    this._nextId = 1;
    this.lastTradedPrice = null;
  }

  // helper
  _genOrderId() {
    return this._nextId++;
  }

  _sort(side) {
    if (side === "BUY") {
      // Highest price first, then earlier timestamp
      this.bids.sort((a, b) => {
        if (a.price != b.price) return b.price - a.price;
        return a.timestamp - b.timestamp;
      });
    } else if (side === "SELL") {
      // Lowest price first, then earlier timestamp
      this.ask.sort((a, b) => {
        if (a.price != b.price) return a.price - b.price;
        return a.timestamp - b.timestamp;
      });
    }
  }

  /*
   * placeOrder() — adds a new order & matches it if possible
   * 1. create order object
   * 2. if MARKET → _marketMatch()
   * 3. else → _limitMatch()
   */
  placeOrder(side, type, price = null, quantity, user) {
    const order = {
      orderId: this._genOrderId(),
      symbol: this.symbol,
      side,
      type,
      price: parseFloat(price),
      orignQty: quantity,
      remainQty: quantity,
      exectQty: 0,
      timestamp: Date.now(),
      user,
    };

    let result;
    if (type === "MARKET") {
      result = this._marketMatch(order);
      if (result.remainQty > 0) {
        console.log(
          `Order partially filled: ${result.exectQty}, Cancelled: ${result.remainQty}`
        );
      }
    } else {
      result = this._limitMatch(order);
    }

    return result || order;
  }

  /**
   * Market Order Execution
   *  BUY → match with ask[]
   *  SELL → match with bids[]
   */
  _marketMatch(order) {
    if (order.side === "BUY") {
      const asksArr = this.ask;

      while (order.remainQty > 0 && asksArr.length > 0) {
        let top = asksArr[0];
        let fillQty = Math.min(order.remainQty, top.remainQty);

        order.exectQty += fillQty;
        order.remainQty -= fillQty;

        top.exectQty += fillQty;
        top.remainQty -= fillQty;

        this.lastTradedPrice = top.price;

        if (top.remainQty === 0) asksArr.shift();
      }
    } else if (order.side === "SELL") {
      const bidsArr = this.bids;

      while (order.remainQty > 0 && bidsArr.length > 0) {
        let top = bidsArr[0];
        let fillQty = Math.min(order.remainQty, top.remainQty);

        order.exectQty += fillQty;
        order.remainQty -= fillQty;

        top.exectQty += fillQty;
        top.remainQty -= fillQty;

        this.lastTradedPrice = top.price;

        if (top.remainQty === 0) bidsArr.shift();
      }
    }

    return order;
  }

  /**
   * Limit Order Matching
   */
  _limitMatch(order) {
    if (order.side === "BUY") {
      let opposite = this.ask;

      while (order.remainQty > 0 && opposite.length > 0) {
        let top = opposite[0];

        if (order.price >= top.price) {
          let filled = Math.min(order.remainQty, top.remainQty);
          order.remainQty -= filled;
          order.exectQty += filled;

          top.remainQty -= filled;
          top.exectQty += filled;

          this.lastTradedPrice = top.price;

          if (top.remainQty <= 0) opposite.shift();
        } else {
          break;
        }
      }

      // still remaining → add to bids
      if (order.remainQty > 0) {
        this.bids.push(order);
        this._sort("BUY");
      }
    } else if (order.side === "SELL") {
      let opposite = this.bids;

      while (order.remainQty > 0 && opposite.length > 0) {
        let top = opposite[0];

        if (order.price <= top.price) {
          let filled = Math.min(order.remainQty, top.remainQty);
          order.remainQty -= filled;
          order.exectQty += filled;

          top.remainQty -= filled;
          top.exectQty += filled;

          this.lastTradedPrice = top.price;

          if (top.remainQty <= 0) opposite.shift();
        } else {
          break;
        }
      }

      // still remaining → add to ask
      if (order.remainQty > 0) {
        this.ask.push(order);
        this._sort("SELL");
      }
    }

    return order;
  }

  /**
   * Get Order Book Snapshot
   */
  getBookSnapShot() {
    return {
      symbol: this.symbol,
      lastUpdated: Date.now(),
      bids: this.bids.map((o) => [o.price, o.remainQty]),
      ask: this.ask.map((o) => [o.price, o.remainQty]),
      lastTradedPrice: this.lastTradedPrice,
    };
  }
}

module.exports = OrderBook;
