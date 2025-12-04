import React, { useState, useEffect } from 'react';

interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  status?: string; // e.g., "Planned", "In Progress", "Completed"
}

const RoadmapVisualizer: React.FC = () => {
  const [roadmapData, setRoadmapData] = useState<RoadmapItem[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRoadmap = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://localhost:8000/docs/ROADMAP.md`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const markdownContent = data.content;
        setRoadmapData(parseRoadmapMarkdown(markdownContent));
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRoadmap();
  }, []);

  const parseRoadmapMarkdown = (markdown: string): RoadmapItem[] => {
    const items: RoadmapItem[] = [];
    const lines = markdown.split('\n');
    let currentItem: RoadmapItem | null = null;
    let itemIdCounter = 0;

    lines.forEach((line) => {
      if (line.startsWith('## ')) {
        // New roadmap item (H2 heading)
        if (currentItem) {
          items.push(currentItem);
        }
        currentItem = {
          id: `roadmap-${itemIdCounter++}`,
          title: line.substring(3).trim(),
          description: '',
        };
      } else if (currentItem && line.startsWith('- Status:')) {
        currentItem.status = line.substring('- Status:'.length).trim();
      } else if (currentItem && line.trim() !== '') {
        // Accumulate description
        currentItem.description += line.trim() + ' ';
      }
    });

    if (currentItem) {
      items.push(currentItem);
    }
    return items;
  };

  if (loading) {
    return <p>Loading roadmap...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>Error: {error}</p>;
  }

  return (
    <div className="roadmap-visualizer" style={{ color: 'white', maxWidth: '800px', margin: '20px auto', padding: '20px', background: 'rgba(0,0,0,0.8)', borderRadius: '8px', zIndex: 10, position: 'relative', marginTop: '20px' }}>
      <h2>Project Roadmap</h2>
      {roadmapData && roadmapData.length > 0 ? (
        roadmapData.map((item) => (
          <div key={item.id} style={{ marginBottom: '15px', borderBottom: '1px dashed #444', paddingBottom: '10px' }}>
            <h3>{item.title}</h3>
            {item.status && <p><strong>Status:</strong> {item.status}</p>}
            <p>{item.description.trim()}</p>
          </div>
        ))
      ) : (
        <p>No roadmap items found.</p>
      )}
    </div>
  );
};

export default RoadmapVisualizer;
