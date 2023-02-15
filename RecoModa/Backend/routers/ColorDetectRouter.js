import Jimp from "jimp";
import express from'express';

const router = express.Router();



router.get("/detect", async (req, res) => {
  try {
    const compareImages = async (fileName1, fileName2) => {
        // const example1 = await Jimp.read("image-text.jpg")
        const example1 = await Jimp.read(fileName1);
        const example2 = await Jimp.read(fileName2);
        const example1Hash = example1.hash();
        const example2Hash = example2.hash();
        const distance = Jimp.distance(example1, example2);
        const diff = Jimp.diff(example1, example2);
        console.log('Distance :',distance)
        console.log('Diff :',diff)
        console.log(Jimp.intToRGBA(example1.getPixelColor(100, 100)))
        
      
        if (example1Hash !== example2Hash || distance > 0.15 || diff > 0.15) {
          return "Images don't match";
        } else {
          return "Images are same";
        }
      };
    compareImages("uploads/Example1.jpg", "uploads/Example2.jpg")
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });

      compareImages("uploads/Example1.jpg", "uploads/Example3.jpg")
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
