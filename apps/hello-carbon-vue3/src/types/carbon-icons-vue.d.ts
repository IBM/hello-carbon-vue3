/**
 * Type definitions for @carbon/icons-vue 10.99.1
 * Project: https://github.com/carbon-design-system/carbon/tree/main/packages/icons-vue
 */

declare module "@carbon/icons-vue" {
  import { DefineComponent } from "vue";

  /**
   * Base Carbon icon component type
   * Carbon icons are Vue components that render SVG elements
   */
  export type CarbonIconComponent = DefineComponent<{
    /**
     * Specify a custom class
     */
    "class"?: string;

    /**
     * Specify a custom style
     */
    "style"?: string | Record<string, string | number>;

    /**
     * Specify the ARIA label for the icon
     */
    "aria-label"?: string;

    /**
     * Specify the ARIA hidden attribute
     */
    "aria-hidden"?: boolean;

    /**
     * Specify a title for the SVG element
     */
    "title"?: string;

    /**
     * Specify the size of the icon
     */
    "size"?: number | string;

    /**
     * Specify a description for the SVG element
     */
    "description"?: string;
  }>;

  // Icon exports

  // Education icons
  export const Education16: CarbonIconComponent;
  export const Education20: CarbonIconComponent;
  export const Education24: CarbonIconComponent;
  export const Education32: CarbonIconComponent;

  // Music icons
  export const Music16: CarbonIconComponent;
  export const Music20: CarbonIconComponent;
  export const Music24: CarbonIconComponent;
  export const Music32: CarbonIconComponent;

  // Nature/Sprout icons
  export const Sprout16: CarbonIconComponent;
  export const Sprout20: CarbonIconComponent;
  export const Sprout24: CarbonIconComponent;
  export const Sprout32: CarbonIconComponent;

  // Fashion/CameraAction icons
  export const CameraAction16: CarbonIconComponent;
  export const CameraAction20: CarbonIconComponent;
  export const CameraAction24: CarbonIconComponent;
  export const CameraAction32: CarbonIconComponent;

  // Fitness/Soccer icons
  export const Soccer16: CarbonIconComponent;
  export const Soccer20: CarbonIconComponent;
  export const Soccer24: CarbonIconComponent;
  export const Soccer32: CarbonIconComponent;

  // Play/Basketball icons
  export const Basketball16: CarbonIconComponent;
  export const Basketball20: CarbonIconComponent;
  export const Basketball24: CarbonIconComponent;
  export const Basketball32: CarbonIconComponent;

  // Navigation icons
  export const ArrowLeft16: CarbonIconComponent;
  export const ArrowLeft20: CarbonIconComponent;
  export const ArrowLeft24: CarbonIconComponent;
  export const ArrowLeft32: CarbonIconComponent;

  export const ArrowRight16: CarbonIconComponent;
  export const ArrowRight20: CarbonIconComponent;
  export const ArrowRight24: CarbonIconComponent;
  export const ArrowRight32: CarbonIconComponent;

  // Add other icon exports that might be used in your project
  // The pattern is [IconName][Size]: CarbonIconComponent
}
