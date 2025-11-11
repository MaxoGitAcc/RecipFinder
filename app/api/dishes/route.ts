import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

type Dish = {
  id: number;
  title: string;
  subtitle?: string;
  image: string;
  time: string;
  rating: number;
  recipe: string[];
};

const filePath = path.join(process.cwd(), 'data', 'dishes.json');

export async function GET() {
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    const dishes: Dish[] = JSON.parse(data || '[]'); // fallback if file empty
    return NextResponse.json(dishes);
  } catch (err) {
    console.error('Failed to read dishes.json', err);
    return NextResponse.json([], { status: 200 });
  }
}