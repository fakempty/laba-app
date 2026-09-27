export namespace Validation {
  export function isNotEmpty(value: string): boolean {
    return typeof value === 'string' && value.trim().length > 0;
  }

  export function isNumericId(value: string): boolean {
    return /^\d+$/.test(value.trim());
  }

  export function isValidYear(value: string | number): boolean {
    const yearStr = value.toString().trim();
    if (!/^\d{4}$/.test(yearStr)) return false;
    const yearNum = parseInt(yearStr, 10);
    return yearNum >= 1000 && yearNum <= new Date().getFullYear();
  }

  export function isValidEmail(value: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
  }
}