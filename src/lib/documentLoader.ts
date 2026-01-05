/**
 * Load documents from the public documents directory
 * Documents are expected to be in /public/documents/ as text files
 */
export interface Document {
  id: string;
  data: {
    title: string;
    snippet: string;
  };
}

export async function loadDocuments(): Promise<Document[]> {
  try {
    // Fetch the files list from the documents directory
    const response = await fetch('/documents/files.txt');
    if (!response.ok) {
      console.warn('Could not load documents list');
      return [];
    }

    const filesList = await response.text();
    const fileNames = filesList
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0 && line.endsWith('.txt'));

    const documents: Document[] = [];

    // Load each document
    for (const fileName of fileNames) {
      try {
        const docResponse = await fetch(`/documents/${fileName}`);
        if (docResponse.ok) {
          const content = await docResponse.text();
          documents.push({
            id: `doc:${documents.length}`,
            data: {
              title: fileName.replace('.txt', ''),
              snippet: content.substring(0, 500), // Use first 500 chars as snippet
            },
          });
        }
      } catch (error) {
        console.warn(`Failed to load document ${fileName}:`, error);
      }
    }

    return documents;
  } catch (error) {
    console.warn('Error loading documents:', error);
    return [];
  }
}

/**
 * Format documents for Cohere's RAG API
 * Documents should be chunks of ~400 words for best performance
 */
export function formatDocumentsForRAG(documents: Document[]) {
  return documents.map((doc) => ({
    data: {
      title: doc.data.title,
      snippet: doc.data.snippet,
    },
  }));
}
