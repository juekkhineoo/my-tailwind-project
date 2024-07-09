"use client";

import Konva from "konva";
import React, { useRef, useEffect } from "react";
import { Line, Circle, Group, Transformer } from "react-konva";
import { PolygonData } from "../types/polygontypes";

interface PolygonProps {
  poly: PolygonData;
  polyPoints: number[];
  circlePoints: number[][];
  isSelected: boolean;
  onSelect: () => void;
}
const Polygon: React.FC<PolygonProps> = ({
  poly,
  polyPoints,
  circlePoints,
  isSelected,
  onSelect,
}) => {
  const groupRef = useRef<Konva.Group>(null);
  const trRef = useRef<Konva.Transformer>(null);
  let stroke = isSelected ? "Blue" : "Black";

  useEffect(() => {
    if (isSelected && trRef.current && groupRef.current) {
      // we need to attach transformer manually
      trRef.current.nodes([groupRef.current]);
      trRef.current.getLayer()?.batchDraw();
    }
  }, [isSelected]);

  const mouseEnter = (e: any) => {
    const container = e.target.getStage().container();
    container.style.cursor = "pointer";
  };
  const mouseLeave = (e: any) => {
    const container = e.target.getStage().container();
    container.style.cursor = "default";
  };
  return (
    <React.Fragment>
      <Group
        ref={groupRef}
        id={poly.key.toString()}
        key={poly.key}
        onClick={onSelect}
        onTap={onSelect}
        //draggable={isSelected}
        //onDragEnd={handleOnDrag}
        // dragBoundFunc={(pos) => {
        //   return handleGroupDragBound(pos);
        // }}
        onMouseEnter={(e) => {
          mouseEnter(e);
        }}
        onMouseLeave={(e) => {
          mouseLeave(e);
        }}
      >
        <Line
          closed
          id={poly.key.toString()}
          points={polyPoints}
          stroke={stroke}
          strokeWidth={2}
        />

        {circlePoints.map((circle: any, index:number) => {
          return (
            <Circle
              //draggable={isSelected}
              key={index}
              x={circle[0]}
              y={circle[1]}
              radius={3}
              fill={stroke}
              // onDragMove={(e) => {
              //   handleCircleDragMove(circle.key, e);
              // }}
              onMouseEnter={(e) => {
                mouseEnter(e);
              }}
              onMouseLeave={(e) => {
                mouseLeave(e);
              }}
            />
          );
        })}
      </Group>
      {isSelected && (
        <Transformer
          ref={trRef}
          flipEnabled={false}
          rotateEnabled={false}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (Math.abs(newBox.width) < 5 || Math.abs(newBox.height) < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
      )}
    </React.Fragment>
  );
};

export default Polygon;
