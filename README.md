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

- **flocking-murmuration** — Boids simulation with realistic flocking behavior (alignment, cohesion, separation)
- **dla-clusters** — Diffusion Limited Aggregation with wandering particles forming crystalline clusters
- **spirograph-harmonics** — Parametric curves with multiple rotating arms creating intricate geometric patterns
- **wave-interference** — Wave interference patterns with multiple sources
- **wave-particle-duality** — Particles exhibiting wave-particle duality with interference patterns
- **trochoidal-waves** — Parametric trochoid curves creating mesmerizing geometric patterns
- **thermal-drift** — GLSL shader with FBM noise, thermal color palette
- **turing-patterns** — Reaction-diffusion patterns creating spots and stripes
- **coriolis-field** — Particle simulation with Coriolis force
- **reaction-diffusion** — Gray-Scott reaction-diffusion model
- **akashic-brush** — Brush strokes on textured canvas
- **iso-density** — Perlin noise flow field
- **cellular-tessellation** — Hexagonal grid with pulsing cells
- **chromatic-strata** — Abstract layered bands with emergent color blending
- **quantum-foam** — Quantum foam visualization
- **neural-bloom** — Neural network-inspired patterns
- **orbital-decay** — Orbital mechanics simulation
- **resonance-cavities** — Resonant frequency visualization
- **stasis-field** — Static field effects
- **strange-attractors** — Chaotic attractor rendering
- **perlin-vortex** — Perlin noise-driven vortex field with particle trails
- **phase-portraits** — Phase space visualization
- **temporal-fractures** — Temporal fractal patterns
- **void-geometry** — Abstract void geometry
- **recursive-ember** — Recursive fractal embers rising with glowing particles
- **plasma-field** — Animated plasma effect with color cycling
- **chladni-patterns** — Standing wave interference patterns creating geometric sand art
- **voronoi-dreams** — Voronoi cells influenced by moving attractors with pulsing glow
- **diffraction-grating** — Light spectrum interference patterns with multiple slits
- **fractal-canopy** — Recursive branching tree with organic sway and golden hour palette
- **lissajous-knots** — Parametric Lissajous curves forming woven knot patterns
- **menger-sponge** — 3D Menger sponge fractal with animated rotation and color cycling
- **neon-streaming** — Glowing particle streams with Perlin flow field and trail effects
- **phyllotaxis-bloom** — Golden angle spiral patterns with emergent flower-like bloom
- **moire-weave** — Overlapping oscillating grids creating interference moire patterns
- **concentric-tensions** — Oscillating concentric rings with connecting tension lines
- **helix-fields** — Rotating helical flow fields with 3D perspective projection
- **recursive-polygons** — Nested geometric shapes with recursive subdivision
- **wave-particles** — Wave interference combined with particle dynamics
- **turbulent-flow** — Perlin noise flow field with particle trails and spectral colors
- **metaballs** — Organic blob dynamics using marching squares algorithm
- **crystal-growth** — Procedural crystal growth visualization with glowing edges
- **lichtenberg-figures** — Fractal branching electrical discharge patterns with glowing trails
- **caustic-dreams** — Underwater light caustics with animated ray patterns and floor interference
- **strange-loops** — Recursive impossible geometries with interlocking shapes and infinite zoom effect
- **magnetic-field** — Magnetic dipole field visualization with flowing particles following field lines
- **magnetic-reconnection** — Magnetic field line dynamics with reconnection events and particle flows
- **fractal-dimensions** — Visualizes fractal dimension at the edge of order and chaos with flowing particles
- **fibonacci-galaxy** — Spiral galaxy with golden ratio distribution and twinkling stars
- **terrain-drift** — 3D Perlin noise terrain landscape with elevation-based coloring and gentle drift animation
- **differential-growth** — Organic line growth simulation with Perlin noise movement and colored boundaries
- **magnetic-pendulum** — Chaotic magnetic pendulum simulation with multiple attractors and particle trails
- **emergent-swarm** — Particle species with emergent collective behaviors (flocking, separation, cross-type interactions)

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
