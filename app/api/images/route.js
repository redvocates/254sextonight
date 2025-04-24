import { NextResponse } from 'next/server';
import { connectDB } from '@/utils/connectDB';
import ImageModel from '@/models/ImageModel';

export async function GET(req) {
    try {
        // Ensure the DB is connected
        await connectDB();
        console.log('Database connected successfully!');
        
        // Query to fetch 200 random images
        const images = await ImageModel.aggregate([
            { $sample: { size: 500 } }  // Randomly select 500 images
        ]);
        
        console.log('Fetched images:', images);
        
        if (images.length === 0) {
            console.log('No images found in the database.');
        }

        return NextResponse.json(images);
    } catch (error) {
        console.error('Error fetching images:', error);
        return NextResponse.json({ error: 'Error fetching images' }, { status: 500 });
    }
}
