const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')

const supabase = createClient(
  'https://pxvpkwsqaxyamdyteuea.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4dnBrd3NxYXh5YW1keXRldWVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc1ODU1MTksImV4cCI6MjA5MzE2MTUxOX0.G_CGDfoWCPGSa-SiC2tMqGfSygJdygrLrbnhwDCpy1M'
)

function parseCSV(content) {
  const lines = content.trim().split('\n')
  const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''))
  return lines.slice(1).map(line => {
    const values = line.split(',').map(v => v.trim().replace(/"/g, ''))
    return Object.fromEntries(headers.map((h, i) => [h, values[i]]))
  })
}

async function load() {
  const data = parseCSV(fs.readFileSync('./public/caregap_combined.csv', 'utf8'))
  const patients = data.map(p => ({
    name: p.NAME,
    age: parseInt(p.AGE),
    gender: p.GENDER,
    city: p.CITY,
    systolic: parseFloat(p.systolic),
    diastolic: parseFloat(p.diastolic),
    total_missed: parseFloat(p.total_missed),
    med_name: p.med_name,
    risk_v2: p.risk_v2,
    symptoms: p.symptoms || 'None'
  }))
  
  const { error } = await supabase.from('patients').insert(patients)
  if (error) console.error('Error:', error.message)
  else console.log('Loaded', patients.length, 'patients into Supabase')
}

load()