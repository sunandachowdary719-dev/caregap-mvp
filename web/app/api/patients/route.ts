import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

function parseCSV(content: string) {
  const lines = content.trim().split('\n')
  const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''))
  return lines.slice(1).map(line => {
    const values = line.split(',').map(v => v.trim().replace(/"/g, ''))
    return Object.fromEntries(headers.map((h, i) => [h, values[i]]))
  })
}

function smartFlag(systolic: number, diastolic: number, missed: number, symptoms: string): string {
  const s = symptoms?.toLowerCase() || ''
  if (s.includes('chest pain') || s.includes('shortness')) return 'RED'
  if (systolic >= 160 || diastolic >= 100) return 'RED'
  if ((systolic >= 140 || diastolic >= 90) && missed >= 2) return 'RED'
  if (systolic >= 140 || diastolic >= 90) return 'YELLOW'
  if (missed >= 3) return 'YELLOW'
  return 'GREEN'
}

export async function GET() {
  try {
    const dataDir = path.join(process.cwd(), 'public')
    
    const patientsCSV = fs.readFileSync(path.join(dataDir, 'caregap_combined.csv'), 'utf8')
    const trendsCSV = fs.readFileSync(path.join(dataDir, 'caregap_trends.csv'), 'utf8')
    
    let patients = parseCSV(patientsCSV)
    const trends = parseCSV(trendsCSV)

    // Merge checkins if exist
    const checkinPath = path.join(dataDir, 'checkins.csv')
    let checkinCount = 0
    if (fs.existsSync(checkinPath)) {
      const checkins = parseCSV(fs.readFileSync(checkinPath, 'utf8'))
      checkinCount = checkins.length
      checkins.forEach(checkin => {
        const patient = patients.find(p => p.NAME === checkin.patient_name)
        if (patient) {
          patient.systolic = checkin.systolic
          patient.diastolic = checkin.diastolic
          patient.total_missed = checkin.missed_days
          patient.symptoms = checkin.symptoms
        }
      })
    }

    // Re-flag
    patients = patients.map(p => ({
      ...p,
      risk_v2: smartFlag(
        parseFloat(p.systolic),
        parseFloat(p.diastolic),
        parseFloat(p.total_missed),
        p.symptoms || ''
      )
    }))

    return NextResponse.json({ patients, trends, checkinCount })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load data' }, { status: 500 })
  }
}