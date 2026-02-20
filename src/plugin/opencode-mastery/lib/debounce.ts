/**
 * Debounce Utility
 * 
 * Simple debounce pattern for hook event handlers.
 * No external library needed - in-function timeout management.
 */

/**
 * Creates a debounced version of a function.
 * Delays execution until after the specified delay has passed without new calls.
 * 
 * @param fn - The function to debounce
 * @param delay - Delay in milliseconds
 * @returns A debounced function that delays execution
 */
export function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  
  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      fn(...args);
      timeoutId = null;
    }, delay);
  };
}
