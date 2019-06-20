import { string } from "prop-types";

declare namespace RKLibrary {
  interface StylingProps {
    /** the css class attribute */
    className?: string,
    /** the css style attribute */
    style?: object,
    /** the id attribute */
    id?: string

  }
}
