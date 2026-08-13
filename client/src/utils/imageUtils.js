const API_BASE_URL = import.meta.env.VITE_SERVER_URL;

export function getImageUrl(image) {
    if (!image) {
        return null;
    }
    // Already a complete URL
    if (image.startsWith("http")) {
        return image;
    }
    // Relative path
    return `${API_BASE_URL}${image}`;
}