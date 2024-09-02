import * as d3 from "d3-delaunay";
import type { WorkerData, WorkerResponse } from "@interfaces/types";

self.onmessage = function (e: MessageEvent<WorkerData>) {
  const {
    imageData,
    numPoints,
    drawWidth,
    drawHeight,
    offsetX,
    offsetY,
    pointRadius
  } = e.data;

  const points: [number, number][] = [];

  for (let i = 0; i < numPoints!; i++) {
    let x, y, brightness;
    do {
      x = Math.floor(Math.random() * drawWidth!);
      y = Math.floor(Math.random() * drawHeight!);
      const pixelIndex = (y * drawWidth! + x) * 4;
      const r = imageData!.data[pixelIndex + 0];
      const g = imageData!.data[pixelIndex + 1];
      const b = imageData!.data[pixelIndex + 2];
      brightness = (r + g + b) / 3 / 255;
    } while (brightness > e.data.brightnessThreshold!);
    points.push([x + offsetX!, y + offsetY!]);
  }

  // Création du diagramme de Voronoi
  const delaunay = d3.Delaunay.from(points);
  const voronoi = delaunay.voronoi([0, 0, drawWidth!, drawHeight!]);

  const cells = Array.from(voronoi.cellPolygons());
  const centroids: [number, number][] = new Array(cells.length)
    .fill(null)
    .map(() => [0, 0] as [number, number]);

  const weights = new Array(cells.length).fill(0);

  let delaunayIndex = 0;
  for (let i = 0; i < drawWidth!; i++) {
    for (let j = 0; j < drawHeight!; j++) {
      const pixelIndex = (i + j * drawWidth!) * 4;
      const r = imageData!.data[pixelIndex + 0];
      const g = imageData!.data[pixelIndex + 1];
      const b = imageData!.data[pixelIndex + 2];
      const bright = (r + g + b) / 3;
      const weight = 1 - bright / 255;
      delaunayIndex = delaunay.find(i, j, delaunayIndex);
      if (centroids[delaunayIndex]) {
        centroids[delaunayIndex][0] += i * weight;
        centroids[delaunayIndex][1] += j * weight;
        weights[delaunayIndex] += weight;
      }
    }
  }

  for (let i = 0; i < centroids.length; i++) {
    if (weights[i] > 0) {
      centroids[i][0] /= weights[i];
      centroids[i][1] /= weights[i];
    } else {
      centroids[i] = points[i];
    }
  }

  for (let i = 0; i < points.length; i++) {
    if (centroids[i]) {
      points[i][0] = centroids[i][0];
      points[i][1] = centroids[i][1];
    }
  }

  // Envoyer le résultat au thread principal
  const response: WorkerResponse = {
    points,
    cells,
    centroids
  };
  self.postMessage(response);
};

export {};
