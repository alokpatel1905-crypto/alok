// app/api/media/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const data = {
    items: [
      {
        title: 'Green Mentors Expands Globally',
        category: 'News',
        description: 'Green Mentors is growing worldwide with new partnerships and initiatives.',
        image: '/media1.jpg',
        date: '2025',
        link: '#'
      },
      {
        title: 'Press Release: Sustainable Education',
        category: 'Press',
        description: 'Our latest press release on sustainable education practices.',
        image: '/media2.jpg',
        date: '2024',
        link: '#'
      },
      {
        title: 'Publication: Climate‑Smart Curriculum',
        category: 'Publications',
        description: 'A deep dive into climate‑smart curriculum design.',
        image: '/media3.jpg',
        date: '2023',
        link: '#'
      },
      {
        title: 'Gallery: Green Mentors in Action',
        category: 'Gallery',
        description: 'Photos from recent events and workshops.',
        image: '/media4.jpg',
        date: '2022',
        link: '#'
      }
    ]
  };
  return NextResponse.json(data);
}
