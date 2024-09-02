import * as d3 from "d3-delaunay";
import type { WorkerData, WorkerResponse } from "@interfaces/types";

self.onmessage = function (e: MessageEvent<WorkerData>) {
  const {
    imageData,
    numPoints,
    brightnessThreshold,
    pointRadius,
    drawWidth,
    drawHeight,
    offsetX,
    offsetY,
    lerpFactor
  } = e.data;

  const points: [number, number][] = [];

  for (let i = 0; i < numPoints!; i++) {
    let x, y, brightness;
    do {
      x = Math.floor(Math.random() * drawWidth!);
      y = Math.floor(Math.random() * drawHeight!);
      const pixelIndex = (y * drawWidth! + x) * 4;
      const r = imageData!.data[pixelIndex];
      const g = imageData!.data[pixelIndex + 1];
      const b = imageData!.data[pixelIndex + 2];
      brightness = (r + g + b) / 3;
    } while (Math.random() > 1 - (brightness / 255) * brightnessThreshold!);
    points.push([x + offsetX!, y + offsetY!]);
  }

  const delaunay = d3.Delaunay.from(points);
  const voronoi = delaunay.voronoi([
    0,
    0,
    drawWidth! + offsetX!,
    drawHeight! + offsetY!
  ]);

  const cells = Array.from(voronoi.cellPolygons());
  const centroids: [number, number][] = Array.from(
    { length: cells.length },
    () => [0, 0]
  );

  const weights = new Array(cells.length).fill(0);
  const counts = new Array(cells.length).fill(0);

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

      // Vérifiez que centroids[delaunayIndex] existe avant de l'utiliser
      if (centroids[delaunayIndex]) {
        centroids[delaunayIndex][0] += i * weight;
        centroids[delaunayIndex][1] += j * weight;
        weights[delaunayIndex] += weight;
        counts[delaunayIndex]++;
      } else {
        // Si centroids[delaunayIndex] n'existe pas, initialisez-le
        centroids[delaunayIndex] = [i * weight, j * weight];
        weights[delaunayIndex] = weight;
        counts[delaunayIndex] = 1;
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
    points[i][0] =
      points[i][0] * (1 - lerpFactor!) + centroids[i][0] * lerpFactor!;
    points[i][1] =
      points[i][1] * (1 - lerpFactor!) + centroids[i][1] * lerpFactor!;
  }

  const response: WorkerResponse = { points, cells, centroids };
  self.postMessage(response);
};

export {};
