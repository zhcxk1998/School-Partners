export function isAuthenticated(): boolean {
  const token = localStorage.getItem('token')
  if (token) return true
  return false
}