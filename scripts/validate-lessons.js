/**
 * Validate that lesson "keys" fields correctly produce the "display" Vietnamese text
 * via TelexEngine + rules.json.
 *
 * Usage:
 *   node scripts/validate-lessons.js [lessonFile1] [lessonFile2] ...
 *
 * If no files are given, all lesson files under public/lessons/ are validated.
 *
 * Examples:
 *   node scripts/validate-lessons.js
 *   node scripts/validate-lessons.js public/lessons/group_2_song-nuoc.json
 */

import { readFileSync, readdirSync } from 'fs';
import { fileURLToPath, pathToFileURL } from 'url';
import { dirname, join, resolve, basename } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const { TelexEngine } = await import(pathToFileURL(join(root, 'src/utils/TelexEngine.js')).href);

const rules = JSON.parse(readFileSync(join(root, 'public/rules.json'), 'utf8')).telex_rules;
const engine = new TelexEngine(rules);

function convertKeys(keysString) {
    return engine._apply(keysString);
}

function validateFile(filePath) {
    const absPath = resolve(root, filePath);
    const data = JSON.parse(readFileSync(absPath, 'utf8'));
    const results = { file: basename(absPath), passed: 0, failed: 0, errors: [] };

    for (const lesson of data.lessons) {
        for (const item of lesson.content) {
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

// Determine which files to validate
let filePaths = process.argv.slice(2);
if (filePaths.length === 0) {
    const lessonsDir = join(root, 'public/lessons');
    filePaths = readdirSync(lessonsDir)
        .filter(f => f.endsWith('.json'))
        .sort()
        .map(f => join(lessonsDir, f));
}

let totalPassed = 0;
let totalFailed = 0;

for (const filePath of filePaths) {
    const r = validateFile(filePath);
    totalPassed += r.passed;
    totalFailed += r.failed;

    const status = r.failed === 0 ? '✓' : '✗';
    console.log(`\n${status} ${r.file}  (${r.passed} ok, ${r.failed} failed)`);

    for (const e of r.errors) {
        console.log(`  [${e.lesson}] ${e.title}`);
        console.log(`    display:   "${e.display}"`);
        console.log(`    keys:      "${e.keys}"`);
        console.log(`    converted: "${e.converted}"`);
    }
}

console.log(`\n${'─'.repeat(50)}`);
console.log(`Total: ${totalPassed} passed, ${totalFailed} failed`);
if (totalFailed > 0) process.exit(1);
