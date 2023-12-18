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
  faExpand,
  faVolumeHigh,
  faGear,
  faBars,
  faHome,
  faUser,
  faPlus,
  faEllipsis,
  faArrowDown,
  faArrowUp,
  faArrowLeft,
  faArrowRight,
  faGrip,
  faTable,
} from "@fortawesome/free-solid-svg-icons";
import {
  faCopy,
  faSun,
  faMoon,
  faCalendar,
  faClosedCaptioning,
} from "@fortawesome/free-regular-svg-icons";
import {
  faDiscord,
  faFacebook,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

export const addIcon = () => {
  library.add(
    faGrip,
    faTable,
    faArrowLeft,
    faArrowRight,
    faPlus,
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
    faCalendar,
    faExpand,
    faVolumeHigh,
    faClosedCaptioning,
    faGear,
    faBars,
    faHome,
    faUser,
    faEllipsis,
    faArrowDown,
    faArrowUp
  );
};
