import { useEffect, useState } from "react";

const useFontLoader = (fontName: string, fontUrl: string): boolean => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    const fontFace = new FontFace(fontName, `url(${fontUrl})`);
    document.fonts.add(fontFace);

    fontFace.load().then(() => {
      setIsLoaded(true);
    });
  }, [fontName, fontUrl]);

  return isLoaded;
};

export default useFontLoader;
