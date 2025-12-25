/**
 * Executive Summary Component
 * Displays insights and analytics from user interaction
 */

export class ExecutiveSummary {
  constructor(config, state) {
    this.config = config;
    this.state = state;
    this.updateTimer = null;

    this.startAutoUpdate();
  }

  /**
   * Start auto-update timer
   */
  startAutoUpdate() {
    if (this.config.updateInterval) {
      this.updateTimer = setInterval(() => {
        this.analyzeAndUpdate();
      }, this.config.updateInterval);
    }
  }

  /**
   * Analyze conversation and update insights
   */
  analyzeAndUpdate() {
    const chatHistory = this.state.get('chatHistory') || [];
    const insights = this.generateInsights(chatHistory);

    this.state.set('executiveSummaryData', insights);
  }

  /**
   * Generate insights from chat history
   */
  generateInsights(chatHistory) {
    if (chatHistory.length === 0) {
      return {
        messageCount: 0,
        trends: [],
        recommendations: []
      };
    }

    // Count messages
    const userMessages = chatHistory.filter(m => m.role === 'user');
    const assistantMessages = chatHistory.filter(m => m.role === 'assistant');

    // Extract keywords
    const keywords = this.extractKeywords(userMessages);

    // Detect trends
    const trends = this.detectTrends(keywords);

    // Generate recommendations
    const recommendations = this.generateRecommendations(trends);

    return {
      messageCount: chatHistory.length,
      userMessageCount: userMessages.length,
      assistantMessageCount: assistantMessages.length,
      keywords: keywords.slice(0, 10),
      trends,
      recommendations,
      lastUpdated: Date.now()
    };
  }

