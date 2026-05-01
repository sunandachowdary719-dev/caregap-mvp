import { NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(request: Request) {
  try {
    const origin = request.headers.get('origin') || 'http://localhost:3000'

    const prices = await stripe.prices.list({ lookup_keys: ['caregap_monthly'] })
    if (!prices.data.length) {
      return NextResponse.json({ error: 'Price not found' }, { status: 404 })
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price: prices.data[0].id, quantity: 1 }],
      success_url: `${origin}/dashboard`,
      cancel_url: `${origin}/`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
