import type { IInterview } from '@/types/interview.type'

interface IDifficultyProperties {
	total: number
	count: number
}

interface IScoresByDateAndDifficulty {
	date: Date
	PUPPY: IDifficultyProperties
	STRICT: IDifficultyProperties
	HARD: IDifficultyProperties
}

interface IResultScoresByDateAndDifficulty {
	date: Date
	PUPPY?: number
	STRICT?: number
	HARD?: number
}

export function getScoresByDateAndDifficulty(interviews: IInterview[]) {
	const validInterviews = interviews.filter(
		interview =>
			interview.feedback && typeof interview.feedback.score === 'number',
	)

	const groupedData = validInterviews.reduce((acc, current) => {
		const date = new Date(current.createdAt).toLocaleDateString()

		if (!acc[date]) {
			acc[date] = {
				date,
				PUPPY: { total: 0, count: 0 },
				STRICT: { total: 0, count: 0 },
				HARD: { total: 0, count: 0 },
			}
		}

		const diff = current.difficulty
		if (acc[date][diff]) {
			acc[date][diff].total += current.feedback.score
			acc[date][diff].count += 1
		}

		return acc
	}, {} as IScoresByDateAndDifficulty[])

	return Object.values(groupedData).map(day => {
		const result: IResultScoresByDateAndDifficulty = { date: day.date }

		const puppy = day.PUPPY
		const strict = day.STRICT
		const hard = day.HARD

		if (puppy.count > 0) {
			result.PUPPY = Math.round((puppy.total / puppy.count) * 100) / 100
		}
		if (strict.count > 0) {
			result.STRICT = Math.round((strict.total / strict.count) * 100) / 100
		}
		if (hard.count > 0) {
			result.HARD = Math.round((hard.total / hard.count) * 100) / 100
		}

		return result
	})
}
