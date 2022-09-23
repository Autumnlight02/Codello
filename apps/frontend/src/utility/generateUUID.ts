export default function generateUUID(customPreSyntax: string): string {
  let uuidDone = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function (c) {
      var r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    }
  );
  if (customPreSyntax) {
    return customPreSyntax + "-" + uuidDone;
  }
  return uuidDone;
}
