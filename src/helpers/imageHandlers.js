// "use client";
// import Image from "next/image";
// import Resizer from "react-image-file-resizer";

// /**
//  * image-resizing function
//  * @param {string} imgUrl - The source image
//  */
// export const resizeImage = (imageURL) =>
//   new Promise((resolve) => {
//     const inputImage = new Image();
//     inputImage.src = imageURL;
//     Resizer.imageFileResizer(
//       file,
//       300,
//       // auto,
//       "JPEG",
//       100,
//       0,
//       (uri) => {
//         resolve(uri);
//       },
//       "base64"
//     );
//   });
