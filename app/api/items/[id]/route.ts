import { auth } from '@/auth'
import { NextResponse } from 'next/server'
import items from '@/data/items.json'

export const GET = auth((req, { params }) => {
	if (req.auth) {
		const { id } = params as { id: string }
		const item = items.find(i => i.item_id === id)
		if (item) return NextResponse.json(item)
		return NextResponse.json({ message: 'Item not found' }, { status: 404 })
	}
	return NextResponse.json({ message: 'Not authenticated' }, { status: 401 })
})
