import { join, dirname } from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const { lessons } = await import(pathToFileURL(join(root, 'src/data/lessons.js')).href);

console.log(`\n${'='.repeat(60)}`);
console.log(`ALL LESSONS`);
console.log('='.repeat(60));

for (const lesson of lessons) {
  console.log(`\n[${lesson.id}] ${lesson.title}`);
  for (const item of lesson.content) {
    console.log(`  - ${item.display}`);
  }
}

