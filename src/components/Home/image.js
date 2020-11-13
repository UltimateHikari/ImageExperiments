import React from "react";
import { gString } from './images.js';


const imgCache = {
  __cache: {},
  read(src) {
    if (!src) {
      return;
    }

    if (!this.__cache[src]) {
      this.__cache[src] = new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          this.__cache[src] = true;
          resolve(this.__cache[src]);
        };
        img.src = src;
        setTimeout(() => resolve({}), 7000);
      }).then((img) => {
        this.__cache[src] = true;
      });
    }

    if (this.__cache[src] instanceof Promise) {
      throw this.__cache[src];
    }
    return this.__cache[src];
  },
  clearImg: (src) => {
    delete this.__cache[src];
  }
};

function Image(props){
  let src = gString + props.imageObj.src;
  return(
      <img src={src}
        onClick={() => props.onClick()}
        alt=""
      />
      );
}

// const Image = ({ src, ...rest }) => {
//   imgCache.read(src);

//   return <img alt="" src={src} {...rest} />;
// };

export default Image;