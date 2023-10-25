import { library } from "@fortawesome/fontawesome-svg-core";

import {
  faShare,
  faPlay,
  faTv,
  faCheck,
  faEye,
  faStop,
  faPersonRunning,
  faSpinner,
  faTriangleExclamation,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import {
  faCopy,
  faSun,
  faMoon,
  faCalendar,
} from "@fortawesome/free-regular-svg-icons";
import {
  faDiscord,
  faFacebook,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

export const addIcon = () => {
  library.add(
    faShare,
    faPlay,
    faTv,
    faCheck,
    faEye,
    faStop,
    faPersonRunning,
    faSpinner,
    faCopy,
    faTriangleExclamation,
    faDiscord,
    faFacebook,
    faYoutube,
    faSun,
    faMoon,
    faMagnifyingGlass,
    faCalendar
  );
};
