// src/app/api/providers-db/route.ts
// Fixed to match our actual database structure

import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { zipCode } = body;

    if (!zipCode) {
      return NextResponse.json(
        { error: 'ZIP code is required' },
        { status: 400 }
      );
    }

    console.log('Searching for providers in ZIP code:', zipCode);

    // Updated query to include scoring data
    const { data: providers, error } = await supabase
      .from('providers')
      .select(`
        id,
        name,
        type,
        phone,
        website,
        description,
        service_areas,
        rating,
        popularity_score,
        coverage_score,
        price_score,
        overall_score,
        provider_locations!inner (
          location_id,
          locations!inner (
            id,
            city,
            state,
            zip_code
          )
        )
      `)
      .eq('provider_locations.locations.zip_code', zipCode)
      .order('overall_score', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Database error', details: error.message },
        { status: 500 }
      );
    }

    console.log('Found providers:', providers?.length || 0);

    // Transform the data to include scoring information
    const transformedProviders = providers?.map(provider => ({
      id: provider.id,
      name: provider.name,
      type: provider.type,
      phone: provider.phone,
      website: provider.website,
      description: provider.description,
      service_areas: provider.service_areas || [],
      rating: provider.rating,
      overall_score: provider.overall_score,
      popularity_score: provider.popularity_score,
      coverage_score: provider.coverage_score,
      price_score: provider.price_score
    })) || [];

    // Group by type for easier display
    const groupedProviders = {
      electricity: transformedProviders.filter(p => p.type === 'electricity'),
      internet: transformedProviders.filter(p => p.type === 'internet'),
      waste: transformedProviders.filter(p => p.type === 'waste'),
      water: transformedProviders.filter(p => p.type === 'water'),
      gas: transformedProviders.filter(p => p.type === 'gas')
    };

    return NextResponse.json({
      success: true,
      zipCode,
      providers: transformedProviders,
      groupedProviders,
      total: transformedProviders.length
    });

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}