import React, { useState, useEffect } from 'react';

interface ArchitectureNode {
  id: string;
  name: string;
  children: ArchitectureNode[];
  content?: string;
}

const ArchitectureVisualizer: React.FC = () => {
  const [architectureData, setArchitectureData] = useState<ArchitectureNode | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArchitecture = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://localhost:8000/docs/ARCHITECTURE.md`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const markdownContent = data.content;
        setArchitectureData(parseArchitectureMarkdown(markdownContent));
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArchitecture();
  }, []);

  const parseArchitectureMarkdown = (markdown: string): ArchitectureNode => {
    const lines = markdown.split('\n');
    const root: ArchitectureNode = { id: 'root', name: 'Architecture', children: [] };
    let currentLevel: ArchitectureNode[] = [root]; // Stack to keep track of current parent at each level

    lines.forEach((line, index) => {
      if (line.startsWith('# ')) {
        const name = line.substring(2).trim();
        const newNode: ArchitectureNode = { id: `h1-${index}`, name, children: [] };
        currentLevel[0].children.push(newNode);
        currentLevel = [newNode]; // Reset for H1
      } else if (line.startsWith('## ')) {
        const name = line.substring(3).trim();
        const newNode: ArchitectureNode = { id: `h2-${index}`, name, children: [] };
        if (currentLevel.length > 0) {
          currentLevel[currentLevel.length - 1].children.push(newNode);
        } else {
          root.children.push(newNode); // Fallback if no parent H1
        }
        currentLevel.push(newNode);
      } else if (line.startsWith('### ')) {
        const name = line.substring(4).trim();
        const newNode: ArchitectureNode = { id: `h3-${index}`, name, children: [] };
        if (currentLevel.length > 1) { // Ensure there's a parent H2
          currentLevel[currentLevel.length - 1].children.push(newNode);
        } else if (currentLevel.length > 0) { // Fallback to H1 parent
            currentLevel[currentLevel.length - 1].children.push(newNode);
        } else {
            root.children.push(newNode);
        }
        currentLevel.push(newNode);
      } else if (line.trim() !== '') {
        // Add content to the last node
        if (currentLevel.length > 0) {
          const lastNode = currentLevel[currentLevel.length - 1];
          lastNode.content = (lastNode.content || '') + line + '\n';
        }
      }
    });
    return root;
  };

  const renderNode = (node: ArchitectureNode) => (
    <details key={node.id} open>
      <summary style={{ cursor: 'pointer', outline: 'none' }}>
        <strong>{node.name}</strong>
      </summary>
      <div style={{ marginLeft: '20px', borderLeft: '1px solid #555', paddingLeft: '10px' }}>
        {node.content && <p style={{ whiteSpace: 'pre-wrap', fontSize: '0.9em', color: '#AAA' }}>{node.content}</p>}
        {node.children.map(renderNode)}
      </div>
    </details>
  );

  if (loading) {
    return <p>Loading architecture...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>Error: {error}</p>;
  }

  return (
    <div className="architecture-visualizer" style={{ color: 'white', maxWidth: '800px', margin: '20px auto', padding: '20px', background: 'rgba(0,0,0,0.8)', borderRadius: '8px', zIndex: 10, position: 'relative' }}>
      <h2>Architecture Overview</h2>
      {architectureData ? renderNode(architectureData) : <p>No architecture data found.</p>}
    </div>
  );
};

export default ArchitectureVisualizer;
