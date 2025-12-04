import React, { useState, useEffect } from 'react';
import Markdown from 'react-markdown';

interface GitHubDocViewerProps {
  filePath: string;
}

const GitHubDocViewer: React.FC<GitHubDocViewerProps> = ({ filePath }) => {
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDocContent = async () => {
      setLoading(true);
      setError(null);
      try {
        const githubRepoUrl = "https://raw.githubusercontent.com/deadsg235/SINGULARITY-DOCS/main/";
        const fullUrl = `${githubRepoUrl}${filePath}`;
        const response = await fetch(fullUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const text = await response.text();
        setContent(text);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDocContent();
  }, [filePath]);

  if (loading) {
    return <p style={{color: 'white'}}>Loading {filePath}...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>Error loading {filePath}: {error}</p>;
  }

  return (
    <div className="github-doc-viewer" style={{ color: 'white', maxWidth: '800px', margin: '20px auto', padding: '20px', background: 'rgba(0,0,0,0.8)', borderRadius: '8px', zIndex: 10, position: 'relative' }}>
      <Markdown>{content || ''}</Markdown>
    </div>
  );
};

export default GitHubDocViewer;
