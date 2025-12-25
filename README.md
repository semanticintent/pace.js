# PACE.js

> **PACE Pattern** - AI-native storefront framework for the modern web

[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.18049371.svg)](https://doi.org/10.5281/zenodo.18049371)
[![npm version](https://badge.fury.io/js/@semanticintent%2Fpace-pattern.svg)](https://www.npmjs.com/package/@semanticintent/pace-pattern)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## What is PACE?

**PACE** stands for **Product, About, Chat, Executive Summary** - a UX pattern designed specifically for AI-powered storefronts and product catalogs.

Traditional e-commerce patterns don't work well for AI tools, MCP servers, and modern SaaS products. PACE solves this by combining:

- **Product** - Intelligent catalog with filtering and discovery
- **About** - Context and trust-building before commitment
- **Chat** - AI-powered guided discovery
- **Executive Summary** - Real-time insights and recommendations

## Why PACE?

| Traditional E-commerce | PACE Pattern |
|------------------------|--------------|
| Product-first | Conversation-first |
| Transactional | Relational |
| Static categories | AI-guided discovery |
| One-size-fits-all | Contextual recommendations |
| Admin-only analytics | Visible insights |

## Quick Start

### Installation

```bash
npm install @semanticintent/pace-pattern
```

Or via CDN:

```html
<script src="https://unpkg.com/@semanticintent/pace-pattern@latest/dist/pace.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@semanticintent/pace-pattern@latest/dist/pace.min.css">
```

### Minimal Example

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="https://unpkg.com/@semanticintent/pace-pattern/dist/pace.min.css">
</head>
<body>
  <div id="pace-app"></div>

  <script src="https://unpkg.com/@semanticintent/pace-pattern/dist/pace.min.js"></script>
  <script>
    const pace = new PACE({
      container: '#pace-app',
      products: './products.json',
      chat: {
        provider: 'claude',
        apiKey: 'YOUR_API_KEY'
      }
    });

    pace.mount();
  </script>
</body>
</html>
```

## Features

✅ **Zero Dependencies** - Vanilla JS, works everywhere
✅ **Framework Agnostic** - Use with Alpine.js, React, Vue, or vanilla
✅ **AI-Powered Chat** - Built-in Claude, OpenAI, and custom adapters
✅ **Intelligent Insights** - Executive Summary with real-time analysis
✅ **Fully Customizable** - Themes, plugins, and extensions
✅ **DevEx 2.0** - Thoughtful UX, lightweight architecture

## Configuration

```javascript
const pace = new PACE({
  // Container
  container: '#pace-app',

  // Products
  products: './products.json', // or inline array

  // About Page
  about: {
    title: 'About Us',
    sections: ['overview', 'team', 'principles']
  },

  // Chat
  chat: {
    provider: 'claude',
    apiKey: process.env.ANTHROPIC_API_KEY,
    model: 'claude-3-5-sonnet-20241022',
    systemPrompt: 'You are a helpful product guide...'
  },

  // Executive Summary
  executiveSummary: {
    enabled: true,
    updateInterval: 30000,
    insights: ['trends', 'recommendations']
  },

  // Theme
  theme: {
    primaryColor: '#667eea',
    accentColor: '#764ba2'
  }
});
```

## Product Format

PACE uses a simple JSON format for products:

```json
{
  "products": [
    {
      "id": "chirp-mcp",
      "name": "Chirp MCP",
      "tagline": "Twitter/X integration for Claude",
      "category": "mcp_servers",
      "price_display": "free",
      "description": "## Chirp MCP\n\nConnect Claude to Twitter/X...",
      "action": "github",
      "action_url": "https://github.com/..."
    }
  ]
}
```

## Examples

- **Minimal** - Bare-bones implementation ([view](./examples/minimal))
- **MillPond** - Full reference implementation ([view](./examples/millpond))
- **Custom Theme** - Styled example ([view](./examples/custom-theme))

## Reference Implementation

**MillPond Storefront** is the official reference implementation of PACE 1.0.1:

🔗 **Live Demo**: [millpond.dev](https://millpond.dev)
🔗 **Source Code**: [github.com/semanticintent/millpond-storefront](https://github.com/semanticintent/millpond-storefront)

## Documentation

- [Getting Started](./docs/getting-started.md)
- [API Reference](./docs/api-reference.md)
- [Customization Guide](./docs/customization.md)
- [Chat Adapters](./docs/chat-adapters.md)
- [Theming](./docs/theming.md)

## Citation

If you use PACE in your research or project, please cite:

```bibtex
@software{pace_pattern_2024,
  author = {Semantic Intent},
  title = {PACE Pattern: Product, About, Chat, Executive Summary},
  year = {2024},
  publisher = {Zenodo},
  version = {1.0.1},
  doi = {10.5281/zenodo.18049371},
  url = {https://doi.org/10.5281/zenodo.18049371}
}
```

## Contributing

Contributions welcome! Please read our [Contributing Guide](./CONTRIBUTING.md).

## License

MIT © [Semantic Intent](https://github.com/semanticintent)

---

**Built with ❤️ using the PACE Pattern**
