// Константы времени в миллисекундах
const s = 1000;
const m = s * 60;
const h = m * 60;
const d = h * 24;
const w = d * 7;
const y = d * 365.25;

/**
 * Переводит строковое представление времени (например, "2h", "30d") в миллисекунды.
 * @param val Строка со значением времени
 * @returns Количество миллисекунд или undefined, если формат неверный
 */
export function ms(val: string): number | undefined {
  if (typeof val !== 'string' || val.trim().length === 0 || val.length > 100) {
    return undefined;
  }

  // Регулярное выражение выделяет числовую часть и единицу измерения
  const match =
    /^(?<value>-?(?:\d+)?\.?\d+) *(?<type>milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
      val.trim(),
    );

  if (!match || !match.groups) {
    return undefined;
  }

  const n = parseFloat(match.groups.value);
  const type = (match.groups.type || 'ms').toLowerCase();

  switch (type) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'yr':
    case 'y':
      return n * y;
    case 'weeks':
    case 'week':
    case 'w':
      return n * w;
    case 'days':
    case 'day':
    case 'd':
      return n * d;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return n * h;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return n * m;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 's':
      return n * s;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return n;
    default:
      return undefined;
  }
}
