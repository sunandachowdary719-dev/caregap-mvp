import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import nodemailer from 'nodemailer'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function GET() {
  try {
    const { data: patients } = await supabase
      .from('patients')
      .select('*')
      .eq('risk_v2', 'RED')

    if (!patients || patients.length === 0) {
      return NextResponse.json({ message: 'No critical patients' })
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_ADDRESS,
        pass: process.env.GMAIL_APP_PASSWORD
      }
    })

    const patientList = patients.map(p =>
      `- ${p.name} | BP ${p.systolic}/${p.diastolic} mmHg | ${p.total_missed} missed doses | ${p.city}`
    ).join('\n')

    await transporter.sendMail({
      from: process.env.GMAIL_ADDRESS,
      to: process.env.GMAIL_ADDRESS,
      subject: `CareGap Alert: ${patients.length} Critical Patient(s) Require Callback`,
      text: `
CareGap Weekly Patient Alert
Generated: ${new Date().toLocaleDateString()}

CRITICAL PATIENTS — CALLBACK REQUIRED TODAY:

${patientList}

Login to your dashboard: https://caregap.vercel.app

---
CareGap Patient Monitoring System
      `
    })

    return NextResponse.json({ 
      success: true, 
      message: `Alert sent for ${patients.length} critical patients` 
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}