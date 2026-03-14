const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    if (!fs.existsSync(dir)) return results;
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
            results.push(file);
        }
    });
    return results;
}

const dirs = [
    path.join(__dirname, 'bookidam-web', 'src'),
    path.join(__dirname, 'bookidam-admin', 'src')
];

let files = [];
dirs.forEach(d => files = files.concat(walk(d)));

let updatedCount = 0;

files.forEach(f => {
    let orig = fs.readFileSync(f, 'utf8');
    let mod = orig
        .replace(/bg-green-/g, 'bg-primary-')
        .replace(/text-green-/g, 'text-primary-')
        .replace(/border-green-/g, 'border-primary-')
        .replace(/ring-green-/g, 'ring-primary-')
        .replace(/from-green-/g, 'from-primary-')
        .replace(/to-green-/g, 'to-primary-')
        .replace(/via-green-/g, 'via-primary-')
        .replace(/fill-green-/g, 'fill-primary-')
        .replace(/stroke-green-/g, 'stroke-primary-');
        
    // Also handle replacing the opaque cards with liquid glass
    // Example: bg-white premium-shadow border border-gray-100 -> liquid-glass
    mod = mod.replace(/bg-white rounded-\[2rem\] p-8 md:p-12 premium-shadow border border-gray-100/g, "rounded-[2rem] p-8 md:p-12 liquid-glass");
    mod = mod.replace(/bg-white rounded-\[2rem\] p-8 md:p-10 premium-shadow border border-gray-100/g, "rounded-[2rem] p-8 md:p-10 liquid-glass");
    mod = mod.replace(/bg-white p-10 rounded-3xl premium-shadow border border-gray-100/g, "p-10 rounded-3xl liquid-glass");
    mod = mod.replace(/bg-white rounded-3xl overflow-hidden hover-lift border border-gray-100/g, "rounded-3xl overflow-hidden hover-lift liquid-glass border-none");
    mod = mod.replace(/bg-white rounded-2xl p-6 flex flex-col/g, "liquid-glass rounded-2xl p-6 flex flex-col");
    mod = mod.replace(/bg-white rounded-3xl p-10 text-center premium-shadow border border-gray-100/g, "rounded-3xl p-10 text-center liquid-glass");
    mod = mod.replace(/bg-white p-6 rounded-2xl premium-shadow border border-gray-100/g, "p-6 rounded-2xl liquid-glass hover-lift");
    mod = mod.replace(/bg-white rounded-\[2\.5rem\] p-8 md:p-12 shadow-2xl shadow-primary-900\/5 border border-gray-100/g, "rounded-[2.5rem] p-8 md:p-12 liquid-glass shadow-2xl");

    if (orig !== mod) {
        fs.writeFileSync(f, mod, 'utf8');
        console.log(`Updated ${f}`);
        updatedCount++;
    }
});

console.log(`Successfully updated ${updatedCount} files.`);
