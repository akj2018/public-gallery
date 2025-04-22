export default function isVideo(url: string): boolean {
  if (typeof url !== "string") {
    console.log(url, "is not a string");
    return false;
  }

  return url.match(/\.(mp4|webm|ogg)$/i) !== null;
}
