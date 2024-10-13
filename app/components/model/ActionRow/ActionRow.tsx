import { Bug, Github, LogOut, Menu } from 'lucide-react'
import { signOut } from 'next-auth/react'
import { ActionRowButton } from '@/components/model'

export const ActionRow = ({
	toggleSidebarState,
}: {
	toggleSidebarState: () => void
}) => {
	return (
		<div className='flex gap-2 md:gap-4 items-center px-4'>
			<ActionRowButton title='Open tree' onClick={toggleSidebarState}>
				<Menu strokeWidth={1} absoluteStrokeWidth size={22} />
			</ActionRowButton>
			<ActionRowButton title='Report Bugs'>
				<a href='https://github.com/darkguy10/go.down/issues'>
					<Bug strokeWidth={1} absoluteStrokeWidth size={22} />
				</a>
			</ActionRowButton>
			<ActionRowButton title='GitHub Page'>
				<a href='https://github.com/darkguy10/go.down'>
					<Github strokeWidth={1} absoluteStrokeWidth size={22} />
				</a>
			</ActionRowButton>
			<ActionRowButton title='Logout' onClick={() => signOut()}>
				<LogOut strokeWidth={1} absoluteStrokeWidth size={22} />
			</ActionRowButton>
		</div>
	)
}
