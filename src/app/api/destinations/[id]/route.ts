import { NextResponse } from 'next/server';
import { DESTINATIONS } from '@/data/destinations';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const destination = DESTINATIONS.find((d) => d.id === id);

  if (!destination) {
    return NextResponse.json(
      { success: false, error: 'Destination not found' },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    data: destination
  });
}
