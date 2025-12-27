<div align="center">

# PACE.js

### AI-native storefront framework for the modern web

**15KB • Zero Dependencies • Framework Agnostic**

[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.18049371.svg)](https://doi.org/10.5281/zenodo.18049371)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub Stars](https://img.shields.io/github/stars/semanticintent/pace.js?style=social)](https://github.com/semanticintent/pace.js)

[Quick Start](#-quick-start) • [Examples](#-examples) • [Documentation](#-documentation) • [Demo](https://demo.millpond.dev)

</div>

---

## What is PACE?

**PACE** stands for **Product, About, Chat, Executive Summary** — a UX pattern designed specifically for AI-powered storefronts and product catalogs.

Traditional e-commerce patterns don't work well for AI tools, MCP servers, and modern SaaS products. PACE solves this by combining four essential components:

<table>
<tr>
<td width="25%" align="center">
<br>
<strong>📦 Product</strong><br>
<sub>Intelligent catalog with filtering and discovery</sub>
</td>
<td width="25%" align="center">
<br>
<strong>ℹ️ About</strong><br>
<sub>Context and trust-building before commitment</sub>
</td>
<td width="25%" align="center">
<br>
<strong>💬 Chat</strong><br>
<sub>AI-powered guided discovery</sub>
</td>
<td width="25%" align="center">
<br>
<strong>🎯 Executive Summary</strong><br>
<sub>Real-time insights and recommendations</sub>
</td>
</tr>
</table>

---

## Why PACE?

<table>
<tr>
<th>Traditional E-commerce</th>
<th>PACE Pattern</th>
</tr>
<tr>
<td>Product-first</td>
<td><strong>Conversation-first</strong></td>
</tr>
<tr>
<td>Transactional</td>
<td><strong>Relational</strong></td>
</tr>
<tr>
<td>Static categories</td>
<td><strong>AI-guided discovery</strong></td>
</tr>
<tr>
<td>One-size-fits-all</td>
<td><strong>Contextual recommendations</strong></td>
</tr>
<tr>
<td>Admin-only analytics</td>
<td><strong>Visible insights</strong></td>
</tr>
</table>

---

## ✨ Features

- ⚡ **Lightweight** — 15KB minified + gzipped (6x smaller than React)
- 🚀 **Zero Dependencies** — Pure vanilla JavaScript
- 🎨 **Framework Agnostic** — Works standalone or with React, Vue, Svelte
- 🤖 **AI-Powered Chat** — Built-in Claude, OpenAI, and custom adapters
- 📊 **Executive Summary** — Real-time conversation insights
- 🎯 **Pattern-Based** — Encodes PACE Pattern into reusable framework
- 🔌 **Extensible** — Plugin system, themes, and adapters
- 📱 **Responsive** — Mobile-first design
- ♿ **Accessible** — WCAG 2.1 compliant
- 🎓 **Academic** — Published on Zenodo with DOI

---

## 🚀 Quick Start

### Installation

**Via NPM:**
```bash
npm install @semanticintent/pace-pattern
```

**Via CDN:**
```html
<script type="module" src="https://unpkg.com/@semanticintent/pace-pattern@latest/dist/pace.esm.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@semanticintent/pace-pattern@latest/dist/pace.min.css">
```

### Minimal Example

Create an `index.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My AI Storefront</title>

  <!-- Phosphor Icons -->
  <script src="https://unpkg.com/@phosphor-icons/web"></script>

  <!-- PACE.js CSS -->
  <link rel="stylesheet" href="https://unpkg.com/@semanticintent/pace-pattern/dist/pace.min.css">
</head>
<body>
  <div id="app"></div>

  <script type="module">
    import { PACE } from 'https://unpkg.com/@semanticintent/pace-pattern/dist/pace.esm.js';

    const pace = new PACE({
      container: '#app',
      products: './products.json'
    });

    pace.mount();
  </script>
</body>
</html>
```

Create a `products.json`:

```json
{
  "products": [
    {
      "id": "my-product",
      "name": "My First Product",
      "tagline": "A great AI tool",
      "category": "tools",
      "price_display": "free",
      "description": "## My Product\n\nThis is amazing!",
      "action": "github",
      "action_url": "https://github.com/you/product"
    }
  ]
}
```

**That's it!** Open `index.html` in your browser. 🎉

---

## ⚙️ Configuration

PACE.js is highly configurable while maintaining sensible defaults:

```javascript
const pace = new PACE({
  // Required
  container: '#app',
  products: './products.json', // or inline array

  // About Page
  about: {
    title: 'About Us',
    subtitle: 'Building the future of AI tools',
    sections: [
      { title: 'Our Mission', content: '<p>...</p>' },
      { title: 'Team', content: '<p>...</p>' }
    ]
  },

  // Chat Widget
  chat: {
    enabled: true,
    provider: 'claude',
    apiKey: process.env.ANTHROPIC_API_KEY,
    model: 'claude-3-5-sonnet-20241022',
    placeholder: 'Ask about our products...',
    suggestions: [
      'What products do you offer?',
      'How do I get started?'
    ]
  },

  // Executive Summary
  executiveSummary: {
    enabled: true,
    updateInterval: 30000, // 30 seconds
    insights: ['trends', 'recommendations', 'key_moments']
  },

  // Theme
  theme: {
    primaryColor: '#667eea',
    accentColor: '#764ba2',
    font: 'Inter, system-ui, sans-serif'
  }
});

pace.mount();
```

---

## 📦 Product Format

Products are defined in simple JSON:

```json
{
  "products": [
    {
      "id": "unique-id",
      "name": "Product Name",
      "tagline": "One-line description",
      "category": "mcp_servers",
      "price_display": "free",
      "icon": "🚀",
      "description": "## Markdown Description\n\nSupports **markdown** formatting!",
      "action": "github",
      "action_url": "https://github.com/..."
    }
  ]
}
```

**Supported actions:**
- `github` — Link to GitHub repository
- `demo` — Link to live demo
- `download` — Download link
- `buy` — Purchase link

---

## 🎨 Examples

### Standalone Site
```bash
# Clone and run
git clone https://github.com/semanticintent/pace.js
cd pace.js/examples/minimal
python -m http.server 8000
# Visit http://localhost:8000
```

### React Integration
```jsx
import { useEffect, useRef } from 'react';
import { PACE } from '@semanticintent/pace-pattern';

function Store() {
  const ref = useRef(null);

  useEffect(() => {
    const pace = new PACE({
      container: ref.current,
      products: './products.json'
    });
    pace.mount();

    return () => pace.destroy();
  }, []);

  return <div ref={ref} />;
}
```

### Vue Integration
```vue
<template>
  <div ref="container"></div>
</template>

<script>
import { PACE } from '@semanticintent/pace-pattern';

export default {
  mounted() {
    this.pace = new PACE({
      container: this.$refs.container,
      products: './products.json'
    });
    this.pace.mount();
  },
  beforeUnmount() {
    this.pace.destroy();
  }
}
</script>
```

---

## 🔌 Extensibility

### Plugins

```javascript
class AnalyticsPlugin {
  init(pace) {
    pace.on('product-selected', ({ detail }) => {
      gtag('event', 'view_item', { item_id: detail.product.id });
    });
  }
}

pace.use(new AnalyticsPlugin());
```

### Custom AI Adapters

```javascript
class CustomAdapter {
  async sendMessage(message, context) {
    const response = await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify({ message })
    });
    return response.json();
  }
}

pace.components.chat.adapter = new CustomAdapter();
```

### Themes

```javascript
// Override CSS variables
pace.setTheme({
  primaryColor: '#ff6b6b',
  accentColor: '#4ecdc4',
  font: 'Poppins, sans-serif'
});
```

---

## 📚 Documentation

- [**DESIGN_PRINCIPLES.md**](./DESIGN_PRINCIPLES.md) — Architecture, philosophy, and technical design
- [**QUICK_START.md**](./QUICK_START.md) — Get up and running in 5 minutes
- [**PROJECT_STATUS.md**](./PROJECT_STATUS.md) — Current status and roadmap
- [API Reference](#) — Coming soon
- [Chat Adapters](#) — Coming soon
- [Plugin Development](#) — Coming soon

---

## 🌟 Reference Implementation

**MillPond Storefront** is the official reference implementation of PACE 1.0.1:

- 🎯 **Interactive Demo**: [demo.millpond.dev](https://demo.millpond.dev) - PACE 1.0.1 pattern showcase
- 🏪 **Production Site**: [millpond.dev](https://millpond.dev) - Live storefront with AI chat
- 🔗 **Source Code**: [github.com/semanticintent/millpond-storefront](https://github.com/semanticintent/millpond-storefront)

---

## 📊 Comparison

| Feature | PACE.js | React | Vue | Alpine.js |
|---------|---------|-------|-----|-----------|
| **Size** | 15KB | 42KB | 34KB | 15KB |
| **Dependencies** | 0 | 2+ | 1+ | 0 |
| **Build Required** | ❌ | ✅ | ✅ | ❌ |
| **Learning Curve** | 5 min | Hours | Hours | 15 min |
| **AI-Native** | ✅ | ❌ | ❌ | ❌ |
| **Pattern-Based** | ✅ | ❌ | ❌ | ❌ |

---

## 🎓 Citation

PACE.js implements the PACE Pattern published on Zenodo. If you use this in your research or project, please cite:

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

---

## 🗺️ Roadmap

### ✅ v1.0 (Current)
- Core framework
- Four main components
- Basic theming
- Plugin system
- Working examples

### 🔜 v1.1 (Next)
- [ ] NPM package published
- [ ] Build system (Rollup)
- [ ] TypeScript definitions
- [ ] Claude API adapter
- [ ] OpenAI API adapter

### 🔮 v2.0 (Future)
- [ ] Advanced analytics
- [ ] A/B testing
- [ ] Multi-language support
- [ ] Mobile app wrappers
- [ ] Headless CMS integration

See [PROJECT_STATUS.md](./PROJECT_STATUS.md) for detailed roadmap.

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. 🐛 **Report bugs** — Open an issue
2. 💡 **Suggest features** — Start a discussion
3. 📝 **Improve docs** — Submit a PR
4. 🎨 **Create themes** — Share with community
5. 🔌 **Build plugins** — Extend functionality

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

---

## 📄 License

MIT © [Semantic Intent](https://github.com/semanticintent)

See [LICENSE](./LICENSE) for details.

---

## 🙏 Acknowledgments

- Built with inspiration from Alpine.js, Preact, and the PACE Pattern
- Powered by [Phosphor Icons](https://phosphoricons.com/)
- Published on [Zenodo](https://zenodo.org/)

---

## 📞 Support

- 📖 [Documentation](./DESIGN_PRINCIPLES.md)
- 💬 [Discussions](https://github.com/semanticintent/pace.js/discussions)
- 🐛 [Issues](https://github.com/semanticintent/pace.js/issues)
- 🌐 [Website](https://doi.org/10.5281/zenodo.18049371)

---

<div align="center">

**Built with ❤️ using the PACE Pattern**

⭐ **Star this repo** if you find it useful!

</div>
