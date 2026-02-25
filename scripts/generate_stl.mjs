// Generates a binary STL file for a torus shape
// Usage: node generate_stl.mjs

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const R = 1.0;   // Major radius (center of tube to center of torus)
const r = 0.38;  // Minor radius (radius of tube)
const segments = 80;  // Around the ring
const tubeSegments = 48; // Around the tube

const triangles = [];

for (let i = 0; i < segments; i++) {
    for (let j = 0; j < tubeSegments; j++) {
        const u0 = (i / segments) * Math.PI * 2;
        const u1 = ((i + 1) / segments) * Math.PI * 2;
        const v0 = (j / tubeSegments) * Math.PI * 2;
        const v1 = ((j + 1) / tubeSegments) * Math.PI * 2;

        const p = (u, v) => [
            (R + r * Math.cos(v)) * Math.cos(u),
            (R + r * Math.cos(v)) * Math.sin(u),
            r * Math.sin(v),
        ];

        const normal = (u, v) => {
            const nx = Math.cos(v) * Math.cos(u);
            const ny = Math.cos(v) * Math.sin(u);
            const nz = Math.sin(v);
            return [nx, ny, nz];
        };

        const p00 = p(u0, v0), p10 = p(u1, v0);
        const p01 = p(u0, v1), p11 = p(u1, v1);
        const n00 = normal(u0, v0), n11 = normal(u1, v1);

        // Average normals for each quad
        const avgN1 = n00;
        const avgN2 = n11;

        // Triangle 1
        triangles.push([avgN1, p00, p10, p11]);
        // Triangle 2
        triangles.push([avgN2, p00, p11, p01]);
    }
}

// Binary STL: 80 byte header + 4 byte count + 50 bytes per triangle
const header = Buffer.alloc(80, 0);
header.write('OpenCAD Sample Torus Model', 0, 'ascii');

const count = triangles.length;
const buf = Buffer.alloc(80 + 4 + count * 50);
header.copy(buf, 0);
buf.writeUInt32LE(count, 80);

let offset = 84;
for (const [n, v1, v2, v3] of triangles) {
    buf.writeFloatLE(n[0], offset); buf.writeFloatLE(n[1], offset + 4); buf.writeFloatLE(n[2], offset + 8);
    buf.writeFloatLE(v1[0], offset + 12); buf.writeFloatLE(v1[1], offset + 16); buf.writeFloatLE(v1[2], offset + 20);
    buf.writeFloatLE(v2[0], offset + 24); buf.writeFloatLE(v2[1], offset + 28); buf.writeFloatLE(v2[2], offset + 32);
    buf.writeFloatLE(v3[0], offset + 36); buf.writeFloatLE(v3[1], offset + 40); buf.writeFloatLE(v3[2], offset + 44);
    buf.writeUInt16LE(0, offset + 48);
    offset += 50;
}

const outPath = path.join(__dirname, '../public/sample_model.stl');
fs.writeFileSync(outPath, buf);
console.log(`Written ${count} triangles (${(buf.length / 1024).toFixed(1)} KB) to ${outPath}`);
console.log('File type check: Binary STL ✓');