  /**
   * Extract keywords from messages
   */
  extractKeywords(messages) {
    const text = messages.map(m => m.content).join(' ').toLowerCase();
    const words = text.split(/\s+/);

    // Filter out common words
    const stopWords = ['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'is', 'are', 'was', 'were', 'been', 'be', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'can', 'may', 'might'];

    const keywords = words
      .filter(w => w.length > 3 && !stopWords.includes(w))
      .reduce((acc, word) => {
        acc[word] = (acc[word] || 0) + 1;
        return acc;
      }, {});

    return Object.entries(keywords)
      .sort((a, b) => b[1] - a[1])
      .map(([word, count]) => ({ word, count }));
  }

  /**
   * Detect trends from keywords
   */
  detectTrends(keywords) {
    const trends = [];

    // Example trend detection logic
    if (keywords.some(k => k.word.includes('price') || k.word.includes('cost'))) {
      trends.push({ type: 'pricing', description: 'User interested in pricing information' });
    }

    if (keywords.some(k => k.word.includes('feature') || k.word.includes('capability'))) {
      trends.push({ type: 'features', description: 'User exploring product features' });
    }

    if (keywords.some(k => k.word.includes('integration') || k.word.includes('api'))) {
      trends.push({ type: 'technical', description: 'User focused on technical integration' });
    }

    return trends;
  }

  /**
   * Generate recommendations based on trends
   */
  generateRecommendations(trends) {
    const recommendations = [];

    trends.forEach(trend => {
      if (trend.type === 'pricing') {
        recommendations.push({
          title: 'Show pricing page',
          description: 'User is interested in pricing details',
          action: 'Navigate to pricing'
        });
      }

      if (trend.type === 'features') {
        recommendations.push({
          title: 'Highlight key features',
          description: 'User wants to learn more about capabilities',
          action: 'View product details'
        });
      }

      if (trend.type === 'technical') {
        recommendations.push({
          title: 'Share documentation',
          description: 'User needs technical integration info',
          action: 'View API docs'
        });
      }
    });

    return recommendations;
  }

  /**
   * Render executive summary
   */
  render() {
    const data = this.state.get('executiveSummaryData') || {};

    if (!data.messageCount || data.messageCount === 0) {
      return this.renderEmptyState();
    }

    return `
      <div class="pace-executive-summary">
        <header class="pace-summary-header">
          <div class="pace-summary-title">
            <i class="ph-duotone ph-target"></i>
            <h1>Executive Summary</h1>
          </div>
          <p class="pace-summary-subtitle">Your conversation at a glance</p>
        </header>

        <div class="pace-summary-content">
          <!-- Overview Stats -->
          <div class="pace-summary-stats">
            <div class="pace-stat-card">
              <div class="pace-stat-value">${data.userMessageCount || 0}</div>
              <div class="pace-stat-label">Questions Asked</div>
            </div>
            <div class="pace-stat-card">
              <div class="pace-stat-value">${data.assistantMessageCount || 0}</div>
              <div class="pace-stat-label">Responses Given</div>
            </div>
            <div class="pace-stat-card">
              <div class="pace-stat-value">${data.trends?.length || 0}</div>
              <div class="pace-stat-label">Trends Detected</div>
            </div>
          </div>

          <!-- Key Topics -->
          ${this.renderKeyTopics(data.keywords)}

          <!-- Trends -->
          ${this.renderTrends(data.trends)}

          <!-- Recommendations -->
          ${this.renderRecommendations(data.recommendations)}
        </div>
      </div>
    `;
  }

  /**
   * Render empty state
   */
  renderEmptyState() {
    return `
      <div class="pace-executive-summary">
        <header class="pace-summary-header">
          <div class="pace-summary-title">
            <i class="ph-duotone ph-target"></i>
            <h1>Executive Summary</h1>
          </div>
          <p class="pace-summary-subtitle">Your conversation at a glance</p>
        </header>

        <div class="pace-summary-empty">
          <i class="ph-duotone ph-chart-line-up"></i>
          <h3>No data yet</h3>
          <p>Start a conversation in the Chat to see insights and recommendations here.</p>
        </div>
      </div>
    `;
  }

  /**
   * Render key topics
   */
  renderKeyTopics(keywords) {
    if (!keywords || keywords.length === 0) return '';

    return `
      <section class="pace-summary-section">
        <h2>Key Topics</h2>
        <div class="pace-keyword-cloud">
          ${keywords.slice(0, 8).map(kw => `
            <span class="pace-keyword" style="font-size: ${1 + (kw.count / 10)}rem">
              ${kw.word}
            </span>
          `).join('')}
        </div>
      </section>
    `;
  }

  /**
   * Render trends
   */
  renderTrends(trends) {
    if (!trends || trends.length === 0) return '';

    return `
      <section class="pace-summary-section">
        <h2>Trends</h2>
        <div class="pace-trends">
          ${trends.map(trend => `
            <div class="pace-trend-card">
              <div class="pace-trend-icon">
                <i class="ph-duotone ph-trend-up"></i>
              </div>
              <div class="pace-trend-content">
                <strong>${trend.type}</strong>
                <p>${trend.description}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </section>
    `;
  }

  /**
   * Render recommendations
   */
  renderRecommendations(recommendations) {
    if (!recommendations || recommendations.length === 0) return '';

    return `
      <section class="pace-summary-section">
        <h2>Recommendations</h2>
        <div class="pace-recommendations">
          ${recommendations.map(rec => `
            <div class="pace-recommendation-card">
              <h3>${rec.title}</h3>
              <p>${rec.description}</p>
              <button class="pace-recommendation-action">
                ${rec.action}
              </button>
            </div>
          `).join('')}
        </div>
      </section>
    `;
  }

  /**
   * Attach event listeners
   */
  attachListeners(container) {
    // Recommendation action buttons
    container.querySelectorAll('.pace-recommendation-action').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const action = e.target.textContent.trim();
        document.dispatchEvent(new CustomEvent('pace:recommendation-action', {
          detail: { action }
        }));
      });
    });
  }

  /**
   * Cleanup
   */
  destroy() {
    if (this.updateTimer) {
      clearInterval(this.updateTimer);
    }
  }
}
