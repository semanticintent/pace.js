/**
 * Router for PACE views
 * Manages navigation and URL state
 */

export class Router {
  constructor(state) {
    this.state = state;
    this.history = [];
    this.currentView = 'product';
  }

  /**
   * Initialize router
   */
  init() {
    // Handle browser back/forward
    window.addEventListener('popstate', (e) => {
      if (e.state && e.state.view) {
        this.state.set('activeView', e.state.view);
      }
    });

    // Set initial route from URL hash
    const hash = window.location.hash.slice(1);
    if (hash) {
      this.currentView = hash;
      this.state.set('activeView', hash);
    }

    // Push initial state
    this.replaceState(this.currentView);
  }

  /**
   * Navigate to view
   */
  push(view) {
    this.currentView = view;
    this.history.push(view);

    // Update URL hash
    window.location.hash = view;

    // Push to browser history
    window.history.pushState({ view }, '', `#${view}`);
  }

  /**
   * Replace current state
   */
  replaceState(view) {
    this.currentView = view;

    window.history.replaceState({ view }, '', `#${view}`);
  }

  /**
   * Go back
   */
  back() {
    if (this.history.length > 1) {
      this.history.pop();
      const previousView = this.history[this.history.length - 1];
      this.state.set('activeView', previousView);
      window.history.back();
    }
  }

  /**
   * Get current view
   */
  getCurrentView() {
    return this.currentView;
  }

  /**
   * Get history
   */
  getHistory() {
    return [...this.history];
  }
}
