import type { To } from 'react-router'

export interface IHeaderItemProps {
	data: IHeaderItem
	active?: boolean
}

export interface IHeaderItem {
	text: string
	link: To
}
