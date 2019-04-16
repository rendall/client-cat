/** Any keyboard or keypress logic goes here */
const KEY_TAB = 9;
const KEY_ESCAPE = 27;
const preventTabbingEvent = (e: KeyboardEvent) => {
  if (e.keyCode === KEY_TAB) e.preventDefault();
};
export const setPreventTabbing = (doPrevent: Boolean = true) =>
  doPrevent
    ? document.addEventListener("keydown", preventTabbingEvent)
    : document.removeEventListener("keydown", preventTabbingEvent);
export const onEscape = (
  listener: (e: KeyboardEvent) => void
): (() => void) => {
  const escapeListener = (e: KeyboardEvent) => {
    if (e.keyCode === KEY_ESCAPE) listener(e);
  };
  const removeListener = () =>
    document.removeEventListener("keydown", escapeListener);
  document.addEventListener("keydown", escapeListener);
  return removeListener;
};
