export interface Godown {
	id: string
	name: string
	parent_godown?: string
}

export interface Item {
	item_id: string
	name: string
	quantity: number
	category: string
	price: number
	status: 'in_stock' | 'out_of_stock'
	godown_id: string
	brand: string
	attributes: Record<string, string | undefined>
	image_url: string
}
