# p5 Art Dreams

Autonomous generative art exploration using p5.js — created and managed by Cerebro (AI assistant).

## About

This project is an ongoing experiment in algorithmic creativity. New sketches are generated autonomously via cron jobs, exploring different p5.js techniques, visual styles, and mathematical concepts.

## Exploration Categories

The project cycles through different technique categories to ensure variety:

- **Shaders & GLSL** — Custom fragment shaders for GPU-accelerated visuals
- **Physics Simulations** — Particle systems with forces (Coriolis, gravity, drag)
- **Cellular Automata & Reaction-Diffusion** — Mathematical pattern formation (Gray-Scott model)
- **Painterly & Textural** — Canvas textures, brush strokes, organic mark-making
- **Noise-Driven (Perlin, Simplex)** — Flow fields, noise-based generative art
- **Fractals & Recursive Algorithms** — Self-similar patterns, recursive geometry
- **Data Visualization / Sonification** — Audio-reactive and data-driven visuals

## Sketches

| Sketch | Technique | Description |
|--------|-----------|-------------|
| wave-interference | Physics | Wave interference patterns with multiple sources |

| trochoidal-waves | Math | Parametric trochoid curves creating mesmerizing geometric patterns |
| thermal-drift | Shaders | GLSL shader with FBM noise, thermal color palette |
| turing-patterns | Cellular | Reaction-diffusion patterns creating spots and stripes |
| coriolis-field | Physics | Particle simulation with Coriolis force |
| reaction-diffusion | Cellular | Gray-Scott reaction-diffusion model |
| akashic-brush | Painterly | Brush strokes on textured canvas |
| iso-density | Noise | Perlin noise flow field |
| cellular-tessellation | Geometry | Hexagonal grid with pulsing cells |
| chromatic-strata | Geometry | Abstract layered bands with emergent color blending |
| quantum-foam | Physics | Quantum foam visualization |
| neural-bloom | Networks | Neural network-inspired patterns |
| orbital-decay | Physics | Orbital mechanics simulation |
| resonance-cavities | Audio | Resonant frequency visualization |
| stasis-field | Physics | Static field effects |
| strange-attractors | Math | Chaotic attractor rendering |
| phase-portraits | Math | Phase space visualization |
| temporal-fractures | Fractals | Temporal fractal patterns |
| void-geometry | Geometry | Abstract void geometry |
| recursive-ember | Fractals | Recursive fractal embers rising with glowing particles |
| chromatic-strata | Geometry | Abstract layered bands with emergent color blending |
| voronoi-dreams | Geometry | Voronoi cells influenced by moving attractors with pulsing glow |
| diffraction-grating | Physics | Light spectrum interference patterns with multiple slits |
| fractal-canopy | Fractals | Recursive branching tree with organic sway and golden hour palette |
| lissajous-knots | Math | Parametric Lissajous curves forming woven knot patterns |
| menger-sponge | Fractals | 3D Menger sponge fractal with animated rotation and color cycling |
| neon-streaming | Noise | Glowing particle streams with Perlin flow field and trail effects |
| phyllotaxis-bloom | Math | Golden angle spiral patterns with emergent flower-like bloom |
| moire-weave | Physics | Overlapping oscillating grids creating interference moire patterns |
| concentric-tensions | Geometry | Oscillating concentric rings with connecting tension lines |
| helix-fields | Noise | Rotating helical flow fields with 3D perspective projection |
| recursive-polygons | Fractals | Nested geometric shapes with recursive subdivision |
| wave-particles | Physics+Noise | Wave interference combined with particle dynamics |
| turbulent-flow | Noise | Perlin noise flow field with particle trails and spectral colors |
| metaballs | Geometry | Organic blob dynamics using marching squares algorithm |

...and more.

## Running

Open any `.html` file in a browser. All sketches are self-contained single HTML files.

```bash
# Or serve locally
cd p5-art-dreams
python3 -m http.server 8000
# Then open http://localhost:8000
```

## Tech Stack

- **p5.js** — Rendering library
- **GLSL** — Custom shaders (where used)
- Plain HTML/JS — No build step required

## Created By

Cerebro — autonomous AI assistant exploring generative art

## License

MIT
