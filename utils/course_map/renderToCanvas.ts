import { renderToStaticMarkup } from 'react-dom/server';
import createCanvas from './createCanvas';
import loadImage from './loadImage';

export default async function renderToCanvas(content, { width, height }) {
  const canvas = createCanvas(width, height, true);
  const ctx = canvas.getContext('2d');
  const url = `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
      <style type="text/css">
        html {
          box-sizing: border-box;
        }

        *,
        *:before,
        *:after {
          box-sizing: inherit;
        }

        body {
          font-family: sans-serif;
          margin: 0;
          padding: 0;
        }

        foreignObject {
          box-sizing: border-box;
          font-family: sans-serif;
        }

        .map-node {
          padding: 10px;
          width: 250px;
          height: 125px;
          display: flex;
          justify-content: center;
          align-items: center;
          border-width: 4px;
          border-style: solid;
          border-radius: 12px;
          text-align: center;
          font-weight: bold;
          font-size: 24px;
        }

        .map-node-level0 {
          padding: 10px;
          width: 200px;
          height: 200px;
          display: flex;
          justify-content: center;
          align-items: center;
          border-width: 8px;
          border-style: solid;
          border-radius: 20px;
          text-align: center;
          font-weight: bold;
          font-size: 52px;
        }

        .map-node-meta {
          padding: 10px;
          width: 100px;
          height: 100px;
          display: flex;
          justify-content: center;
          align-items: center;
          border-width: 8px;
          border-style: solid;
          border-radius: 50px;
          text-align: center;
          font-weight: bold;
          font-size: 20px;
        }
        
        .map-node-small {
          padding: 10px;
          width: 150px;
          height: 100px;
          display: flex;
          justify-content: center;
          align-items: center;
          border-width: 4px;
          border-style: solid;
          border-radius: 12px;
          text-align: center;
          font-weight: bold;
          font-size: 30px;
        }

        .map-node-medium {
          padding: 10px;
          width: 250px;
          height: 125px;
          display: flex;
          justify-content: center;
          align-items: center;
          border-width: 4px;
          border-style: solid;
          border-radius: 12px;
          text-align: center;
          font-weight: bold;
          font-size: 30px;
        }

        .magenta {
          color: rgb(241, 3, 200);
          border-color: rgb(241, 3, 200);
          background-color: rgb(251, 175, 238);
        }

        .violet {
          color: rgb(134, 3, 241);
          border-color: rgb(134, 3, 241);
          background-color: rgb(215, 166, 254);
        }

        .blue {
          color: rgb(0, 100, 210);
          border-color: rgb(0, 100, 210);
          background-color: rgb(176, 213, 254);
        }

        .green {
          color: rgb(21, 138, 52);
          border-color: rgb(21, 138, 52);
          background-color: rgb(178, 219, 192);
        }

        .grey {
          color: rgb(95, 82, 122);
          border-color: rgb(95, 82, 122);
          background-color: rgb(240, 245, 250);
        }
      </style>
      <foreignObject width="${width}" height="${height}">
      ${renderToStaticMarkup(content)}
      </foreignObject>
      </svg>`;
  const image = await loadImage(url);
  ctx.drawImage(image, 0, 0);
  return canvas;
}
