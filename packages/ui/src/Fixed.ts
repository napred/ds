import { createComponent } from '@napred/browser';

const Fixed = createComponent('Fixed', 'div');

// temporary fix because if we use defaultProps in config object
// it will require them :(
Fixed.defaultProps = { position: 'fixed' };

export default Fixed;
