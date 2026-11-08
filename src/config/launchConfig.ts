/**
 * BACKPACKERS DESTINATIONS — WEBSITE LAUNCH COUNTDOWN CONFIGURATION
 * 
 * Edit this file to set the exact date and time the website goes live.
 * The loading screen motorcycle will advance as the countdown progresses,
 * and automatically launch the website when the timer hits zero!
 */

export interface LaunchConfig {
  /**
   * Set to true to enable the countdown lock screen.
   * Set to false to disable countdown and load the website normally.
   */
  isEnabled: boolean;

  /**
   * Target Launch Date & Time in ISO 8601 format.
   * E.g. '2026-11-08T10:45:00+05:30' or any future Diwali date!
   */
  targetDate: string;

  /**
   * Starting timestamp for the bike's journey along the loading bar.
   * The motorcycle starts at 0% at startDate and reaches 100% at targetDate.
   */
  startDate?: string;

  /** Text displayed on the launch countdown badge */
  badgeText?: string;

  /** Headline message */
  title: string;

  /** Announcement or launch details */
  announcement: string;
}

export const LAUNCH_CONFIG: LaunchConfig = {
  // Set to false to disable countdown and load website normally
  isEnabled: false,
  targetDate: '2026-11-08T10:45:00+05:30',
  startDate: '2026-11-08T10:35:00+05:30',
  title: 'BACKPACKERS GOES LIVE',
  announcement: 'Launching today at 10:45 AM IST'
};
