"""Soft UI sounds (click, pop, type, whoosh) placed on the cue times written by render.mjs."""
import json, wave
import numpy as np
SR = 44100
d = json.load(open('out/cues.json'))
total = d['total']
out = np.zeros(int((total + 0.5) * SR))
rng = np.random.default_rng(7)

def env(n, a=0.003, r=8.0):
    t = np.arange(n) / SR
    return np.minimum(t / a, 1) * np.exp(-t * r)

def click():
    n = int(0.06 * SR); t = np.arange(n) / SR
    return (np.sin(2 * np.pi * 1800 * t) * 0.6 + rng.normal(0, .15, n)) * env(n, .001, 60) * 0.5

def pop():
    n = int(0.14 * SR); t = np.arange(n) / SR
    f = 520 * np.exp(-t * 14) + 180
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * env(n, .002, 22) * 0.6

def tick():
    n = int(0.03 * SR)
    return rng.normal(0, 1, n) * env(n, .0005, 140) * 0.18

def whoosh():
    n = int(0.45 * SR); x = rng.normal(0, 1, n)
    k = np.ones(60) / 60; x = np.convolve(x, k, 'same') * 3
    t = np.linspace(0, 1, n)
    return x * np.sin(np.pi * t) ** 2 * 0.22

def put(sig, at, gain=1.0):
    i = int(at * SR)
    if i < 0 or i >= len(out): return
    sig = sig[:len(out) - i]
    out[i:i + len(sig)] += sig * gain

for at, kind in d['cues']:
    if kind == 'click': put(click(), at)
    elif kind == 'pop': put(pop(), at)
    elif kind == 'whoosh': put(whoosh(), at)
    elif kind == 'type':
        for j in range(26): put(tick(), at + .15 + j / 24, 0.8)

out = out / max(1e-9, np.abs(out).max()) * 0.35
with wave.open('out/sfx.wav', 'wb') as w:
    w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes((out * 32767).astype(np.int16).tobytes())
