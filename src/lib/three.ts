/**
 * Single source of truth for Three.js imports
 * All components should import from this file instead of directly from 'three'
 * This ensures only one instance of Three.js is used throughout the application
 */

// Re-export everything from three
export * from 'three';

// Re-export default as well for compatibility
import * as THREE from 'three';
export default THREE;