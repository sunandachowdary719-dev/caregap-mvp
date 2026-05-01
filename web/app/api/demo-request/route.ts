import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: Request) {
  try {
    const { clinicName, doctorName, email, phone, patientCount } = await request.json()

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_ADDRESS,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    })

    await transporter.sendMail({
      from: process.env.GMAIL_ADDRESS,
      to: process.env.GMAIL_ADDRESS,
      subject: `CareGap Demo Request — ${clinicName}`,
      text: [
        `Clinic Name:   ${clinicName}`,
        `Doctor Name:   ${doctorName}`,
        `Email:         ${email}`,
        `Phone:         ${phone}`,
        `Patient Count: ${patientCount}`,
      ].join('\n'),
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
