const formatString = (str: string, maxLength: number) => {
  const words = str.split(" ");
  let shortString = words?.slice(0, maxLength)?.join(" ");

  if (words?.length > maxLength) {
    shortString += "...";
  }
  return shortString;
};

export default formatString;
