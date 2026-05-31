/**
 * Check lesson content against structural rules for src/data/lessons.js, id: level_99 to id: level_700:
 *   1. Each level must have exactly 5 sentences
 *   2. Each sentence must have at most 6 words
 *   3. No two sentences (across all groups) may share more than 4 words in common
 *
 * Usage:
 *   node scripts/check-rules.js                  — checks  rules
 */

import { fileURLToPath, pathToFileURL } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

function words(sentence) {
    return sentence.trim().split(/\s+/).filter(Boolean);
}

function sharedWordCount(a, b) {
    const setB = new Set(words(b));
    const count = [...new Set(words(a))].filter(w => setB.has(w)).length;
    return count;
}

function sharedWordList(a, b) {
    const setB = new Set(words(b));
    return [...new Set(words(a))].filter(w => setB.has(w));
}

const { lessons } = await import(pathToFileURL(join(root, 'src/data/lessons.js')).href);

// Filter out Group 1 for structural rules (which are only for groups 2–7)
// Wait, Group 1 levels are 'level_1' to 'level_101'
const filteredLessons = lessons.filter(l => !l.id.match(/^level_([1-9]|[1-9][0-9]|100|101)$/));

const groups = [{ file: 'src/data/lessons.js', lessons: filteredLessons }];

// ── Rule checks ───────────────────────────────────────────────────────────────

const r1 = [];   // wrong sentence count
const r2 = [];   // sentence too long
const r3 = [];   // duplicate sentences

for (const group of groups) {
    for (const lesson of group.lessons) {

        // Rule 1: exactly 5 sentences
        if (lesson.content.length !== 5) {
            r1.push({ file: group.file, level: lesson.id, title: lesson.title, count: lesson.content.length });
        }

        // Rule 2: each sentence ≤ 6 words
        for (const item of lesson.content) {
            const wc = words(item.display).length;
            if (wc > 6) {
                r2.push({ file: group.file, level: lesson.id, title: lesson.title, display: item.display, wc });
            }
        }
    }
}

// Rule 3: pairwise duplicate check across all sentences
const all = [];
for (const group of groups) {
    for (const lesson of group.lessons) {
        for (const item of lesson.content) {
            all.push({ file: group.file, level: lesson.id, title: lesson.title, display: item.display });
        }
    }
}

for (let i = 0; i < all.length; i++) {
    for (let j = i + 1; j < all.length; j++) {
        const count = sharedWordCount(all[i].display, all[j].display);
        if (count > 4) {
            r3.push({
                shared: count,
                words: sharedWordList(all[i].display, all[j].display),
                a: all[i],
                b: all[j],
            });
        }
    }
}

// ── Report ─────────────────────────────────────────────────────────────────────

const tick = n => n === 0 ? '✓' : '✗';

console.log(`\n${tick(r1.length)} Rule 1 — Each level must have exactly 5 sentences  (${r1.length} violation${r1.length !== 1 ? 's' : ''})`);
for (const e of r1) {
    console.log(`  [${e.level}] ${e.title}  (${e.file})`);
    console.log(`    → ${e.count} sentences (expected 5)`);
}

console.log(`\n${tick(r2.length)} Rule 2 — Each sentence must have ≤ 6 words  (${r2.length} violation${r2.length !== 1 ? 's' : ''})`);
for (const e of r2) {
    console.log(`  [${e.level}] ${e.title}  (${e.file})`);
    console.log(`    → "${e.display}"  [${e.wc} words]`);
}

console.log(`\n${tick(r3.length)} Rule 3 — No two sentences share > 4 words  (${r3.length} violation${r3.length !== 1 ? 's' : ''})`);
for (const e of r3) {
    console.log(`  shared ${e.shared} words: [${e.words.join(', ')}]`);
    console.log(`    [${e.a.level}] "${e.a.display}"  (${e.a.file})`);
    console.log(`    [${e.b.level}] "${e.b.display}"  (${e.b.file})`);
}

const total = r1.length + r2.length + r3.length;
console.log(`\n${'─'.repeat(60)}`);
console.log(`Total violations: ${total}`);
if (total > 0) process.exit(1);
