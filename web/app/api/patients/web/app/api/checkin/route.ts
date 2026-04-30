import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { patient_name, systolic, diastolic, missed_days, symptoms } = body
    
    const checkinPath = path.join(process.cwd(), 'public', 'checkins.csv')
    const date = new Date().toISOString().split('T')[0]
    const newLine = `${patient_name},${date},${systolic},${diastolic},${missed_days},${symptoms}\n`
    
    if (!fs.existsSync(checkinPath)) {
      fs.writeFileSync(checkinPath, 'patient_name,date,systolic,diastolic,missed_days,symptoms\n')
    }
    fs.appendFileSync(checkinPath, newLine)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save checkin' }, { status: 500 })
  }
}