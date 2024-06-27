"use client";

import React, { useState } from "react";
import { Stage, Layer, Line, Circle, Group, Text } from "react-konva";
import Konva from "konva";

const CirclePoints = [
  { key: 1, points: { x: 77, y: 159 } },
  { key: 2, points: { x: 142, y: 88 } },
  { key: 3, points: { x: 245, y: 140 } },
  { key: 4, points: { x: 213, y: 204 } },
  { key: 5, points: { x: 85, y: 218 } },
];
const CustomShapeDragExample: React.FC = () => {
  const [draggingShape, setDraggingShape] = useState(false);
  const [shapePosition, setShapePosition] = useState({ x: 100, y: 100 });

  const handleDragStart = () => {
    setDraggingShape(true);
  };

  const handleDragEnd = (event: Konva.KonvaEventObject<DragEvent>) => {
    setDraggingShape(false);
    // Update shape position after drag
    setShapePosition({
      x: event.target.x(),
      y: event.target.y(),
    });
  };

  console.log("")

  return (
    <div className="border bg-white">
        <Stage width={1630} height={800}>
      <Layer>
        {/* Group for the custom shape */}
        <Group
          draggable
          //onDragStart={handleDragStart}
          //onDragEnd={handleDragEnd}
        >
          <Line
            points={[77, 159, 142, 88, 245, 140, 213, 204, 85, 218, 77, 159]}
            closed
            //fill="#00D2FF"
            stroke="black"
            strokeWidth={2}
          />

          {CirclePoints.map(c => {
            return (
                <Circle key={c.key} x={c.points.x} y={c.points.y} radius={5} fill="red" draggable />
            )
          })}
        </Group>
      </Layer>
    </Stage>
    </div>
    
  );
};

export default CustomShapeDragExample;
