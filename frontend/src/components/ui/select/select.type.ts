export interface ISelectProps {
	title: string
	error?: string
	options: string[]
	pickFn: (value: string) => void
}
