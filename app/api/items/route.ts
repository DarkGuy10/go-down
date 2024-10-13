import { auth } from '@/auth'
import { NextResponse } from 'next/server'
import items from '@/data/items.json'

export const GET = auth(req => {
	if (req.auth) return NextResponse.json(items)
	return NextResponse.json({ message: 'Not authenticated' }, { status: 401 })
})
