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

export function getHpColor(hp: number) {
	if (hp > 70 && hp <= 100) {
		return 'var(--bg-main)'
	}
	if (hp > 30 && hp <= 70) {
		return 'var(--text-proccess)'
	}
	if (hp > 0 && hp <= 30) {
		return 'var(--text-danger)'
	}
}
