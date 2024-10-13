import { auth } from '@/auth'
import { NextResponse } from 'next/server'
import godowns from '@/data/godowns.json'

export const GET = auth((req, { params }) => {
	if (req.auth) {
		const { id } = params as { id: string }
		const godown = godowns.find(g => g.id === id)
		if (godown) return NextResponse.json(godown)
		return NextResponse.json({ message: 'Godown not found' }, { status: 404 })
	}
	return NextResponse.json({ message: 'Not authenticated' }, { status: 401 })
})
