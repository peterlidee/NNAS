import { useFormStatus } from 'react-dom';

export default function PendingSubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type='submit'
      className={`bg-blue-400 px-4 py-2 rounded-md disabled:bg-sky-200 disabled:text-gray-400 disabled:cursor-wait`}
      disabled={pending}
      aria-disabled={pending}
    >
      send
    </button>
  );
}
