import { BASE_URL } from '@/lib/constants'

/**
 * Check production with the env vars
 * @returns boolean
 */
export const isProduction = () => process.env.NEXT_PUBLIC_ORIGIN === `${BASE_URL}`

/**
 * Formats a date string to a localized date string.
 * @param dateStr - The date string to format.
 * @param locale - The locale to use for formatting. Defaults to 'en-US'.
 * @returns The formatted date string.
 */
export const formatDateToLocal = (dateStr: string, locale: string = 'en-US') => {
	const date = new Date(dateStr)
	const options: Intl.DateTimeFormatOptions = {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	}
	const formatter = new Intl.DateTimeFormat(locale, options)
	return formatter.format(date)
}

/**
 * Formats a date string to a relative date string.
 * @param date - The date string to format.
 * @returns The formatted relative date string.
 */
export function formatDate(date: string) {
	const currentDate = new Date()
	if (!date.includes('T')) {
		date = `${date}T00:00:00`
	}
	const targetDate = new Date(date)

	const yearsAgo = currentDate.getFullYear() - targetDate.getFullYear()
	const monthsAgo = currentDate.getMonth() - targetDate.getMonth()
	const daysAgo = currentDate.getDate() - targetDate.getDate()

	let formattedDate = ''

	if (yearsAgo > 0) {
		formattedDate = `${yearsAgo}y ago`
	} else if (monthsAgo > 0) {
		formattedDate = `${monthsAgo}mo ago`
	} else if (daysAgo > 0) {
		formattedDate = `${daysAgo}d ago`
	} else {
		formattedDate = 'Today'
	}

	const fullDate = formatDateToLocal(targetDate.toDateString())

	return `${fullDate} (${formattedDate})`
}

/**
 * Generates an array representing pagination.
 * @param currentPage - The current page number.
 * @param totalPages - The total number of pages.
 * @returns An array representing the pagination.
 */
export const generatePagination = (currentPage: number, totalPages: number) => {
	// If the total number of pages is 7 or less,
	// display all pages without any ellipsis.
	if (totalPages <= 7) {
		return Array.from({ length: totalPages }, (_, i) => i + 1)
	}

	// If the current page is among the first 3 pages,
	// show the first 3, an ellipsis, and the last 2 pages.
	if (currentPage <= 3) {
		return [1, 2, 3, '...', totalPages - 1, totalPages]
	}

	// If the current page is among the last 3 pages,
	// show the first 2, an ellipsis, and the last 3 pages.
	if (currentPage >= totalPages - 2) {
		return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages]
	}

	// If the current page is somewhere in the middle,
	// show the first page, an ellipsis, the current page and its neighbors,
	// another ellipsis, and the last page.
	return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages]
}

/**
 * Formats a number to a currency string.
 * @param amount - The number to format.
 * @returns The formatted currency string.
 */
export const formatCurrency = (amount: number) => {
	return (amount / 100).toLocaleString('en-US', {
		style: 'currency',
		currency: 'USD',
	})
}

/**
 * Counts the number of words in a given input.
 * @param input - The input string to count words from.
 * @returns The count of words in the input string.
 */
function wordCounter(input: string) {
	// Split the input string into an array of words using regular expression.
	const words = input.trim().split(/\s+/)
	// Filters the array 'words' to only include valid words, then gets the length of the filtered array
	return words.filter(word => isWord(word)).length
}

/**
 * Checks if the given string contains alphanumeric characters.
 * @param str - The string to check for alphanumeric characters.
 * @returns True if the string contains alphanumeric characters, false otherwise.
 */
function isWord(str: string) {
	// Tests if the string 'str' contains any word characters (alphanumeric or underscore)
	return /\w/.test(str)
}

/**
 * Calculates the reading time of a given text.
 * @param text - The text to calculate reading time for.
 * @returns The reading time in minutes as a formatted string.
 */
export function readingTime(text: string) {
	if (!text) return '0 min read'

	// Average words per minute for reading.
	const wordsPerMinute = 225
	// Calculate the total reading time in minutes.
	const minutes = wordCounter(text) / wordsPerMinute
	// Round up to the nearest minute.
	const readTime = Math.ceil(minutes)
	// Format and return the reading time as a string.
	return `${readTime} min read`
}
