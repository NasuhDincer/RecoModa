import Jimp from "jimp";
import express from'express';

const router = express.Router();

function mode(array)
{
    if(array.length == 0)
        return null;
    var modeMap = {};
    var maxEl = array[0], maxCount = 1;
    for(var i = 0; i < array.length; i++)
    {
        var el = array[i];
        if(modeMap[el] == null)
            modeMap[el] = 1;
        else
            modeMap[el]++;  
        if(modeMap[el] > maxCount)
        {
            maxEl = el;
            maxCount = modeMap[el];
        }
    }
    return maxEl;
}


router.get("/detect", async (req, res) => {
  try {
    const compareImages = async (fileName1, fileName2) => {
        // const example1 = await Jimp.read("image-text.jpg")
        const example1 = await Jimp.read(fileName1);
        const example2 = await Jimp.read(fileName2);
        const example1Hash = example1.hash();
        const example2Hash = example2.hash();
      //  const distance = Jimp.distance(example1, example2);
      //  const diff = Jimp.diff(example1, example2);
      //  console.log('Distance :',distance)
      //  console.log('Diff :',diff)
        
        var w = example1.bitmap.width; //  width of the image
        var h = example1.bitmap.height; // height of the image
        console.log(Jimp.intToRGBA(example1.getPixelColor(w/2, h/2)))
        console.log(mode([3,3,3,5,5,5,5,4,4,4,4,4,4,4,4]))
        
      
    /*    if (example1Hash !== example2Hash || distance > 0.15 || diff > 0.15) {
          return "Images don't match";
        } else {
          return "Images are same";
        }*/
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
