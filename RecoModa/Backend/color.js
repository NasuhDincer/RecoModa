import fs from "fs";
import { createCanvas, Image } from "canvas";

async function getDominantHex(imagePath) {
  const imageData = fs.readFileSync(imagePath);
  const img = new Image();
  console.log(imageData)
  img.src = imageData;

  const canvas = createCanvas(img.width, img.height);
  const ctx = canvas.getContext("2d");

  ctx.drawImage(img, 0, 0);

  const pixelData = ctx.getImageData(0, 0, img.width, img.height).data;
  const hexCounts = {};

  for (let i = 0; i < pixelData.length; i += 4) {
    const r = pixelData[i];
    const g = pixelData[i + 1];
    const b = pixelData[i + 2];

    const hex = `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
    hexCounts[hex] = hexCounts[hex] ? hexCounts[hex] + 1 : 1;
  }

  const sortedHexCounts = Object.entries(hexCounts).sort((a, b) => b[1] - a[1]);
  const topHexCounts = sortedHexCounts.slice(0, 15);
  console.log(topHexCounts);
}

function hexToRgb(hex) {
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return [r, g, b];
}

function rgbDistance(rgb1, rgb2) {
  const rDiff = rgb1[0] - rgb2[0];
  const gDiff = rgb1[1] - rgb2[1];
  const bDiff = rgb1[2] - rgb2[2];
  return Math.sqrt(rDiff * rDiff + gDiff * gDiff + bDiff * bDiff);
}

const hex1 = "be0910"; // Red
const hex2 = "c90e15"; // Green

const rgb1 = hexToRgb(hex1);
const rgb2 = hexToRgb(hex2);

const distance = rgbDistance(rgb1, rgb2);

console.log(distance); // Output: 441.6729559300637
getDominantHex("Example1.jpg")