from transformers import pipeline

# Create a Transformers summarizer
summarizer = pipeline("summarization")
text="Hello how are you. Hope you are doing good."
words=text.split()
# Summarize the text
summary = summarizer(text, max_length=len(words)//2)
# Print the summary
print(summary[0]['summary_text'])