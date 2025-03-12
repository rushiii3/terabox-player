export const useExtratID = () => {
  function extractCodeFromURL(url: string) {
    const id = url.split("/").pop();
    return id;
  }
  function extractCodeFromURLWeb(url: string) {
    const id = url.split("/").pop();
    return id?.substring(1);
  }
  return { extractCodeFromURL, extractCodeFromURLWeb };
};
