import style from './labeled-input.module.css';

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
      <div className={style.input}>
        <input
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
      <div className={style.input}>
        <label htmlFor={randomId} className={style['label']}>
          {label}
        </label>

        <input
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
