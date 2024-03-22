type Props = {
  username: string;
};

export default function EditUsername({ username }: Props) {
  return (
    <div className='mb-2'>
      <div className='block italic'>Username: </div>
      <div>{username}</div>
    </div>
  );
}
