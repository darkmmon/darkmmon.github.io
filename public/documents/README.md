/\*\*

- How to use the RAG (Retrieval-Augmented Generation) feature
-
- The chatbot now supports RAG, which allows it to answer questions based on
- a knowledge base of documents you provide.
-
- ADDING DOCUMENTS:
- 1.  Create text files (.txt) in the `/public/documents/` folder
- 2.  Update `/public/documents/files.txt` with a list of your document filenames (one per line)
- 3.  The chatbot will automatically load these documents on startup
-
- DOCUMENT FORMAT:
- - Each document should be a plain text file (.txt)
- - Documents are converted to snippets (first 500 chars) for better performance
- - For best results, keep documents focused on specific topics
- - Recommended document size: ~400 words per snippet (adjust in documentLoader.ts if needed)
-
- EXAMPLE:
- If you want to add company knowledge:
- 1.  Create /public/documents/company_info.txt with company information
- 2.  Create /public/documents/faqs.txt with FAQ content
- 3.  Update /public/documents/files.txt to contain:
- company_info.txt
- faqs.txt
-
- The chatbot will then use these documents as context when answering questions,
- and can provide citations showing which documents its answers came from.
  \*/
