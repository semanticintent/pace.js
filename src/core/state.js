/**
 * State Management for PACE
 * Simple reactive state store
 */

export class State {
  constructor(initialState = {}) {
    this.data = {
      activeView: 'product',
      selectedProduct: null,
      chatHistory: [],
      executiveSummaryData: {},
      filters: {},
      ...initialState
    };

    this.listeners = new Map();
  }

  /**
   * Get state value
   */
  get(key) {
    return this.data[key];
  }

  /**
   * Set state value
   */
  set(key, value) {
    const oldValue = this.data[key];
    this.data[key] = value;

    // Notify listeners
    this.notify(key, value, oldValue);
  }

  /**
   * Update nested state
   */
  update(key, updater) {
    const oldValue = this.data[key];
    const newValue = typeof updater === 'function'
      ? updater(oldValue)
      : updater;

    this.set(key, newValue);
  }

  /**
   * Subscribe to state changes
   */
  subscribe(key, callback) {
    if (!this.listeners.has(key)) {
      this.listeners.set(key, []);
    }

    this.listeners.get(key).push(callback);

    // Return unsubscribe function
    return () => {
      const callbacks = this.listeners.get(key);
      const index = callbacks.indexOf(callback);
      if (index > -1) {
        callbacks.splice(index, 1);
      }
    };
  }

  /**
   * Notify listeners of changes
   */
  notify(key, newValue, oldValue) {
    if (this.listeners.has(key)) {
      this.listeners.get(key).forEach(callback => {
        callback(newValue, oldValue);
      });
    }

    // Also notify wildcard listeners
    if (this.listeners.has('*')) {
      this.listeners.get('*').forEach(callback => {
        callback({ key, newValue, oldValue });
      });
    }
  }

  /**
   * Get all state
   */
  getAll() {
    return { ...this.data };
  }

  /**
   * Reset state
   */
  reset() {
    this.data = {
      activeView: 'product',
      selectedProduct: null,
      chatHistory: [],
      executiveSummaryData: {},
      filters: {}
    };

    this.notify('*', this.data, {});
  }
}
