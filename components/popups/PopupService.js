let popupTrigger;

export const registerPopupTrigger = (trigger) => {
  popupTrigger = trigger;
};

export const showPopup = ({ type, title, text, duration = 3000 }) => {
  if (popupTrigger) {
    popupTrigger({ type, title, text, duration });
  }
};
