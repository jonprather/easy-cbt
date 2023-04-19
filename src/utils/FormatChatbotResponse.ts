const formatChatbotResponse = (message: string) => {
  const paragraphs = message.split("\n\n");
  return paragraphs.filter((paragraph) => paragraph.trim().length > 0);
};
export default formatChatbotResponse;
