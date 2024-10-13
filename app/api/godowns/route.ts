import { auth } from '@/auth'
import { NextResponse } from 'next/server'
import godowns from '@/data/godowns.json'

export const GET = auth(req => {
	if (req.auth) return NextResponse.json(godowns)
	return NextResponse.json({ message: 'Not authenticated' }, { status: 401 })
})
