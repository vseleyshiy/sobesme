import { Room } from '../../components/room/Room'
import { SocketComponent } from '../../socket/SocketComponent'

export function RoomPage() {
	return (
		<SocketComponent>
			<Room />
		</SocketComponent>
	)
}
