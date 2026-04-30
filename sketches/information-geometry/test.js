// ============================================================
// INFORMATION GEOMETRY — Tests
// Test-driven development: these tests validate the Fisher
// information metric and KL divergence calculations.
// ============================================================

const assert = (cond, msg) => { if (!cond) throw new Error(msg); };
const eq = (a, b, epsilon = 1e-6) => Math.abs(a - b) < epsilon;

// — ExponentialFamily —
// Exponential family: p(x|θ) = h(x) * exp(θ·T(x) - A(θ))
// Natural parameters, sufficient statistics, log-partition A(θ)
class ExponentialFamily {
  constructor(naturalParam) { this.theta = naturalParam; }
  
  // KL(p||q) = A(θ₁) + A(θ₂) - A((θ₁+θ₂)/2) - cov(θ)
  static kl(p, q) {
    const avg = p.theta.map((t, i) => (t + q.theta[i]) / 2);
    const A_p = ExponentialFamily.logPartition(p.theta);
    const A_q = ExponentialFamily.logPartition(q.theta);
    const A_avg = ExponentialFamily.logPartition(avg);
    const cov = p.theta.reduce((s, t, i) => s + t * q.theta[i], 0);
    return A_p + A_q - 2 * A_avg - cov;
  }
  
  static logPartition(theta) {
    // Example: Gaussian with natural params
    // θ₁ = μ/σ², θ₂ = -1/(2σ²)
    // A(θ) = μ²σ²/2 + log(σ) ≈ -θ₂⁻¹ θ₁² / 4θ₂ - log(-2θ₂)/2
    const [eta, lambda] = theta;
    if (lambda >= 0) return Infinity;
    return -eta * eta / (4 * lambda) - 0.5 * Math.log(-2 * lambda);
  }
}

// — FisherMetric —
// Fisher information metric: g_ij = E[∂ log p(x|θ)/∂θ_i ∂ log p(x|θ)/∂θ_j]
// For exponential family: g = A''(θ) (Hessian of log-partition)
class FisherMetric {
  static hessian(theta) {
    // Second derivative of A(θ) for Gaussian
    const lambda = theta[1];
    if (lambda >= 0) return [[Infinity, 0], [0, Infinity]];
    // d²A/dη² = 1/(-2λ), d²A/dηdλ = η/(-2λ)², d²A/dλ² = ...
    const d2 = -0.5 / lambda;
    const d3 = theta[0] / (2 * lambda * lambda);
    const d4 = -theta[0] * theta[0] / (4 * lambda * lambda * lambda) + 0.5 / lambda;
    return [[d2, d3], [d3, d4]];
  }
}

// — Test Suite —─────────────────────────────────────────────────
const tests = {
  logPartition() {
    // Test: for θ = [0, -0.5], A = 0
    const theta = [0, -0.5];
    const A = ExponentialFamily.logPartition(theta);
    assert(Math.abs(A) < 1e-3, `logPartition expected 0, got ${A}`);
  },
  
  klDivergence() {
    // Test: KL(p||p) = 0
    const p = new ExponentialFamily([0, -0.5]);
    const kl = ExponentialFamily.kl(p, p);
    assert(eq(kl, 0), `KL(p||p) expected 0, got ${kl}`);
  },
  
  fisherMetric() {
    // Test: Fisher is positive definite (Hessian > 0)
    const theta = [0.5, -0.5];
    const H = FisherMetric.hessian(theta);
    const det = H[0][0] * H[1][1] - H[0][1] * H[1][0];
    assert(det > 0, `Fisher metric not positive definite, det=${det}`);
  },
  
  run() {
    let passed = 0;
    for (const [name, fn] of Object.entries(tests)) {
      try { fn(); console.log('✓', name); passed++; }
      catch (e) { console.log('✗', name, e.message); }
    }
    console.log(`\n${passed}/${Object.keys(tests).length} tests passed`);
    return passed;
  }
};

// Auto-run in Node
if (typeof module !== 'undefined' && require.main === module) {
  tests.run();
}