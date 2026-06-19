import { socket } from '../../socket'

export function Room() {
	return <button onClick={() => socket.connect()}>Начать собеседование</button>
}
