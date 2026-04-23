const items = [
  { name: 'Home', href: '/', order: 0 },
  { name: 'About', href: '/about', order: 1 },
  { name: 'Impact', href: '/impact', order: 2 },
  { name: 'Milestones', href: '/milestones', order: 3 },
  { name: 'Accreditation', href: '/accreditation', order: 4 },
  { name: 'Rankings', href: '/rankings', order: 5 },
  { name: 'Events', href: '/events', order: 6 },
  { name: 'Awards', href: '/awards', order: 7 },
  { name: 'Networks', href: '/networks', order: 8 },
  { name: 'Support Us', href: '/support', order: 9 },
  { name: 'Media', href: '/media', order: 10 },
  { name: 'Contact', href: '/contact', order: 11 },
];

async function seed() {
  for (const item of items) {
    const res = await fetch('http://localhost:4000/menu', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item),
    });
    if (res.ok) console.log(`Added ${item.name}`);
    else console.error(`Failed ${item.name}`);
  }
}

seed();
