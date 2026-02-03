// Type definitions (for documentation purposes - not enforced at runtime)
// These were TypeScript interfaces, now converted to JSDoc comments for reference

/**
 * @typedef {Object} Habit
 * @property {string} id
 * @property {string} name
 * @property {string} emoji
 * @property {string} routineId
 * @property {string} createdAt
 * @property {number[]} [scheduledDays] - 0 = Sunday, 1 = Monday, ..., 6 = Saturday
 * @property {boolean} [isRecurring] - If true, repeats every week
 */

/**
 * @typedef {Object} HabitCompletion
 * @property {string} habitId
 * @property {string} date - YYYY-MM-DD format
 * @property {boolean} completed
 */

/**
 * @typedef {Object} Routine
 * @property {string} id
 * @property {string} name
 * @property {string} color
 * @property {boolean} enabled
 * @property {number} order
 * @property {string} createdAt
 */

/**
 * @typedef {Object} DayData
 * @property {Date} date
 * @property {string} dayName
 * @property {number} dayNumber
 * @property {boolean} isToday
 * @property {number} completedCount
 * @property {number} totalCount
 * @property {number} percentage
 */

/**
 * @typedef {Object} WeekData
 * @property {Date} startDate
 * @property {Date} endDate
 * @property {DayData[]} days
 */

// Export empty object to maintain module structure
export {};
