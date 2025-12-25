# PACE.js - Quick Start Guide

## Installation

### Option 1: NPM (Recommended)

```bash
npm install @semanticintent/pace-pattern
```

### Option 2: CDN

```html
<script src="https://unpkg.com/@semanticintent/pace-pattern@latest/dist/pace.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/@semanticintent/pace-pattern@latest/dist/pace.min.css">
```

### Option 3: Local Development

```bash
git clone https://github.com/semanticintent/pace.js
cd pace.js
npm install
npm run dev
```

## Minimal Example

Create an `index.html`:

```html
<!DOCTYPE html>
<html>
<head>
  <title>My PACE Store</title>
  <script src="https://unpkg.com/@phosphor-icons/web"></script>
  <link rel="stylesheet" href="https://unpkg.com/@semanticintent/pace-pattern/dist/pace.min.css">
</head>
<body>
  <div id="pace-app"></div>

  <script type="module">
    import { PACE } from 'https://unpkg.com/@semanticintent/pace-pattern/dist/pace.esm.js';

    const pace = new PACE({
      container: '#pace-app',
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
      "id": "product-1",
      "name": "My First Product",
      "tagline": "A great product",
      "category": "tools",
      "price_display": "free",
      "description": "## My First Product\n\nThis is a great product!",
      "action": "github",
      "action_url": "https://github.com/you/product"
    }
  ]
}
```

Open `index.html` in your browser. Done! 🎉

## Configuration

```javascript
const pace = new PACE({
  // Required
  container: '#pace-app',
  products: './products.json', // or inline array

  // Optional
  about: {
    title: 'About Us',
    subtitle: 'We build cool stuff',
    sections: [...]
  },

  chat: {
    enabled: true,
    provider: 'claude',
    apiKey: 'YOUR_KEY',
    placeholder: 'Ask anything...'
  },

  executiveSummary: {
    enabled: true,
    updateInterval: 30000
  },

  theme: {
    primaryColor: '#667eea',
    accentColor: '#764ba2'
  }
});
```

## Running Examples

```bash
cd examples/minimal
python -m http.server 8000
# or
npx serve .
```

Visit `http://localhost:8000`

## Next Steps

- [Full Documentation](./docs/README.md)
- [API Reference](./docs/api-reference.md)
- [Customization Guide](./docs/customization.md)
- [MillPond Example](./examples/millpond)

## Need Help?

- 📖 [Documentation](https://pace-pattern.dev/docs)
- 💬 [Discussions](https://github.com/semanticintent/pace.js/discussions)
- 🐛 [Issues](https://github.com/semanticintent/pace.js/issues)
- 📧 [Email](mailto:support@semanticintent.com)

## Citation

Built using the PACE Pattern (v1.0.1):

[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.18049371.svg)](https://doi.org/10.5281/zenodo.18049371)
