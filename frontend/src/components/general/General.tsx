import { Link } from 'react-router'

import { PAGES_CONFIG } from '../../configs/pages-url.config'

export function General() {
	return (
		<div>
			hello world asdfsdasdfsdf
			<Link to={PAGES_CONFIG.ROOM + '/123'}>go to room</Link>
		</div>
	)
}
