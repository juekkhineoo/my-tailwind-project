"use client";

import Konva from "konva";
import React, { useRef, useEffect } from "react";
import { Line, Circle, Group, Transformer } from "react-konva";

interface PolygonProps {
    props:any;
    linePoints:any;
    circlePoints:any;
    isSelected:boolean;
    onSelect: () => void;
}
const Polygon : React.FC<PolygonProps> = ({ props, linePoints, circlePoints, isSelected, onSelect }) => {
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

  const mouseEnter = (e:any) => {
    const container = e.target.getStage().container();
    container.style.cursor = "pointer";
  };
  const mouseLeave = (e:any) => {
    const container = e.target.getStage().container();
    container.style.cursor = "default";
  };
  return (
    <React.Fragment>
      <Group
        ref={groupRef}
        id={props.key}
        key={props.key}
        onClick={onSelect}
        onTap={onSelect}
        draggable={isSelected}
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
          id={props.key}
          points={linePoints}
          stroke={stroke}
          strokeWidth={2}
        />

        {circlePoints.map((circle:any) => {
          return (
            <Circle
              //draggable={isSelected}
              key={circle.key}
              x={circle.points.x}
              y={circle.points.y}
              radius={3}
              fill={stroke}
              // onDragMove={(e) => {
              //   handleCircleDragMove(circle.key, e);
              // }}
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
