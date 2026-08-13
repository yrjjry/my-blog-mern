
export function getExcerpt(html, maxLength = 150) {
    if (!html) {
        return "";
    }
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    const text = tempDiv.textContent || tempDiv.innerText || "";
    const cleanText = text.replace(/\s+/g, " ").trim();

    if (cleanText.length <= maxLength) {
        return cleanText;
    }

    return cleanText.substring(0, maxLength) + "...";
}