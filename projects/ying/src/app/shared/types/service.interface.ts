/**
 * -------------------------------------------------
 * this interfaces are derived from firehouseService
 * -------------------------------------------------
 */

/**
 * Database document interface
 */
export interface Options {
  domain: string
}

/**
 * @param code - error response code
 * @param message - error response message
 */
export interface Error {
  code: string
  message: string
}

/**
 * -------------------------------------
 * User Authentication related interface
 * -------------------------------------
 */

/**
 * @param uid - user id will be system generated
 * @param name - required and must come from user input
 * @param email - required and must come from user input
 * @param password - required and must come from user input
 *
 * // optionals, can be change later on upon user info update.
 * @param nickname - null by default
 * @param gender - M or F by default
 * @param birthday - date is set by default
 * @param mobile - null by default
 */
export interface User {
  uid?: string
  name?: string
  email?: string
  password?: string
  nickname?: string
  gender?: 'M' | 'F'
  birthday?: string
  mobile?: string
}

/**
 * ------------------------
 * forum related interfaces
 * ------------------------
 */

/**
 * @param uid - user ID required in creating a post
 * @param id - post id
 * @param category - it is necessary to create a post
 * @param title - post title
 * @param content - post content
 * @param timestamps - when will be the post be created and updated
 * @param delete - by default must be false
 */
export interface Post {
  uid: string
  id: string
  category: string
  title: string
  content: string
  timestamp_create: any
  timestamp_update: any
  delete: boolean
}

/**
 * @method create
 *
 */
export interface PostCreate {
  category: string
  content?: string
  title?: string
  uid: string
  timestamp_create?: any
}

/**
 * @method update
 */
export interface PostUpdate {
  category?: string
  content?: string
  title?: string
  delete?: boolean
  timestamp_update?: any
}

/**
 * @method fetch
 */
export interface PostGets {
  category?: string
  limit?: number
  page?: number
  uid?: string
}
