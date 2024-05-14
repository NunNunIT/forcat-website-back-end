// Fowler-Noll-Vo (FNV) hash function
export default function hashString(str) {
  let hash = 2166136261; // FNV offset basis
  const prime = 16777619; // FNV prime

  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash *= prime;
  }

  return hash >>> 0; // Convert to unsigned 32-bit integer
}


