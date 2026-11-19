/**
 * Возвращает новый массив с перемешанными элементами (алгоритм Фишера — Йетса).
 * @template T
 * @param {T[]} items - Исходный массив, не изменяется
 * @param {() => number} [random=Math.random] - Источник чисел в диапазоне [0, 1)
 * @returns {T[]} Новый перемешанный массив
 */
export default function shuffle(items, random = Math.random) {
	const result = [...items];

	for (let i = result.length - 1; i > 0; i--) {
		const j = Math.floor(random() * (i + 1));
		[result[i], result[j]] = [result[j], result[i]];
	}

	return result;
}
