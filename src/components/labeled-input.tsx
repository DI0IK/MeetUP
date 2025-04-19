import style from './labeled-input.module.css';

export default function LabeledInput({
  type,
  size = 'default',
  label,
  placeholder,
  value,
}: {
  type: 'text' | 'email' | 'password';
  size: 'default' | 'login' | 'settings';
  label?: string;
  placeholder?: string;
  value?: string;
}) {
  if (!label) {
    return (
      <div className={style.input}>
        <input
          type={type}
          className={
            style['input'] +
            ' ' +
            style['size_' + size] +
            ' ' +
            style['type_' + type]
          }
          placeholder={placeholder}
          defaultValue={value}
        />
      </div>
    );
  } else {
    return (
      <div className={style.input}>
        <p>
          <label className={style['label']}>{label}</label>
        </p>

        <input
          type={type}
          className={
            style['input'] +
            ' ' +
            style['size_' + size] +
            ' ' +
            style['type_' + type]
          }
          placeholder={placeholder}
          defaultValue={value}
        />
      </div>
    );
  }
}
