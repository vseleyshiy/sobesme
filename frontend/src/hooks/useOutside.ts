import { useCallback, useEffect, useRef, useState } from 'react'

export function useOutside<T extends HTMLElement>(initialVisible: boolean) {
	const [isShow, setIsShow] = useState(initialVisible)

	const ref = useRef<T>(null)

	const handleClickOutside = useCallback((event: Event) => {
		if (ref.current && !ref.current.contains(event.target as Node)) {
			setIsShow(false)
		}
	}, [])

	useEffect(() => {
		document.addEventListener('click', handleClickOutside, true)

		return () => {
			document.removeEventListener('click', handleClickOutside, true)
		}
	}, [handleClickOutside])

	return { ref, isShow, setIsShow }
}
