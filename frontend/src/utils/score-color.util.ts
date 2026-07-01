export function getScoreColor(score: number) {
	if (score > 1 && score <= 2) {
		return 'var(--text-danger)'
	}
	if (score > 2 && score < 4) {
		return 'var(--text-proccess)'
	}
	if (score >= 4 && score <= 5) {
		return 'var(--text-success)'
	}
}
