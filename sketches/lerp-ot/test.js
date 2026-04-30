// LERP-OT: Linear Interpolation Optimal Transport
// Unit tests for OptimalTransportMap

'use strict';

const assert = require('node:assert');

function lerp(a, b, t) { return a + (b - a) * t; }

class OptimalTransportMap {
  constructor(sourcePoints, targetPoints) {
    this.source = sourcePoints.map(p => ({ x: p.x, weight: p.weight ?? 1 }));
    this.target = targetPoints.map(p => ({ x: p.x, weight: p.weight ?? 1 }));
    this._cache = null;
  }

  build() {
    const src = [...this.source].sort((a, b) => a.x - b.x);
    const tgt = [...this.target].sort((a, b) => a.x - b.x);
    this._srcSorted = src;
    const srcCW = this._cumSum(src);
    const tgtCW = this._cumSum(tgt);

    // bisect_left: first index where srcCW[idx] > tgtCum
    this._cache = tgt.map((tgtPt, ti) => {
      const tgtCum = tgtCW[ti];
      let lo = 0, hi = src.length;
      while (lo < hi) {
        const mid = (lo + hi) >>> 1;
        if (srcCW[mid] <= tgtCum) lo = mid + 1;
        else hi = mid;
      }
      return {
        sourceIdx: Math.max(0, lo - 1),
        targetX: tgtPt.x,
        weight: tgtPt.weight
      };
    });
    return this._cache;
  }

  mapAt(t) {
    if (!this._cache) this.build();
    return this._cache.map(pair => {
      const srcPt = this._srcSorted[pair.sourceIdx];
      return { x: lerp(srcPt.x, pair.targetX, t), weight: pair.weight };
    });
  }

  transportCost(t) {
    const pts = this.mapAt(t);
    const totalW = pts.reduce((s, p) => s + p.weight, 0);
    const meanX = pts.reduce((s, p) => s + p.x * p.weight, 0) / totalW;
    return pts.reduce((s, p) => s + p.weight * (p.x - meanX) ** 2, 0);
  }

  _cumSum(arr) { let s = 0; return arr.map(v => (s += v.weight)); }
}

// ─── Tests ───────────────────────────────────────────────────────────────────
const tests = [
  function testSortedPairing() {
    const source = [{ x: 0, weight: 1 }, { x: 5, weight: 1 }, { x: 10, weight: 1 }];
    const target = [{ x: 2, weight: 1 }, { x: 7, weight: 1 }, { x: 12, weight: 1 }];
    const ot = new OptimalTransportMap(source, target);
    const map = ot.build();
    assert.strictEqual(map[0].targetX, 2, 'first target is 2');
    assert.strictEqual(map[1].targetX, 7, 'second target is 7');
    assert.strictEqual(map[2].targetX, 12, 'third target is 12');
    console.log('  ✓ testSortedPairing passed');
  },

  function testMapAtT0() {
    const source = [{ x: 0, weight: 1 }, { x: 10, weight: 1 }];
    const target = [{ x: 50, weight: 1 }, { x: 60, weight: 1 }];
    const ot = new OptimalTransportMap(source, target);
    ot.build();
    const at0 = ot.mapAt(0);
    assert.ok(Math.abs(at0[0].x - 0) < 0.001, 't=0: first particle at source x=0');
    assert.ok(Math.abs(at0[1].x - 10) < 0.001, 't=0: second particle at source x=10');
    console.log('  ✓ testMapAtT0 passed');
  },

  function testMapAtT1() {
    const source = [{ x: 0, weight: 1 }, { x: 10, weight: 1 }];
    const target = [{ x: 50, weight: 1 }, { x: 60, weight: 1 }];
    const ot = new OptimalTransportMap(source, target);
    const at1 = ot.mapAt(1);
    assert.ok(Math.abs(at1[0].x - 50) < 0.001, 't=1: first particle at target x=50');
    assert.ok(Math.abs(at1[1].x - 60) < 0.001, 't=1: second particle at target x=60');
    console.log('  ✓ testMapAtT1 passed');
  },

  function testBimodalTransportAverage() {
    // Source: {0,5,10,15}, Target: bimodal {0,0,20,20}
    const source = [{ x: 0, weight: 1 }, { x: 5, weight: 1 }, { x: 10, weight: 1 }, { x: 15, weight: 1 }];
    const target = [{ x: 0, weight: 1 }, { x: 0, weight: 1 }, { x: 20, weight: 1 }, { x: 20, weight: 1 }];
    const ot = new OptimalTransportMap(source, target);
    ot.build();
    const at1 = ot.mapAt(1);
    const avg = at1.reduce((s, p) => s + p.x, 0) / at1.length;
    assert.ok(Math.abs(avg - 10) < 0.01, `avg=${avg.toFixed(2)} should be 10`);
    console.log(`  ✓ testBimodalTransportAverage passed (avg=${avg.toFixed(2)})`);
  },

  function testIdenticalDistributions() {
    const pts = [{ x: 5, weight: 1 }, { x: 15, weight: 1 }];
    const ot = new OptimalTransportMap(pts, pts);
    ot.build();
    const at1 = ot.mapAt(1);
    assert.ok(Math.abs(at1[0].x - 5) < 0.001, 'particle 1 stays at x=5');
    assert.ok(Math.abs(at1[1].x - 15) < 0.001, 'particle 2 stays at x=15');
    console.log('  ✓ testIdenticalDistributions passed');
  },

  function testTransportCostGrowsWithSpread() {
    const source = [{ x: 0, weight: 1 }, { x: 10, weight: 1 }];
    const target = [{ x: 0, weight: 1 }, { x: 20, weight: 1 }];
    const ot = new OptimalTransportMap(source, target);
    const c0 = ot.transportCost(0);
    const c1 = ot.transportCost(1);
    assert.ok(c1 > c0, `cost grows: c0=${c0.toFixed(2)} c1=${c1.toFixed(2)}`);
    console.log(`  ✓ testTransportCostGrowsWithSpread passed (c0=${c0.toFixed(2)}, c1=${c1.toFixed(2)})`);
  },

  function testLerpMidpoint() {
    const source = [{ x: 0, weight: 1 }, { x: 10, weight: 1 }];
    const target = [{ x: 50, weight: 1 }, { x: 60, weight: 1 }];
    const ot = new OptimalTransportMap(source, target);
    ot.build();
    const at05 = ot.mapAt(0.5);
    assert.ok(Math.abs(at05[0].x - 25) < 0.001, 'midpoint: first particle at 25');
    assert.ok(Math.abs(at05[1].x - 35) < 0.001, 'midpoint: second particle at 35');
    console.log('  ✓ testLerpMidpoint passed');
  },

  function testLerpFullRange() {
    const source = [{ x: 0, weight: 1 }];
    const target = [{ x: 99, weight: 1 }];
    const ot = new OptimalTransportMap(source, target);
    ot.build();
    const at0 = ot.mapAt(0);
    const at1 = ot.mapAt(1);
    assert.ok(Math.abs(at0[0].x - 0) < 0.001, 't=0: particle at source x=0');
    assert.ok(Math.abs(at1[0].x - 99) < 0.001, 't=1: particle at target x=99');
    console.log('  ✓ testLerpFullRange passed');
  },
];

// ─── Run ─────────────────────────────────────────────────────────────────────
let passed = 0, failed = 0;
for (const testFn of tests) {
  try {
    testFn();
    passed++;
  } catch (e) {
    console.error(`  ✗ ${testFn.name} FAILED: ${e.message}`);
    failed++;
  }
}
console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
