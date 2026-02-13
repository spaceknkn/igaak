const fs = require('fs');
const path = require('path');

// Read CSV
const csvPath = path.join(__dirname, '디제이프로필_입력값필드_1차.csv');
const raw = fs.readFileSync(csvPath, 'utf8');

// Simple CSV parser that handles quoted fields
function parseCSV(text) {
    const records = [];
    let field = '';
    let inQuotes = false;
    let row = [];
    for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        const next = text[i + 1];
        if (inQuotes) {
            if (ch === '"' && next === '"') { field += '"'; i++; }
            else if (ch === '"') { inQuotes = false; }
            else { field += ch; }
        } else {
            if (ch === '"') { inQuotes = true; }
            else if (ch === ',') { row.push(field.trim()); field = ''; }
            else if (ch === '\n' || (ch === '\r' && next === '\n')) {
                row.push(field.trim());
                if (row.length > 1 || row[0] !== '') records.push(row);
                row = []; field = '';
                if (ch === '\r') i++;
            } else { field += ch; }
        }
    }
    if (field || row.length > 0) { row.push(field.trim()); if (row.length > 1 || row[0] !== '') records.push(row); }
    return records;
}

const records = parseCSV(raw);

// Scan ALL artist folders and find any image file (000.jpg, 000.JPG, 000.png, etc.)
const artistsDir = path.join(__dirname, 'public', 'artists');
const folders = fs.readdirSync(artistsDir);
const folderMap = {};

for (const f of folders) {
    const fullPath = path.join(artistsDir, f);
    const stat = fs.statSync(fullPath);
    if (!stat.isDirectory()) continue;

    const files = fs.readdirSync(fullPath);
    // Find profile image - any file starting with 000 or the first image file
    let profileImg = null;
    for (const file of files) {
        const lower = file.toLowerCase();
        if (lower.startsWith('000') && (lower.endsWith('.jpg') || lower.endsWith('.jpeg') || lower.endsWith('.png') || lower.endsWith('.webp'))) {
            profileImg = file;
            break;
        }
    }
    // If no 000.*, try first image file
    if (!profileImg) {
        for (const file of files) {
            const lower = file.toLowerCase();
            if ((lower.endsWith('.jpg') || lower.endsWith('.jpeg') || lower.endsWith('.png') || lower.endsWith('.webp')) && !fs.statSync(path.join(fullPath, file)).isDirectory()) {
                profileImg = file;
                break;
            }
        }
    }

    const key = f.toLowerCase().replace(/\s+/g, '');
    folderMap[key] = { folder: f, image: profileImg };
    // Also store with spaces
    folderMap[f.toLowerCase()] = { folder: f, image: profileImg };
}

function findImage(name) {
    const cleanName = name.replace(/\s*\(.*?\)\s*/g, '').trim();

    const tryNames = [
        name,
        cleanName,
        name.replace(/^DJ\s+/i, ''),
        cleanName.replace(/^DJ\s+/i, ''),
        'DJ ' + cleanName,
        'DJ ' + cleanName.replace(/^DJ\s+/i, ''),
        name.split('(')[0].trim(),
    ];

    for (const tryName of tryNames) {
        const key1 = tryName.toLowerCase().replace(/\s+/g, '');
        const key2 = tryName.toLowerCase();
        for (const k of [key1, key2]) {
            if (folderMap[k] && folderMap[k].image) {
                return `/artists/${folderMap[k].folder}/${folderMap[k].image}`;
            }
        }
    }
    return '';
}

// Manual overrides for known mismatches
const manualMap = {
    'Babbyang': 'bobbyang',
    'Harfstep ( Soo & Midori )': 'harfstep_duo',
    'Harfstep (Soo)': 'harfstep_soo',
    'DJ U.NA': 'DJ Una',
    'Hanna': 'Hanna',
    'DJ Heejae': 'DJ Heejae',
    'Minky': 'DJ Minky',
};

// Build DJ entries
const djs = [];
const slugSet = new Set();
let id = 1;

