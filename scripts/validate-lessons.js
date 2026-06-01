/**
 * Validate that lesson "keys" fields correctly produce the "display" Vietnamese text
 * via TelexEngine + src/data/rules.js
 *
 * Usage:
 *   node scripts/validate-lessons.js
 *
 * Examples:
 *   node scripts/validate-lessons.js
 */

import { readFileSync, readdirSync } from 'fs';
import { fileURLToPath, pathToFileURL } from 'url';
import { dirname, join, resolve, basename } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const { TelexEngine } = await import(pathToFileURL(join(root, 'src/utils/TelexEngine.js')).href);
const { rules } = await import(pathToFileURL(join(root, 'src/data/rules.js')).href);
const engine = new TelexEngine(rules);

function convertKeys(keysString) {
    return engine._apply(keysString);
}

function validateLessons(lessons) {
    const results = { file: 'src/data/lessons.js', passed: 0, failed: 0, errors: [] };

    for (const lesson of lessons) {
        for (const item of lesson.content) {
            // keys must contain only ASCII (a-z, space) — no Vietnamese diacritics
            if (/[^\x00-\x7F]/.test(item.keys)) {
                results.failed++;
                results.errors.push({
                    lesson: lesson.id,
                    title: lesson.title,
                    display: item.display,
                    keys: item.keys,
                    converted: null,
                    note: 'keys chứa ký tự tiếng Việt có dấu (phải là telex ASCII)',
                });
                continue;
            }

            const converted = convertKeys(item.keys);
            if (converted === item.display) {
                results.passed++;
            } else {
                results.failed++;
                results.errors.push({
                    lesson: lesson.id,
                    title: lesson.title,
                    display: item.display,
                    keys: item.keys,
                    converted,
                });
            }
        }
    }

    return results;
}

const { lessons } = await import(pathToFileURL(join(root, 'src/data/lessons.js')).href);
const r = validateLessons(lessons);

const status = r.failed === 0 ? '✓' : '✗';
console.log(`\n${status} ${r.file}  (${r.passed} ok, ${r.failed} failed)`);

for (const e of r.errors) {
    console.log(`  [${e.lesson}] ${e.title}`);
    console.log(`    display:   "${e.display}"`);
    console.log(`    keys:      "${e.keys}"`);
    if (e.note) {
        console.log(`    ⚠ ${e.note}`);
    } else {
        console.log(`    converted: "${e.converted}"`);
    }
}

console.log(`\n${'─'.repeat(50)}`);
console.log(`Total: ${r.passed} passed, ${r.failed} failed`);
if (r.failed > 0) process.exit(1);
