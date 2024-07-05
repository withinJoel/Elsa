async function fileExists(filePath) {
    try {
        const response = await fetch(filePath, { method: 'HEAD' });
        return response.ok;
    } catch (error) {
        return false; // Handle fetch error if needed
    }
}