for (let i = 1; i < records.length; i++) {
    const r = records[i];
    if (!r[0]) continue;

    const name = r[0] || '';

    // Skip excluded artists
    if (['Wooxi'].includes(name)) continue;
    const category = r[1] || 'DJ';
    const genre = r[2] || 'EDM';
    const bio = (r[3] || '').replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
    const instagram = (r[6] || '').trim();
    const youtube = (r[7] || '').trim();
    const soundcloud = (r[8] || '').trim();
    const spotify = (r[9] || '').trim();
    const weight = parseInt(r[10]) || 1;

    // Generate slug
    let slug = name
        .toLowerCase()
        .replace(/\s*\(.*?\)\s*/g, '')
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')
        .trim();

    if (!slug) slug = `artist-${id}`;

    // Ensure unique slug
    let finalSlug = slug;
    let counter = 2;
    while (slugSet.has(finalSlug)) {
        finalSlug = `${slug}-${counter}`;
        counter++;
    }
    slugSet.add(finalSlug);

    // Find image
    let image = '';

    // Check manual mapping first
    if (manualMap[name]) {
        const mapped = manualMap[name];
        const key1 = mapped.toLowerCase().replace(/\s+/g, '');
        const key2 = mapped.toLowerCase();
        for (const k of [key1, key2]) {
            if (folderMap[k] && folderMap[k].image) {
                image = `/artists/${folderMap[k].folder}/${folderMap[k].image}`;
                break;
            }
        }
    }

    if (!image) {
        image = findImage(name);
    }

    djs.push({ id: String(id), name, slug: finalSlug, category, genre, bio, image, instagram, youtube, soundcloud, spotify, weight });
    id++;
}

// Report
console.log(`Total DJs: ${djs.length}`);
const withImg = djs.filter(d => d.image).length;
const noImg = djs.filter(d => !d.image);
console.log(`With image: ${withImg}`);
console.log(`Without image: ${noImg.length}`);
for (const d of noImg) {
    console.log(`  NO IMAGE: ${d.name}`);
}

// Generate data.ts
let output = `export interface DJ {
  id: string;
  name: string;
  slug: string;
  category?: string;
  genre: string;
  bio: string;
  image?: string;
  instagram?: string;
  youtube?: string;
  soundcloud?: string;
  spotify?: string;
  bookingEmail?: string;
  weight?: number;
  imagePosition?: string;
  thumbnailPosition?: string;
}

// DJ data from CSV - ${djs.length} artists
export const djs: DJ[] = [\n`;

for (const dj of djs) {
    output += `  {\n`;
    output += `    id: '${dj.id}',\n`;
    output += `    name: '${dj.name.replace(/'/g, "\\'")}',\n`;
    output += `    slug: '${dj.slug}',\n`;
    if (dj.category) output += `    category: '${dj.category.replace(/'/g, "\\'")}',\n`;
    output += `    genre: '${dj.genre.replace(/'/g, "\\'")}',\n`;
    output += `    bio: \`${dj.bio.replace(/`/g, "'").replace(/\\/g, '\\\\')}\`,\n`;
    if (dj.image) output += `    image: '${dj.image}',\n`;
    output += `    imagePosition: 'center center',\n`;
    output += `    thumbnailPosition: 'center center',\n`;
    if (dj.instagram) output += `    instagram: '${dj.instagram}',\n`;
    if (dj.youtube) output += `    youtube: '${dj.youtube}',\n`;
    if (dj.soundcloud) output += `    soundcloud: '${dj.soundcloud}',\n`;
    if (dj.spotify) output += `    spotify: '${dj.spotify}',\n`;
    output += `    weight: ${dj.weight},\n`;
    output += `  },\n`;
}

output += `];

// Helper functions
export function getDJBySlug(slug: string): DJ | undefined {
  return djs.find(dj => dj.slug === slug);
}

export function getDJsByCategory(category: string | null): DJ[] {
  const sorted = [...djs].sort((a, b) => (b.weight || 0) - (a.weight || 0));
  if (!category) return sorted;
  return sorted.filter(dj => dj.category?.includes(category));
}

export function getCategories(): string[] {
  const cats = new Set<string>();
  djs.forEach(dj => {
    if (dj.category) {
      dj.category.split(',').forEach(c => cats.add(c.trim()));
    }
  });
  return Array.from(cats);
}
`;

const outPath = path.join(__dirname, 'src', 'lib', 'data.ts');
fs.writeFileSync(outPath, output, 'utf8');
console.log(`\\nWrote ${djs.length} DJs to ${outPath}`);
