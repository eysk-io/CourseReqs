export default function loadImage(url) {
    const image = new window.Image();
    return new Promise((resolve) => {
        image.onload = () => resolve(image)
        image.src = url
    });
}
