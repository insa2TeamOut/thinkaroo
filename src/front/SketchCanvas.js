import React, { useRef, useState, useEffect } from 'react';
import './SketchCanvas.css'; // CSS 스타일을 위한 파일

const SketchCanvas = ({ onSave }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    setContext(ctx);
    canvas.width = window.innerWidth * 0.8; // 캔버스 크기 설정
    canvas.height = 500; // 캔버스 높이 설정
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 5; // 기본 선 두께
    ctx.strokeStyle = 'black'; // 기본 선 색상

    return () => {
      // Cleanup if necessary
    };
  }, []);

  const startDrawing = (e) => {
    if (context) {
      setIsDrawing(true);
      context.beginPath();
      context.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    }
  };

  const draw = (e) => {
    if (isDrawing && context) {
      context.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
      context.stroke();
    }
  };

  const stopDrawing = () => {
    if (context) {
      setIsDrawing(false);
      context.closePath();
    }
  };

  const handleSave = () => {
    if (canvasRef.current) {
      const image = canvasRef.current.toDataURL('image/png');
      onSave(image);
    }
  };

  return (
    <div className="sketch-canvas-container">
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      />
      <button onClick={handleSave}>Save Sketch</button>
    </div>
  );
};

export default SketchCanvas;
