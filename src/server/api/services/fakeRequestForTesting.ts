//   For testing... return this rather than use OPENAI tokens
export const fakeRequest = (
  text: string,
  shouldReject?: boolean
): Promise<string> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldReject) {
        reject(new Error("Request failed"));
      } else {
        resolve(text);
      }
    }, 1000);
  });
