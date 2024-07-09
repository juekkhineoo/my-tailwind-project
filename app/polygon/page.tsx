"use client";

import React, { useEffect, useRef, useState } from "react";
import { Stage, Layer } from "react-konva";
import _flatten from "lodash/flatten";
import Polygon from "./drawPolygon";
import { StartPoint, PolygonData } from "../types/polygontypes";
import SplicePoints from "../utils/splicPoints";
import UniqueSet from "../utils/uniqueSet";
import RelativeToAbsolutePoints from "../utils/relativeToAbsolutePoints";
import UpdatePolygonPoints from "../utils/updatePolytonPoints";
import AddNewPolygons from "../utils/addNewPolygon";

const DrawPolygon: React.FC = () => {
  const startPointObj: StartPoint = { x: 0, y: 0 };
  const [polygonList, setPolygonList] = useState<PolygonData[]>([]);
  const [lineMovePoints, setLineMovePoints] = useState<number[]>([]);
  const [circlePoints, setCirclePoints] = useState<number[]>([]);
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

      const addCirclePoints = [...circlePoints, x, y];
      setCirclePoints(addCirclePoints);

      if (lineMovePoints.length == 0) {
        const addNewPolygon = AddNewPolygons(
          addCirclePoints,
          x,
          y,
          polygonList,
          imgWidth,
          imgHeight
        );
        setStartPoint({ x: x, y: y });
        setLineMovePoints(addNewPolygon.addCurclePoints);
        setPolygonList(addNewPolygon.polygons);
      } else if (startPoint != null) {
        const addCirclesInPolygon = UpdatePolygonPoints(
          lineMovePoints,
          addCirclePoints,
          polygonList,
          imgWidth,
          imgHeight
        );
        setPolygonList(addCirclesInPolygon);
      }
    }
  };

  const handleMouseMove = (e: any) => {
    if (isDrawing.current && isDraw) {
      currentPoint.current = e.target.getStage().getPointerPosition();
      const chunks = SplicePoints(lineMovePoints);
      const updateIndex = chunks.length - 2;
      chunks[updateIndex][0] = connectPoint.current.x;
      chunks[updateIndex][1] = connectPoint.current.y;
      chunks[updateIndex][2] = currentPoint.current.x;
      chunks[updateIndex][3] = currentPoint.current.y;
      const flatArray = chunks.flat(1);

      const splice = SplicePoints(flatArray);
      const uniqueArray = UniqueSet(splice);
      uniqueArray.push([startPoint!.x, startPoint!.y]);
      var updatePoints = uniqueArray.flat();
      setLineMovePoints(updatePoints);

      const addCirclesInPolygon = UpdatePolygonPoints(
        updatePoints,
        circlePoints,
        polygonList,
        imgWidth,
        imgHeight
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
    checkAndAddCirclePoint(x, y);

    e.evt.preventDefault();
    isDrawing.current = false;
    setLineMovePoints([]);
    setCirclePoints([]);
    setStartPoint(startPointObj);
    setIsDraw(false);
  };

  // Function to check and add if necessary
  function checkAndAddCirclePoint(x: number, y: number): void {
    // Check if { x, y } exists in any object's points
    const spliceCirclePoints = SplicePoints(circlePoints);
    const exists = spliceCirclePoints.some(
      (item) => item[0] === x && item[1] === y
    );

    // If not exists, add { x, y } to data
    if (!exists) {
      setCirclePoints([...circlePoints, x, y]);
    }
  }

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
              const absolutePolyPoints = RelativeToAbsolutePoints(
                poly.polyPoints,
                poly.origin,
                imgWidth,
                imgHeight
              );
              const absoluteCirclePoints = RelativeToAbsolutePoints(
                poly.circlePoints.flat(),
                poly.origin,
                imgWidth,
                imgHeight
              );
              const flatPolyPoints = absolutePolyPoints.flat();
              return (
                <Polygon
                  key={poly.key}
                  poly={poly}
                  polyPoints={flatPolyPoints}
                  circlePoints={absoluteCirclePoints}
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
