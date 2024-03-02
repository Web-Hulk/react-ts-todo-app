export const handleDarkMode = (isDarkMode: boolean) => {
  const newMode = !isDarkMode;
  localStorage.setItem("mode", JSON.stringify(newMode));
  return newMode;
};