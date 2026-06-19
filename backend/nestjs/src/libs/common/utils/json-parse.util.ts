export function JSONParse<T>(data: string): T {
  return JSON.parse(data) as T;
}
