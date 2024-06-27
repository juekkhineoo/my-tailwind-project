"use client";

import { useState } from "react";
import { Layer, Stage, Line, Circle } from "react-konva";

const DrawingShape: React.FC = () => {
  const [points, setPoints] = useState<any[]>([]);
  const [initPoints, setInitPoints] = useState<any[]>([]);
  const [flatPoints, setFlatPoints] = useState<any[]>([]);
  const [curMousePos, setCurMousePos] = useState<any[]>([]);
  const [isMouseOverStartPoint, setIsMouseOverStartPoint] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  const getMousePos = (stage: any) => {
    return [
      stage.getPointerPosition().x.toFixed(2),
      stage.getPointerPosition().y.toFixed(2),
    ];
  };

  const handleClick = (event:any) => {
    console.log("%%%handle click%%%");
    
    const stage = event.target.getStage();
    const mousePos = getMousePos(stage);

    if (isFinished) {
      return;
    }
    if (isMouseOverStartPoint && points.length >= 3) {
        setIsFinished(true);
    } else {
        const linepoints = [...points, mousePos]
        const init_points = JSON.parse(JSON.stringify(linepoints))
        const flat_points = points.concat(isFinished ? [] : curMousePos).reduce((a,b) => a.concat(b), [])
        console.log("init_points=>", init_points)
        
        setPoints(linepoints);
        setInitPoints(init_points);
        setFlatPoints(flat_points);
    }
  };

  const handleMouseMove = (event:any) => {
    console.log("### mouse move ###");
    const stage = event.target.getStage();
    const mousePos = getMousePos(stage);
    
    setCurMousePos(mousePos)
  };

  const handleMouseOverStartPoint = (event:any) => {
    console.log("%%%MouseOverStartPoint%%%");
    if (isFinished || points.length < 3) return;
    event.target.scale({ x: 2, y: 2 });

    setIsMouseOverStartPoint(true);
  };

  const handleMouseOutStartPoint = (event:any) => {
    console.log("%%%MouseOverStartPoint%%%");
    event.target.scale({ x: 1, y: 1 });

    setIsMouseOverStartPoint(false);
  };

//   const handleDragStartPoint = (event:any) => {
//     console.log("drag start point", event);
//   };
  const handleDragMovePoint = (event:any) => {
    console.log("*** Drag Move Point***");
    if (event.target.name() == "Circle") {
      const index = event.target.index - 1;
      const pos = [
        event.target.attrs.x.toFixed(2),
        event.target.attrs.y.toFixed(2),
      ];
      const linepoints = [...points.slice(0, index), pos, ...points.slice(index + 1)]
      const flatpoints = points.concat(isFinished ? [] : curMousePos).reduce((a, b) => a.concat(b), [])
      setPoints(linepoints)
      setFlatPoints(flatPoints)
    }
  };

//   const updateDraw = (layer:any, stage:any) => {
//     layer.drawScene();
//     layer.drawHit();
//     stage.batchDraw();

//     stage.clearCache();
//     layer.clearCache();
//   }

  const handleDragMoveLine = (event:any) => {
    console.log("***DragMoveLine***");
    let i;
    for (i = 0; i < points.length; i++) {
      let point = points[i];
      let init_point = initPoints[i];
      console.log("****", point, init_point);
      point[0] = parseFloat(init_point[0]) + parseFloat(event.target.x());
      point[1] = parseFloat(init_point[1]) + parseFloat(event.target.y());
      points[i] = point;
      console.log("****points[i]", point, init_point);
    }
    event.target.position({ x: 0, y: 0 });
    console.log("move line curMousePos =>", curMousePos);
    
    const flatpoints = points.concat(isFinished ? [] : curMousePos).reduce((a, b) => a.concat(b), [])
    setPoints(points);
    setFlatPoints(flatPoints)
  };

  const handleDragEndPoint = (event:any) => {
    console.log("dragend", event);
    // event.target.to({
    //     x: Math.round(event.target.x() / this.state.grid) * this.state.grid,
    //     y: Math.round(event.target.y() / this.state.grid) * this.state.grid,
    // })
  };

  // [ [a, b], [c, d], ... ] to [ a, b, c, d, ...]
  const flattenedPoints = points
  .concat(isFinished ? [] : curMousePos)
  .reduce((a, b) => a.concat(b), []);

  return (
    <>
      <h1>Drawing Shape</h1>
      <div>
          points: {JSON.stringify(points)} <br />
          Poly points: {JSON.stringify(flatPoints)} <br />
          mouse: x: {curMousePos[0]}, y: {curMousePos[1]} <br />
          flattenedPoints: {JSON.stringify(flattenedPoints)}
        </div>
        <div className="border bg-white">
          <Stage
            width={1630}
            height={700}
            onMouseDown={handleClick}
            onMouseMove={handleMouseMove}
          >
            <Layer>
              <Line
                points={flattenedPoints}
                // points={this.state.flat_points}
                stroke="black"
                strokeWidth={2}
                closed={isFinished}
                draggable={true}
                name="Poly"
                onDragEnd={handleDragEndPoint}
                onDragMove={handleDragMoveLine}
              />
              {points.map((point, index) => {
                const width = 5;
                const x = point[0] - width / 2;
                const y = point[1] - width / 2;
                const startPointAttr =
                  index === 0
                    ? {
                        hitStrokeWidth: 12,
                        onMouseOver: handleMouseOverStartPoint,
                        onMouseOut: handleMouseOutStartPoint,
                      }
                    : null;
                return (
                  <Circle
                    key={index}
                    x={x + width / 2}
                    y={y + width / 2}
                    radius={width}
                    fill="green"
                    name="Circle"
                    stroke="green"
                    strokeWidth={1}
                    //onDragStart={handleDragStartPoint}
                    onDragMove={handleDragMovePoint}
                    onDragEnd={handleDragEndPoint}
                    draggable
                    {...startPointAttr}
                  />
                );
              })}
            </Layer>
          </Stage>
        </div>
    </>
  );
};

export default DrawingShape;
