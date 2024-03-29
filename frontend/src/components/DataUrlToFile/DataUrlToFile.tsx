export const dataURLtoFile = (dataurl: string, filename: string): File => {
    const arr = dataurl.split(",");
    const mimeMatches = arr[0].match(/:(.*?);/);
    if (!mimeMatches) {
        throw new Error("Invalid MIME type in data URL");
    }
    const mime = mimeMatches[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
};