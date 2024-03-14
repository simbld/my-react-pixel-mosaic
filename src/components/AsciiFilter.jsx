import { useEffect, useState } from "react";
import useAsciiArt from "../hooks/useAsciiArt";
import useLoading from "../hooks/useLoading";

function AsciiFilter({ canvasRef, imageSrc }) {
  const { asciiArt, loading, error } = useAsciiArt(canvasRef, imageSrc);

  if (loading) {
    return (
      <div class="pl">
        <div class="pl__dot"></div>
        <div class="pl__dot"></div>
        <div class="pl__dot"></div>
        <div class="pl__dot"></div>
        <div class="pl__dot"></div>
        <div class="pl__dot"></div>
        <div class="pl__dot"></div>
        <div class="pl__dot"></div>
        <div class="pl__dot"></div>
        <div class="pl__dot"></div>
        <div class="pl__dot"></div>
        <div class="pl__dot"></div>
        <div class="pl__text">Loading…</div>
      </div>
    );
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
}

export default AsciiFilter;
