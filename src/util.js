// Extract guid values from Elasticsearch ids
// e.g. cmoa:things/f587f4e9-67ab-4d9a-a1ce-a922ad25f8e1 => f587f4e9-67ab-4d9a-a1ce-a922ad25f8e1
export function extractId(str) {
  return str.split('/')[1] || '';
}
