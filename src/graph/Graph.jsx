import React, { useState, useRef } from "react";
import { useDimensions } from "webrix/hooks";
import { setGraphPosition, setPointData } from "../redux/slice/weatherSlice";

const Line = ({ path, color }) => {
  if (!path || path.length === 0) return null;
  const dx = 100 / (path.length - 1);
  const d = `M0,${path[0]} ${path
    .slice(1)
    .map((p, i) => {
      const startX = dx * i + dx / 2;
      const endX = dx * (i + 1) - dx / 2;
      const endY = path[i + 1] !== undefined ? path[i + 1] : 0;

      return `C${startX},${path[i]} ${endX},${endY} ${dx * (i + 1)},${endY}`;
    })
    .join(" ")}`;
  return (
    <>
      <path stroke={color} d={d} fill="none" className="stroke" />
      <path d={d + ` V0 H0 Z`} fill={`url(#gradient-${color})`} className="gradient" />
      <defs>
        <linearGradient id={`gradient-${color}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0} />
          <stop offset="100%" stopColor={color} stopOpacity={0.15} />
        </linearGradient>
      </defs>
    </>
  );
};

const Points = ({ data, width, height, graphPosition, dispatch, range }) => {
  const { point } = graphPosition || {};
  const timeout = useRef(null);
  const dr = Math.abs(range[1] - range[0]);

  const activate = (path, point) => {
    clearTimeout(timeout.current);
    dispatch(setPointData(point));
    dispatch(setGraphPosition({ path, point }));
  };

  return (
    <div className="points">
      {data.map((row, r) =>
        row.map((y, i) => {
          return (
            <div
              className="value-box"
              key={`${r}-${i}`}
              style={{ "--x": `${(i * width) / (row.length - 1)}px`, "--y": `${height - y * (height / dr)}px` }}
              onClick={() => activate(r, i)}
            >
              <span className={`value flex sm:block ${i == point ? "text-black/100 dark:text-white/100" : "text-black/60 dark:text-white/60"}`}>
                <span className="text-base sm:text-sm">{row[i]}</span>
                <span className="text-xs mt-1">°C</span>
              </span>
            </div>
          );
        })
      )}
    </div>
  );
};

const Marker = ({ colors, data, graphPosition, width, height, range }) => {
  const { path, point } = graphPosition || {};
  const value = data[path]?.[point];
  const dr = Math.abs(range[1] - range[0]);

  return (
    <div
      className="marker"
      style={{
        opacity: graphPosition ? 1 : 0,
        "--color": colors[path],
        "--x": `${(point * width) / (data[path]?.length - 1)}px`,
        "--y": `${height - value * (height / dr)}px`,
      }}
    >
      <div className="circle" />
    </div>
  );
};

const Graph = ({ data = [], colors, dispatch, graphPosition, range, labels }) => {
  const graph = useRef(null);
  const { width, height } = useDimensions(graph);

  return (
    <section className="p-10 sm:p-8 mb-5 rounded-md">
      <div className="graph" ref={graph}>
        <Marker colors={colors} data={data} graphPosition={graphPosition} width={width} height={height} range={range} />
        <svg viewBox={`0 ${range[0]} 100 ${range[1]}`} preserveAspectRatio="none">
          {data.map((path, i) => (
            <Line key={i} path={path} color={colors[i]} />
          ))}
        </svg>
        <div className="labels">
          {labels.map((label, index) => (
            <div key={`${label}-${index}`} className="text-black dark:text-white text-sm sm:text-xs">
              {label}
            </div>
          ))}
        </div>
        <Points data={data} width={width} height={height} graphPosition={graphPosition} dispatch={dispatch} range={range} />
      </div>
    </section>
  );
};

export default Graph;
