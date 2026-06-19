export function parseBoolean(value: any): boolean {
  // Если значение уже является логическим, просто возвращаем его
  if (typeof value === 'boolean') {
    return value;
  }

  // Если это строка, пытаемся ее распарсить
  if (typeof value === 'string') {
    const lowerValue = value.trim().toLowerCase();

    if (lowerValue === 'true') {
      return true;
    }

    if (lowerValue === 'false') {
      return false;
    }
  }

  // Если ни одно из условий не подошло, выбрасываем ошибку
  throw new Error(
    `Не удалось преобразовать значение "${value}" в логическое значение.`,
  );
}
