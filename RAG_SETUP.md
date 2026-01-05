# RAG Implementation Guide

Your chatbox now supports **Retrieval-Augmented Generation (RAG)** using Cohere's API. This allows the chatbot to answer questions using knowledge from your custom documents.

## What's Changed

### 1. **New Document Loader Utility** (`src/lib/documentLoader.ts`)

- `loadDocuments()`: Fetches all documents from `/public/documents/`
- `formatDocumentsForRAG()`: Formats documents for the Cohere API

### 2. **Updated ChatBox Component** (`src/app/components/ChatBox.tsx`)

- Automatically loads documents on component mount
- Passes documents to Cohere's Chat API with each request
- The API uses these documents as context to generate more informed responses

### 3. **Document Directory** (`/public/documents/`)

- Place your knowledge base files here as `.txt` files
- Update `/public/documents/files.txt` with a list of your document filenames

## How to Add Documents

### Step 1: Create Text Files

Create `.txt` files in `/public/documents/` with your knowledge base content:

```
/public/documents/
├── company_info.txt
├── faqs.txt
├── product_guide.txt
└── files.txt
```

### Step 2: Update files.txt

Edit `/public/documents/files.txt` and list your documents (one per line):

```
company_info.txt
faqs.txt
product_guide.txt
```

### Step 3: Restart the App

The chatbot will automatically load these documents on the next page load.

## Document Best Practices

According to Cohere's RAG documentation:

- **Document Size**: Keep documents around 400 words for optimal performance
- **Topic Focus**: Each document should focus on a specific topic
- **Content Quality**: Accurate, well-structured content produces better results
- **File Format**: Use plain text (.txt) files only

## Example: Adding Company Knowledge

Create `/public/documents/company_info.txt`:

```
Company Overview:
Our company was founded in 2020 and specializes in AI solutions.
We have 50+ employees across 3 offices worldwide.
Our mission is to make AI accessible to everyone.

Services:
- Consulting
- Custom AI Development
- Training & Education
```

Update `/public/documents/files.txt`:

```
company_info.txt
```

Now when a user asks "Tell me about your company", the chatbot will reference this document and provide accurate information with citations.

## How RAG Works

1. **User asks a question** → Your message goes to Cohere's Chat API
2. **Documents are sent as context** → The documents you added are included
3. **API generates response** → Uses documents to ground the answer
4. **Response includes citations** → References which documents were used

## Modifying Document Size

If you want to adjust the snippet size (currently 500 characters), edit `src/lib/documentLoader.ts`:

```typescript
snippet: content.substring(0, 500), // Change 500 to your desired size
```

## Troubleshooting

- **Documents not loading?** Check that your filenames in `files.txt` exactly match the actual `.txt` files in `/public/documents/`
- **Empty responses?** Ensure your `.txt` files contain actual content
- **API errors?** Verify your `NEXT_PUBLIC_COHERE_API_KEY` is set correctly in environment variables

## References

- [Cohere RAG Documentation](https://docs.cohere.com/docs/retrieval-augmented-generation-rag)
- [Chat API Reference](https://docs.cohere.com/reference/chat)
