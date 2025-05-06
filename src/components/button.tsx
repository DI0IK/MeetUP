import style from './button.module.css';

import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Button({
  type,
  children,
  mode = 'primary',
  icon,
  width,
}: {
  type?: 'button' | 'submit' | 'reset';
  children?: React.ReactNode;
  mode?: 'primary' | 'warning' | 'success' | 'danger' | 'neutral';
  icon?: IconProp;
  width?: number;
}) {
  if (!icon) {
    return (
      <button
        className={style.button + ' ' + style['style_' + mode]}
        type={type}
        style={{
          width: width ? `${width}px` : '100%',
        }}
      >
        <span>{children}</span>
      </button>
    );
  } else {
    return (
      <button
        className={
          style.button + ' ' + style['style_' + mode] + ' ' + style['icon']
        }
        type={type}
        style={{
          width: width ? `${width}px` : '100%',
        }}
      >
        <FontAwesomeIcon icon={icon} height={25} />
        <span>{children}</span>
      </button>
    );
  }
}
