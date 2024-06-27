"use client";

import React, { useRef, useState } from "react";
import { Stage, Layer } from "react-konva";
import _flatten from "lodash/flatten";
import Polygon from "./drawPolygon";

type StartPoint = {
    x:number,
    y:number
}

const DrawPolygon: React.FC = () => {
    const startPointObj : StartPoint = {x:0, y:0}
  const [polygonList, setPolygonList] = useState<any[]>([]);
  const [linePoints, setLinePoints] = useState<any[]>([]);
  const [circlePoints, setCirclePoints] = useState<any[]>([]);
  const [startPoint, setStartPoint] = useState<StartPoint>(startPointObj);
  const [selectedPolygon, setSelectedPolygon] = useState(null);
  const [isDraw, setIsDraw] = useState(false);
  const isDrawing = useRef(false);
  const connectPoint = useRef({ x: 0, y: 0 });
  const currentPoint = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e:any) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      setSelectedPolygon(null);
    }

    if (e.evt.button === 0 && isDraw) {
      // Left-click: Start drawing
      isDrawing.current = true;
      connectPoint.current = e.target.getStage().getPointerPosition();
      const addCirclePoints = [
        ...circlePoints,
        {
          key: circlePoints.length + 1,
          points: { x: connectPoint.current.x, y: connectPoint.current.y },
        },
      ];
      setCirclePoints(addCirclePoints);

      const valuesArray = addCirclePoints.map((obj) => Object.values(obj));
      if (linePoints.length == 0) {
        const { x, y } = connectPoint.current;
        setStartPoint({ x: x, y: y });
        const flattenedArray = valuesArray.flat(); //[{0,1},{2,3},..] => [0,1,2,3,..]
        flattenedArray.splice(flattenedArray.length, 2, x, y); // Inserts at index flattenedArray.length
        setLinePoints(flattenedArray);
        const addPolygon = [
          ...polygonList,
          {
            key: polygonList.length + 1,
            startPoint: { x: x, y: y },
            linePoints: flattenedArray,
            circlePoints: addCirclePoints,
          },
        ];
        setPolygonList(addPolygon);
      } else if (startPoint != null) {
        const addCirclesInPolygon = updatePolygonPoints(
          linePoints,
          addCirclePoints
        );
        setPolygonList(addCirclesInPolygon);
      }
    }
  };

  const splicePoints = (points:any) => {
    const chunkSize = 2;
    const chunks = [];
    for (let i = 0; i < points.length; i += chunkSize) {
      const chunk = points.slice(i, i + chunkSize);
      chunks.push(chunk);
    }
    return chunks;
  };
  const uniqueSet = (set:any): any[] => {
    // Convert the array to a Set to remove duplicates
    var uniqueSet = new Set(set.map(JSON.stringify));
    // Convert the Set back to an array
    var uniqueArray = Array.from(uniqueSet).map((item:any)=>JSON.parse(item));
    return uniqueArray;
  };

  const handleMouseMove = (e:any) => {
    if (isDrawing.current && isDraw) {
      currentPoint.current = e.target.getStage().getPointerPosition();
      const chunks = splicePoints(linePoints);
      const updateIndex = chunks.length - 2;
      chunks[updateIndex][0] = connectPoint.current.x;
      chunks[updateIndex][1] = connectPoint.current.y;
      chunks[updateIndex][2] = currentPoint.current.x;
      chunks[updateIndex][3] = currentPoint.current.y;
      const flatArray = chunks.flat(1);

      const splice = splicePoints(flatArray);
      const uniqueArray = uniqueSet(splice);
      uniqueArray.push([startPoint!.x, startPoint!.y]);
      var updatePoints = uniqueArray.flat();
      setLinePoints(updatePoints);

      const addCirclesInPolygon = updatePolygonPoints(
        updatePoints,
        circlePoints
      );
      setPolygonList(addCirclesInPolygon);
    }
  };

  const handleMouseUp = () => {
    //isDrawing.current = false;
  };

  const handleContextMenu = (e:any) => {
    // Right-click: Stop drawing
    e.evt.preventDefault();
    isDrawing.current = false;
    setLinePoints([]);
    setCirclePoints([]);
    setStartPoint(startPointObj);
    setIsDraw(false);
  };

  const updatePolygonPoints = (line:any, circle:any) => {
    const addCirclesInPolygon = polygonList.map((poly) => {
      if (poly.key == polygonList.length) {
        return {
          key: poly.key,
          startPoint: startPoint,
          linePoints: line,
          circlePoints: circle,
        };
      }
      return poly;
    });
    return addCirclesInPolygon;
  };

  return (
    <>
      <div className="border bg-white">
        <Stage
          width={1000}
          height={500}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onContextMenu={handleContextMenu}
        >
          <Layer>
            {polygonList.map((poly) => {
              return (
                <Polygon
                  key={poly.key}
                  props={poly}
                  linePoints={poly.linePoints}
                  circlePoints={poly.circlePoints}
                  isSelected={poly.key === selectedPolygon}
                  onSelect={() => {
                    setSelectedPolygon(poly.key);
                  }}
                />
              );
            })}
          </Layer>
        </Stage>
      </div>

      <button onClick={() => setIsDraw(true)}>Polygon</button>
    </>
  );
};

export default DrawPolygon;
