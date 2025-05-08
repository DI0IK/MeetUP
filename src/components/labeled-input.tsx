export default function LabeledInput({
  type,
  width,
  label,
  placeholder,
  value,
}: {
  type: 'text' | 'email' | 'password';
  width?: number;
  label?: string;
  placeholder?: string;
  value?: string;
}) {
  const randomId = Math.random().toString(36).substring(2, 15);

  if (!label) {
    return (
      <div className='flex flex-col gap-2'>
        <input
          className='border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
          type={type}
          placeholder={placeholder}
          defaultValue={value}
          style={{
            width: width ? `${width}px` : '100%',
          }}
        />
      </div>
    );
  } else {
    return (
      <div className='flex flex-col gap-2'>
        <label htmlFor={randomId}>{label}</label>

        <input
          className='border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
          id={randomId}
          type={type}
          placeholder={placeholder}
          defaultValue={value}
          style={{
            width: width ? `${width}px` : '100%',
          }}
        />
      </div>
    );
  }
}
