import { readFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const lessonsDir = join(__dirname, '../public/lessons');

const files = readdirSync(lessonsDir)
  .filter(f => f.endsWith('.json'))
  .sort();

for (const file of files) {
  const groupName = file.replace('.json', '');
  const data = JSON.parse(readFileSync(join(lessonsDir, file), 'utf8'));

  console.log(`\n${'='.repeat(60)}`);
  console.log(`GROUP: ${groupName}`);
  console.log('='.repeat(60));

  for (const lesson of data.lessons) {
    console.log(`\n[${lesson.id}] ${lesson.title}`);
    for (const item of lesson.content) {
      console.log(`  - ${item.display}`);
    }
  }
}
