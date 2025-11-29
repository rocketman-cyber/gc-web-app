export async function handler() {
  const lastHugDate = "2025-08-30T18:30:00";
  return {
    statusCode: 200,
    body: JSON.stringify({ lastHugDate }),
  };
}
