import { createComponent } from '@napred/ds';
import { Image } from '@napred/primitives';

const Avatar = createComponent('Avatar', Image, {
  style: {
    borderRadius: '99999px',
    display: 'inline-block',
    objectFit: 'contain',
  },
});

// temporary fix because if we use defaultProps in config object
// it will require them :(
Avatar.defaultProps = {
  flexShrink: 0,
  height: 48,
  width: 48,
};

export default Avatar;
