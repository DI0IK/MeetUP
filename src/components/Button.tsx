import style from './Button.module.css';

import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Button({
  type,
  children,
  mode = 'primary',
  icon,
}: {
  type?: 'button' | 'submit' | 'reset';
  children?: React.ReactNode;
  mode?: 'primary' | 'warning' | 'success' | 'danger';
  icon?: IconProp;
}) {
  if (!icon) {
    return (
      <button
        className={style.button + ' ' + style['style_' + mode]}
        type={type}
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
      >
        <FontAwesomeIcon icon={icon} height={25} />
        <span>{children}</span>
      </button>
    );
  }
}
