import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

function smartFlag(s: number, d: number, missed: number, symptoms: string): string {
  const sym = symptoms?.toLowerCase() || ''
  if (sym.includes('chest pain') || sym.includes('shortness')) return 'RED'
  if (s >= 160 || d >= 100) return 'RED'
  if ((s >= 140 || d >= 90) && missed >= 2) return 'RED'
  if (s >= 140 || d >= 90) return 'YELLOW'
  if (missed >= 3) return 'YELLOW'
  return 'GREEN'
}

export async function GET() {
  try {
    let { data: patients, error } = await supabase
      .from('patients')
      .select('*')
      .order('systolic', { ascending: false })

    if (error) throw error

    const { data: checkins } = await supabase
      .from('checkins')
      .select('*')
      .order('created_at', { ascending: false })

    const checkinCount = checkins?.length || 0

    if (checkins && checkins.length > 0) {
      patients = patients?.map(p => {
        const latest = checkins.find(c => c.patient_name === p.name)
        if (latest) {
          return {
            ...p,
            systolic: latest.systolic,
            diastolic: latest.diastolic,
            total_missed: latest.missed_days,
            symptoms: latest.symptoms,
            risk_v2: smartFlag(latest.systolic, latest.diastolic, latest.missed_days, latest.symptoms)
          }
        }
        return p
      }) || []
    }

    const seen = new Map<string, boolean>()
    const deduped = (patients || []).filter((p: any) => {
      if (seen.has(p.name)) return false
      seen.set(p.name, true)
      return true
    })

    const normalized = deduped.map((p: any) => ({
      ...p,
      NAME: p.name,
      AGE: p.age,
      GENDER: p.gender,
      CITY: p.city,
    }))

    return NextResponse.json({ patients: normalized, checkinCount })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}