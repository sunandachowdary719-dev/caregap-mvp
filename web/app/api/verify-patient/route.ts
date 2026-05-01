import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get('code')?.toUpperCase()

    if (!code) {
      return NextResponse.json({ error: 'code required' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('patients')
      .select('name')
      .eq('access_code', code)
      .single()

    if (error || !data) {
      return NextResponse.json({ error: 'Invalid access code' }, { status: 404 })
    }

    return NextResponse.json({ name: data.name })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
