import { toZonedTime, format } from 'date-fns-tz';

export function getNowBr(): string {
  const timeZone = 'America/Sao_Paulo';
  const now = new Date();
  const brDate = toZonedTime(now, timeZone);
  const isoString = format(brDate, "yyyy-MM-dd'T'HH:mm:ssXXX", { timeZone });
  return isoString;
}
