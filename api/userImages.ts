// Placeholder for user image API integration

export async function uploadUserImage(localUri: string, index: number): Promise<string> {
  // TODO: Implement API call to upload image and return the new image URL
  // Example:
  // const formData = new FormData();
  // formData.append('image', { uri: localUri, name: `image${index}.jpg`, type: 'image/jpeg' });
  // const response = await fetch('https://your-backend.com/api/user/images', { method: 'POST', body: formData });
  // const data = await response.json();
  // return data.imageUrl;
  return localUri; // For now, just return the local URI
}
