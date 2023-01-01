// Улучшение UX
export function renderLoading(isLoading, button, texting, text) {
  if (isLoading) {
    button.textContent = texting;
  } else {
    button.textContent = text;
  }
}