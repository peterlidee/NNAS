import { usePathname, useSearchParams } from 'next/navigation';

export default function useCallbackUrl() {
  const pathname = usePathname();
  const params = useSearchParams().toString();
  // if there are no params, don't add the ?
  const callbackUrl = `${pathname}${params ? '?' : ''}${params}`;
  return callbackUrl;
}
