"use client";

import React, { useEffect, useRef, useState } from "react";
import { Stage, Layer } from "react-konva";
import _flatten from "lodash/flatten";
import Polygon from "./drawPolygon";
import { StartPoint, PolygonData, CircleData } from "../types/polygontypes";

const DrawPolygon: React.FC = () => {
  const startPointObj: StartPoint = { x: 0, y: 0 };
  const [polygonList, setPolygonList] = useState<PolygonData[]>([]);
  const [linePoints, setLinePoints] = useState<number[]>([]);
  const [circlePoints, setCirclePoints] = useState<CircleData[]>([]);
  const [startPoint, setStartPoint] = useState<StartPoint>(startPointObj);
  const [selectedPolygonId, setSelectedPolygonId] = useState<number>(0);
  const [isDraw, setIsDraw] = useState(false);
  const isDrawing = useRef(false);
  const connectPoint = useRef({ x: 0, y: 0 });
  const currentPoint = useRef({ x: 0, y: 0 });
  const [imgWidth, setImgWidth] = useState(1250);
  const [imgHeight, setImgHeight] = useState(500);

  useEffect(() => {
    if (selectedPolygonId != 0) {
      // Add 'keydown' event listener to the window
      window.addEventListener("keydown", handleKeyDown);

      // Remove the event listener when the component unmounts
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [selectedPolygonId]);

  const handleKeyDown = (e: any) => {
    // Check if the pressed key is the delete key (keyCode 46)
    if (e.key === "Delete" && selectedPolygonId != 0) {
      const updatePolygons = polygonList.filter(
        (poly) => poly.key != selectedPolygonId
      );
      setPolygonList(updatePolygons);
      setSelectedPolygonId(0);
    }
  };

  const handleMouseDown = (e: any) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      setSelectedPolygonId(0);
    }

    if (e.evt.button === 0 && isDraw) {
      // Left-click: Start drawing
      isDrawing.current = true;
      connectPoint.current = e.target.getStage().getPointerPosition();
      const { x, y } = connectPoint.current;
      const addCirclePoints = [
        ...circlePoints,
        {
          key: circlePoints.length + 1,
          points: { x: x, y: y },
        },
      ];
      setCirclePoints(addCirclePoints);

      if (linePoints.length == 0) {
        addPolygons(addCirclePoints, x, y);
      } else if (startPoint != null) {
        const addCirclesInPolygon = updatePolygonPoints(
          linePoints,
          addCirclePoints
        );
        setPolygonList(addCirclesInPolygon);
      }
    }
  };

  const addPolygons = (circlePoints: CircleData[], x: number, y: number) => {
    const valuesArray = circlePoints.map((obj) => Object.values(obj));
    const flattenedArray = valuesArray.flat() as number[]; //[{0,1},{2,3},..] => [0,1,2,3,..]
    flattenedArray.splice(flattenedArray.length, 2, x, y); // Inserts at index flattenedArray.length
    const addPolygon: PolygonData[] = [
      ...polygonList,
      {
        key: polygonList.length + 1,
        startPoint: { x: x, y: y },
        linePoints: flattenedArray,
        circlePoints: circlePoints,
        origin: [0, 0],
      },
    ];
    setStartPoint({ x: x, y: y });
    setLinePoints(flattenedArray);
    setPolygonList(addPolygon);
  };

  const splicePoints = (points: any) => {
    const chunkSize = 2;
    const chunks = [];
    for (let i = 0; i < points.length; i += chunkSize) {
      const chunk = points.slice(i, i + chunkSize);
      chunks.push(chunk);
    }
    return chunks;
  };
  const uniqueSet = (set: any): any[] => {
    // Convert the array to a Set to remove duplicates
    var uniqueSet = new Set(set.map(JSON.stringify));
    // Convert the Set back to an array
    var uniqueArray = Array.from(uniqueSet).map((item: any) =>
      JSON.parse(item)
    );
    return uniqueArray;
  };

  const handleMouseMove = (e: any) => {
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

  const handleContextMenu = (e: any) => {
    // Right-click: Stop drawing
    currentPoint.current = e.target.getStage().getPointerPosition();
    const { x, y } = currentPoint.current;
    checkAndAddCirclePoint(x,y)
    
    e.evt.preventDefault();
    isDrawing.current = false;
    setLinePoints([]);
    setCirclePoints([]);
    setStartPoint(startPointObj);
    setIsDraw(false);
  };

  // Function to check and add if necessary
  function checkAndAddCirclePoint(x: number, y: number): void {
    // Check if { x, y } exists in any object's points
    const exists = circlePoints.some(
      (item) => item.points.x === x && item.points.y === y
    );

    // If not exists, add { x, y } to data
    if (!exists) {
      const newKey = circlePoints.length + 1; // Generate new key
      circlePoints.push({
        key: newKey,
        points: { x: x, y: y }
      });
    }
  }

  const updatePolygonPoints = (line: any, circle: any) => {
    const addCirclesInPolygon = polygonList.map((poly) => {
      if (poly.key == polygonList.length) {
        return {
          key: poly.key,
          startPoint: startPoint,
          linePoints: line,
          circlePoints: circle,
          origin: poly.origin,
        };
      }
      return poly;
    });
    return addCirclesInPolygon;
  };

  return (
    <div>
      <div className="border bg-white">
        <Stage
          width={imgWidth}
          height={imgHeight}
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
                  poly={poly}
                  linePoints={poly.linePoints}
                  circlePoints={poly.circlePoints}
                  isSelected={poly.key === selectedPolygonId}
                  onSelect={() => {
                    setSelectedPolygonId(poly.key);
                  }}
                />
              );
            })}
          </Layer>
        </Stage>
      </div>

      <button onClick={() => setIsDraw(true)}>Polygon</button>
    </div>
  );
};

export default DrawPolygon;
