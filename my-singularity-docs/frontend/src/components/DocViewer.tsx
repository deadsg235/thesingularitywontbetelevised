import React, { useState, useEffect } from 'react';

interface DocViewerProps {
  filePath: string;
}

const DocViewer: React.FC<DocViewerProps> = ({ filePath }) => {
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDocContent = async () => {
      setLoading(true);
      setError(null);
      try {
        // Assuming FastAPI backend is running on http://localhost:8000
        const response = await fetch(`http://localhost:8000/docs/${filePath}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setContent(data.content);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDocContent();
  }, [filePath]);

  if (loading) {
    return <p>Loading document...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>Error: {error}</p>;
  }

  return (
    <div className="doc-viewer" style={{ color: 'white', maxWidth: '800px', margin: '20px auto', padding: '20px', background: 'rgba(0,0,0,0.8)', borderRadius: '8px', zIndex: 10, position: 'relative' }}>
      <pre>{content}</pre>
    </div>
  );
};

export default DocViewer;
