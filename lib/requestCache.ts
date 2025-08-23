// Request deduplication cache to prevent multiple simultaneous requests
const requestCache = new Map<string, Promise<any>>()

export const getCachedRequest = async <T>(
  key: string,
  requestFn: () => Promise<T>,
  ttl: number = 5000 // 5 seconds TTL
): Promise<T> => {
  // Check if we have a pending request for this key
  if (requestCache.has(key)) {
    return requestCache.get(key)!
  }

  // Create new request
  const request = requestFn()
  
  // Cache the promise
  requestCache.set(key, request)
  
  // Clean up cache after TTL
  setTimeout(() => {
    requestCache.delete(key)
  }, ttl)
  
  try {
    const result = await request
    return result
  } catch (error) {
    // Remove failed request from cache immediately
    requestCache.delete(key)
    throw error
  }
}

export const clearRequestCache = () => {
  requestCache.clear()
}
