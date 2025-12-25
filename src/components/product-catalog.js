/**
 * Product Catalog Component
 * Displays and filters products
 */

export class ProductCatalog {
  constructor(products = [], state) {
    this.products = Array.isArray(products) ? products : [];
    this.state = state;
    this.filteredProducts = [...this.products];
  }

  /**
   * Render product catalog
   */
  render() {
    if (this.products.length === 0) {
      return this.renderEmpty();
    }

    const categories = this.groupByCategory();

    return `
      <div class="pace-product-catalog">
        <header class="pace-product-header">
          <h1>Products</h1>
          <div class="pace-product-filters">
            <input
              type="search"
              placeholder="Search products..."
              class="pace-search-input"
              data-pace-search
            />
          </div>
        </header>

        <div class="pace-product-grid">
          ${Object.entries(categories).map(([category, products]) => `
            <div class="pace-category-section">
              <h2 class="pace-category-title">${this.formatCategory(category)}</h2>
              <div class="pace-products">
                ${products.map(product => this.renderProduct(product)).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  /**
   * Render empty state
   */
  renderEmpty() {
    return `
      <div class="pace-empty-state">
        <i class="ph-duotone ph-package"></i>
        <h2>No products yet</h2>
        <p>Products will appear here when you add them to your catalog.</p>
      </div>
    `;
  }

  /**
   * Render individual product card
   */
  renderProduct(product) {
    return `
      <div class="pace-product-card" data-product-id="${product.id}">
        ${product.icon ? `<div class="pace-product-icon">${product.icon}</div>` : ''}
        <h3 class="pace-product-name">${product.name}</h3>
        <p class="pace-product-tagline">${product.tagline || ''}</p>
        <div class="pace-product-footer">
          <span class="pace-product-price">${product.price_display || 'free'}</span>
          ${this.renderAction(product)}
        </div>
      </div>
    `;
  }

  /**
   * Render product action button
   */
  renderAction(product) {
    const actions = {
      'github': { icon: 'ph-github-logo', text: 'View on GitHub' },
      'download': { icon: 'ph-download', text: 'Download' },
      'buy': { icon: 'ph-shopping-cart', text: 'Buy Now' },
      'demo': { icon: 'ph-play', text: 'Try Demo' }
    };

    const action = actions[product.action] || actions['github'];

    return `
      <a
        href="${product.action_url || '#'}"
        class="pace-product-action"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i class="ph-duotone ${action.icon}"></i>
        ${action.text}
      </a>
    `;
  }

  /**
   * Group products by category
   */
  groupByCategory() {
    return this.filteredProducts.reduce((acc, product) => {
      const category = product.category || 'uncategorized';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(product);
      return acc;
    }, {});
  }

  /**
   * Format category name
   */
  formatCategory(category) {
    return category
      .replace(/_/g, ' ')
      .replace(/\b\w/g, c => c.toUpperCase());
  }

  /**
   * Filter products by search query
   */
  search(query) {
    const lowerQuery = query.toLowerCase();

    this.filteredProducts = this.products.filter(product => {
      return (
        product.name.toLowerCase().includes(lowerQuery) ||
        (product.tagline && product.tagline.toLowerCase().includes(lowerQuery)) ||
        (product.description && product.description.toLowerCase().includes(lowerQuery)) ||
        (product.category && product.category.toLowerCase().includes(lowerQuery))
      );
    });

    return this.filteredProducts;
  }

  /**
   * Filter by category
   */
  filterByCategory(category) {
    if (!category) {
      this.filteredProducts = [...this.products];
    } else {
      this.filteredProducts = this.products.filter(p => p.category === category);
    }

    return this.filteredProducts;
  }

  /**
   * Attach event listeners
   */
  attachListeners(container) {
    // Search input
    const searchInput = container.querySelector('[data-pace-search]');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.search(e.target.value);
        this.update(container);
      });
    }

    // Product cards (for modal/detail view)
    container.querySelectorAll('.pace-product-card').forEach(card => {
      card.addEventListener('click', (e) => {
        // Don't trigger on action button clicks
        if (e.target.closest('.pace-product-action')) return;

        const productId = card.dataset.productId;
        const product = this.products.find(p => p.id === productId);

        if (product) {
          this.state.set('selectedProduct', product);
          // Emit event for modal/detail view
          document.dispatchEvent(new CustomEvent('pace:product-selected', {
            detail: { product }
          }));
        }
      });
    });
  }

  /**
   * Update rendered content
   */
  update(container) {
    const view = container.querySelector('.pace-view[data-view="product"]');
    if (view) {
      view.innerHTML = this.render();
      this.attachListeners(container);
    }
  }

  /**
   * Add product
   */
  add(product) {
    this.products.push(product);
    this.filteredProducts = [...this.products];
  }

  /**
   * Remove product
   */
  remove(productId) {
    this.products = this.products.filter(p => p.id !== productId);
    this.filteredProducts = [...this.products];
  }

  /**
   * Get all products
   */
  getAll() {
    return [...this.products];
  }

  /**
   * Get filtered products
   */
  getFiltered() {
    return [...this.filteredProducts];
  }
}
