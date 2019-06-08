import {library} from "@fortawesome/fontawesome-svg-core";
import {faVideo, faCamera} from "@fortawesome/free-solid-svg-icons";

export const createFaLibrary = () => {
  library.add(faVideo, faCamera);
};
