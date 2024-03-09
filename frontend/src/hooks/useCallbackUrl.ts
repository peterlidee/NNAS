import { usePathname, useSearchParams } from 'next/navigation';

export default function useCallbackUrl() {
  const pathname = usePathname();
  const params = useSearchParams().toString();
  const callbackUrl = `${pathname}${params ? '?' : ''}${params}`;
  return callbackUrl;
}
