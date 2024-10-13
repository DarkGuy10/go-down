import type { Config } from 'tailwindcss'
import { default as catppuccin } from '@catppuccin/tailwindcss'

const config: Config = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	plugins: [catppuccin({ defaultFlavour: 'mocha' })],
}
export default config
