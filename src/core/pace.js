/**
 * PACE - Product, About, Chat, Executive Summary Pattern
 * @version 1.0.1
 * @license MIT
 * @author Semantic Intent
 */

import { State } from './state.js';
import { Router } from './router.js';
import { ProductCatalog } from '../components/product-catalog.js';
import { AboutPage } from '../components/about-page.js';
import { ChatWidget } from '../components/chat-widget.js';
import { ExecutiveSummary } from '../components/executive-summary.js';

export class PACE {
  constructor(config = {}) {
    this.config = this.mergeConfig(config);
    this.container = null;
    this.state = new State();
    this.router = new Router(this.state);
    this.components = {};
    this.plugins = [];

    this.validateConfig();
  }

  /**
   * Merge user config with defaults
   */
  mergeConfig(userConfig) {
    const defaults = {
      container: '#pace-app',
      products: [],
      about: {
        title: 'About',
        sections: ['overview']
      },
      chat: {
        enabled: true,
        provider: 'claude',
        placeholder: 'Ask anything...'
      },
      executiveSummary: {
        enabled: true,
        updateInterval: 30000
      },
      theme: {
        primaryColor: '#667eea',
        accentColor: '#764ba2',
        font: 'Inter, system-ui, sans-serif'
      }
    };

    return this.deepMerge(defaults, userConfig);
  }

  /**
   * Deep merge helper
   */
  deepMerge(target, source) {
    const output = { ...target };

    if (this.isObject(target) && this.isObject(source)) {
      Object.keys(source).forEach(key => {
        if (this.isObject(source[key])) {
          if (!(key in target)) {
            output[key] = source[key];
          } else {
            output[key] = this.deepMerge(target[key], source[key]);
          }
        } else {
          output[key] = source[key];
        }
      });
    }

    return output;
  }

  isObject(item) {
    return item && typeof item === 'object' && !Array.isArray(item);
  }

  /**
   * Validate configuration
   */
  validateConfig() {
    if (!this.config.container) {
      throw new Error('PACE: container is required');
    }
  }

  /**
   * Mount PACE to DOM
   */
  async mount() {
    // Find container
    this.container = typeof this.config.container === 'string'
      ? document.querySelector(this.config.container)
      : this.config.container;

    if (!this.container) {
      throw new Error(`PACE: container "${this.config.container}" not found`);
    }

    // Load products if URL provided
    if (typeof this.config.products === 'string') {
      this.config.products = await this.loadProducts(this.config.products);
    }

    // Initialize components
    this.initializeComponents();

    // Render
    this.render();

    // Apply theme
    this.applyTheme();

    // Attach event listeners
    this.attachEventListeners();

    // Initialize router
    this.router.init();

    // Run plugins
    this.plugins.forEach(plugin => plugin.init(this));

    // Emit ready event
    this.emit('ready');
  }

  /**
   * Load products from URL
   */
  async loadProducts(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to load products: ${response.statusText}`);
      }
      const data = await response.json();
      return data.products || data;
    } catch (error) {
      console.error('PACE: Error loading products', error);
      return [];
    }
  }

  /**
   * Initialize all components
   */
  initializeComponents() {
    this.components.product = new ProductCatalog(this.config.products, this.state);
    this.components.about = new AboutPage(this.config.about, this.state);

    if (this.config.chat.enabled) {
      this.components.chat = new ChatWidget(this.config.chat, this.state);
    }

    if (this.config.executiveSummary.enabled) {
      this.components.executiveSummary = new ExecutiveSummary(
        this.config.executiveSummary,
        this.state
      );
    }
  }

  /**
   * Render main structure
   */
  render() {
    this.container.innerHTML = `
      <div class="pace-container" data-pace-version="1.0.1">
        <!-- Sidebar -->
        <aside class="pace-sidebar">
          <div class="pace-brand">
            <div class="pace-logo">PACE</div>
            <div class="pace-version">1.0.1</div>
          </div>
          <nav class="pace-nav">
            <button class="pace-nav-item" data-view="product">
              <i class="ph-duotone ph-shopping-bag"></i>
              <span>Products</span>
            </button>
            <button class="pace-nav-item" data-view="about">
              <i class="ph-duotone ph-info"></i>
              <span>About</span>
            </button>
            ${this.config.chat.enabled ? `
              <button class="pace-nav-item" data-view="chat">
                <i class="ph-duotone ph-chat-circle"></i>
                <span>Chat</span>
              </button>
            ` : ''}
            ${this.config.executiveSummary.enabled ? `
              <button class="pace-nav-item" data-view="executive-summary">
                <i class="ph-duotone ph-target"></i>
                <span>Executive Summary</span>
              </button>
            ` : ''}
          </nav>
        </aside>

        <!-- Main Content -->
        <main class="pace-main">
          <div class="pace-view" data-view="product"></div>
          <div class="pace-view" data-view="about"></div>
          ${this.config.chat.enabled ? '<div class="pace-view" data-view="chat"></div>' : ''}
          ${this.config.executiveSummary.enabled ? '<div class="pace-view" data-view="executive-summary"></div>' : ''}
        </main>
      </div>
    `;

    // Render individual components
    Object.keys(this.components).forEach(key => {
      const view = this.container.querySelector(`.pace-view[data-view="${key}"]`);
      if (view) {
        view.innerHTML = this.components[key].render();
      }
    });
  }

  /**
   * Apply theme
   */
  applyTheme() {
    const { primaryColor, accentColor, font } = this.config.theme;

    const style = document.createElement('style');
    style.textContent = `
      :root {
        --pace-primary: ${primaryColor};
        --pace-accent: ${accentColor};
        --pace-font: ${font};
      }
    `;
    document.head.appendChild(style);
  }

  /**
   * Attach event listeners
   */
  attachEventListeners() {
    // Navigation
    this.container.querySelectorAll('.pace-nav-item').forEach(button => {
      button.addEventListener('click', (e) => {
        const view = e.currentTarget.dataset.view;
        this.navigateTo(view);
      });
    });

    // Component-specific listeners
    Object.values(this.components).forEach(component => {
      if (component.attachListeners) {
        component.attachListeners(this.container);
      }
    });
  }

  /**
   * Navigate to view
   */
  navigateTo(view) {
    this.state.set('activeView', view);
    this.router.push(view);

    // Update active nav item
    this.container.querySelectorAll('.pace-nav-item').forEach(item => {
      item.classList.toggle('active', item.dataset.view === view);
    });

    // Show/hide views
    this.container.querySelectorAll('.pace-view').forEach(viewEl => {
      viewEl.style.display = viewEl.dataset.view === view ? 'block' : 'none';
    });

    this.emit('navigate', { view });
  }

  /**
   * Add plugin
   */
  use(plugin) {
    this.plugins.push(plugin);
    return this;
  }

  /**
   * Get component
   */
  getComponent(name) {
    return this.components[name];
  }

  /**
   * Event emitter
   */
  emit(event, data = {}) {
    const customEvent = new CustomEvent(`pace:${event}`, {
      detail: { ...data, pace: this }
    });
    document.dispatchEvent(customEvent);
  }

  /**
   * Event listener
   */
  on(event, callback) {
    document.addEventListener(`pace:${event}`, callback);
    return this;
  }

  /**
   * Destroy instance
   */
  destroy() {
    // Clean up event listeners
    Object.values(this.components).forEach(component => {
      if (component.destroy) {
        component.destroy();
      }
    });

    // Clear container
    if (this.container) {
      this.container.innerHTML = '';
    }

    this.emit('destroy');
  }
}

// Export for UMD/browser
if (typeof window !== 'undefined') {
  window.PACE = PACE;
}
