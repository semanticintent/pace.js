/**
 * Chat Widget Component
 * AI-powered conversational interface
 */

export class ChatWidget {
  constructor(config, state) {
    this.config = config;
    this.state = state;
    this.adapter = null;

    this.initializeAdapter();
  }

  /**
   * Initialize chat adapter
   */
  initializeAdapter() {
    // Import adapter based on provider
    // For now, we'll use a simple mock adapter
    this.adapter = {
      sendMessage: async (message) => {
        // Mock response - will be replaced with real adapter
        return `Echo: ${message}`;
      }
    };
  }

  /**
   * Render chat widget
   */
  render() {
    const chatHistory = this.state.get('chatHistory') || [];

    return `
      <div class="pace-chat-widget">
        <header class="pace-chat-header">
          <h1>Chat</h1>
          <p class="pace-chat-subtitle">${this.config.subtitle || 'Ask anything about our products'}</p>
        </header>

        <div class="pace-chat-container">
          <div class="pace-chat-messages" data-pace-messages>
            ${chatHistory.length === 0 ? this.renderEmptyState() : this.renderMessages(chatHistory)}
          </div>

          <div class="pace-chat-input-wrapper">
            <textarea
              class="pace-chat-input"
              placeholder="${this.config.placeholder || 'Ask anything...'}"
              data-pace-chat-input
              rows="1"
            ></textarea>
            <div class="pace-chat-actions">
              <button class="pace-chat-voice-btn" data-pace-voice title="Voice input (coming soon)">
                <i class="ph-duotone ph-microphone"></i>
              </button>
              <button class="pace-chat-send-btn" data-pace-send title="Send message">
                <i class="ph-duotone ph-paper-plane-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Render empty state
   */
  renderEmptyState() {
    const suggestions = this.config.suggestions || [
      "What products do you offer?",
      "Tell me about your pricing",
      "How do I get started?"
    ];

    return `
      <div class="pace-chat-empty">
        <div class="pace-chat-welcome">
          <i class="ph-duotone ph-chats-circle"></i>
          <h3>How can I help?</h3>
          <p>Ask me anything about our products and services.</p>
        </div>

        <div class="pace-chat-suggestions">
          ${suggestions.map(suggestion => `
            <button class="pace-chat-suggestion" data-suggestion="${suggestion}">
              ${suggestion}
            </button>
          `).join('')}
        </div>
      </div>
    `;
  }

  /**
   * Render chat messages
   */
  renderMessages(messages) {
    return messages.map(msg => `
      <div class="pace-chat-message ${msg.role}">
        <div class="pace-message-avatar">
          ${msg.role === 'user' ? '<i class="ph-duotone ph-user"></i>' : '<i class="ph-duotone ph-robot"></i>'}
        </div>
        <div class="pace-message-content">
          ${this.formatMessage(msg.content)}
        </div>
      </div>
    `).join('');
  }

  /**
   * Format message content (supports markdown)
   */
  formatMessage(content) {
    // Basic markdown support
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code>$1</code>')
      .replace(/\n/g, '<br>');
  }

  /**
   * Attach event listeners
   */
  attachListeners(container) {
    const input = container.querySelector('[data-pace-chat-input]');
    const sendBtn = container.querySelector('[data-pace-send]');
    const voiceBtn = container.querySelector('[data-pace-voice]');
    const suggestions = container.querySelectorAll('[data-suggestion]');

    // Send message
    if (sendBtn) {
      sendBtn.addEventListener('click', () => this.handleSend(input, container));
    }

    // Enter to send (Shift+Enter for new line)
    if (input) {
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          this.handleSend(input, container);
        }
      });

      // Auto-resize textarea
      input.addEventListener('input', (e) => {
        e.target.style.height = 'auto';
        e.target.style.height = e.target.scrollHeight + 'px';
      });
    }

    // Voice button (placeholder)
    if (voiceBtn) {
      voiceBtn.addEventListener('click', () => {
        this.showToast('Voice input coming soon!');
      });
    }

    // Suggestion buttons
    suggestions.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const suggestion = e.target.dataset.suggestion;
        if (input) {
          input.value = suggestion;
          this.handleSend(input, container);
        }
      });
    });
  }

  /**
   * Handle send message
   */
  async handleSend(input, container) {
    const message = input.value.trim();

    if (!message) return;

    // Add user message to history
    const chatHistory = this.state.get('chatHistory') || [];
    chatHistory.push({
      role: 'user',
      content: message,
      timestamp: Date.now()
    });

    this.state.set('chatHistory', chatHistory);

    // Clear input
    input.value = '';
    input.style.height = 'auto';

    // Update UI
    this.update(container);

    // Show loading
    this.showLoading(container);

    try {
      // Send to AI adapter
      const response = await this.adapter.sendMessage(message);

      // Add assistant response
      chatHistory.push({
        role: 'assistant',
        content: response,
        timestamp: Date.now()
      });

      this.state.set('chatHistory', chatHistory);

      // Update UI
      this.update(container);
    } catch (error) {
      console.error('Chat error:', error);
      this.showToast('Failed to send message. Please try again.');
    } finally {
      this.hideLoading(container);
    }
  }

  /**
   * Show loading indicator
   */
  showLoading(container) {
    const messagesEl = container.querySelector('[data-pace-messages]');
    if (messagesEl) {
      const loadingEl = document.createElement('div');
      loadingEl.className = 'pace-chat-loading';
      loadingEl.innerHTML = `
        <div class="pace-message-avatar">
          <i class="ph-duotone ph-robot"></i>
        </div>
        <div class="pace-loading-dots">
          <span></span><span></span><span></span>
        </div>
      `;
      messagesEl.appendChild(loadingEl);
      messagesEl.scrollTop = messagesEl.scrollHeight;
    }
  }

  /**
   * Hide loading indicator
   */
  hideLoading(container) {
    const loadingEl = container.querySelector('.pace-chat-loading');
    if (loadingEl) {
      loadingEl.remove();
    }
  }

  /**
   * Show toast notification
   */
  showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'pace-toast';
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('show');
    }, 10);

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  /**
   * Update rendered content
   */
  update(container) {
    const view = container.querySelector('.pace-view[data-view="chat"]');
    if (view) {
      view.innerHTML = this.render();
      this.attachListeners(container);

      // Scroll to bottom
      const messagesEl = view.querySelector('[data-pace-messages]');
      if (messagesEl) {
        messagesEl.scrollTop = messagesEl.scrollHeight;
      }
    }
  }

  /**
   * Clear chat history
   */
  clear() {
    this.state.set('chatHistory', []);
  }
}
