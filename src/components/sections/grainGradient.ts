/**
 * Separate entry so the hero shader can load after first paint.
 * A direct dynamic import of the package barrel would pull in every shader.
 */
export { GrainGradient } from '@paper-design/shaders-react';
