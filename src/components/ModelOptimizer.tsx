"use client";
import { useEffect, useState } from 'react';

interface ModelOptimizationTips {
  compression: string;
  format: string;
  size: string;
  loading: string;
}

export function ModelOptimizationGuide() {
  const [tips, setTips] = useState<ModelOptimizationTips>({
    compression: "Use Draco compression to reduce file size by 60-80%",
    format: "GLB format is more efficient than GLTF for single files",
    size: "Keep models under 5MB for web use, under 2MB for mobile",
    loading: "Implement progressive loading with LOD (Level of Detail)"
  });

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: '10px',
      left: '10px',
      background: 'rgba(0,0,0,0.9)',
      color: 'white',
      padding: '15px',
      borderRadius: '8px',
      fontSize: '12px',
      zIndex: 9999,
      maxWidth: '300px',
      fontFamily: 'monospace'
    }}>
      <div style={{ fontWeight: 'bold', marginBottom: '10px', color: '#7b5cff' }}>
        🚀 3D Model Optimization Tips
      </div>
      <div style={{ marginBottom: '8px' }}>
        <strong>Compression:</strong> {tips.compression}
      </div>
      <div style={{ marginBottom: '8px' }}>
        <strong>Format:</strong> {tips.format}
      </div>
      <div style={{ marginBottom: '8px' }}>
        <strong>Size:</strong> {tips.size}
      </div>
      <div style={{ marginBottom: '8px' }}>
        <strong>Loading:</strong> {tips.loading}
      </div>
      <div style={{ fontSize: '10px', color: '#00eaff', marginTop: '10px' }}>
        💡 Consider using Blender's "Decimate" modifier to reduce polygon count
      </div>
    </div>
  );
}

// Utility function to check model size and suggest optimizations
export function analyzeModelPerformance(url: string): Promise<{
  size: number;
  suggestions: string[];
}> {
  return fetch(url, { method: 'HEAD' })
    .then(response => {
      const contentLength = response.headers.get('content-length');
      const size = contentLength ? parseInt(contentLength) : 0;
      const sizeKB = Math.round(size / 1024);
      
      const suggestions: string[] = [];
      
      if (sizeKB > 5000) {
        suggestions.push('Model is very large (>5MB). Consider compression or LOD.');
      } else if (sizeKB > 2000) {
        suggestions.push('Model is large (>2MB). Consider Draco compression.');
      }
      
      if (url.includes('.gltf')) {
        suggestions.push('Consider converting to GLB format for better performance.');
      }
      
      if (!url.includes('draco')) {
        suggestions.push('Enable Draco compression to reduce file size significantly.');
      }
      
      return { size: sizeKB, suggestions };
    })
    .catch(() => ({ size: 0, suggestions: ['Unable to analyze model'] }));
}
