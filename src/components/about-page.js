/**
 * About Page Component
 * Displays information about the platform
 */

export class AboutPage {
  constructor(config, state) {
    this.config = config;
    this.state = state;
  }

  /**
   * Render about page
   */
  render() {
    return `
      <div class="pace-about-page">
        <header class="pace-about-header">
          <h1>${this.config.title || 'About'}</h1>
          ${this.config.subtitle ? `<p class="pace-about-subtitle">${this.config.subtitle}</p>` : ''}
        </header>

        <div class="pace-about-content">
          ${this.renderSections()}
        </div>

        ${this.renderPACEBadge()}
      </div>
    `;
  }

  /**
   * Render sections
   */
  renderSections() {
    if (!this.config.sections || this.config.sections.length === 0) {
      return this.renderDefaultContent();
    }

    return this.config.sections.map(section => {
      if (typeof section === 'string') {
        return this.renderDefaultSection(section);
      } else {
        return this.renderCustomSection(section);
      }
    }).join('');
  }

  /**
   * Render default content
   */
  renderDefaultContent() {
    return `
      <section class="pace-about-section">
        <h2>About This Platform</h2>
        <p>This platform is built using the <strong>PACE Pattern</strong> - an AI-native UX framework designed for modern storefronts.</p>

        <h3>What is PACE?</h3>
        <p>PACE stands for <strong>Product, About, Chat, Executive Summary</strong>. It's a pattern that combines:</p>
        <ul>
          <li><strong>Product</strong> - Intelligent catalog with discovery</li>
          <li><strong>About</strong> - Context and trust-building</li>
          <li><strong>Chat</strong> - AI-powered guidance</li>
          <li><strong>Executive Summary</strong> - Real-time insights</li>
        </ul>
      </section>
    `;
  }

  /**
   * Render default section by name
   */
  renderDefaultSection(name) {
    const sections = {
      overview: `
        <section class="pace-about-section">
          <h2>Overview</h2>
          <p>${this.config.description || 'Welcome to our platform.'}</p>
        </section>
      `,
      team: `
        <section class="pace-about-section">
          <h2>Team</h2>
          <p>Built with care by our team.</p>
        </section>
      `,
      principles: `
        <section class="pace-about-section">
          <h2>Principles</h2>
          <ul>
            <li>User-first design</li>
            <li>AI-powered assistance</li>
            <li>Transparent and ethical</li>
          </ul>
        </section>
      `
    };

    return sections[name] || '';
  }

  /**
   * Render custom section
   */
  renderCustomSection(section) {
    return `
      <section class="pace-about-section">
        ${section.title ? `<h2>${section.title}</h2>` : ''}
        ${section.content || ''}
      </section>
    `;
  }

  /**
   * Render PACE badge
   */
  renderPACEBadge() {
    return `
      <div class="pace-powered-by">
        <a
          href="https://doi.org/10.5281/zenodo.18049371"
          target="_blank"
          rel="noopener noreferrer"
          class="pace-badge"
        >
          <span class="pace-badge-label">PACE</span>
          <span class="pace-badge-version">1.0.1</span>
        </a>
        <p class="pace-badge-text">
          Built with the <a href="https://github.com/semanticintent/pace.js" target="_blank">PACE Pattern</a>
        </p>
      </div>
    `;
  }

  /**
   * Attach event listeners
   */
  attachListeners(container) {
    // Can add interactive elements here if needed
  }
}
