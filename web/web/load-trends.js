const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
require('dotenv').config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
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
  const data = parseCSV(fs.readFileSync('./public/caregap_trends.csv', 'utf8'))
  const trends = data.map(t => ({
    patient_name: t.NAME,
    week: t.week,
    week_num: parseInt(t.week_num),
    systolic: parseFloat(t.systolic),
    diastolic: parseFloat(t.diastolic),
    risk: t.risk_v2
  }))
  const { error } = await supabase.from('trends').insert(trends)
  if (error) console.error('Error:', error.message)
  else console.log('Loaded', trends.length, 'trend records into Supabase')
}
load()