// // api/shots.js
// export default async function handler(req, res) {
// //   const SHEET_URL = process.env.GOOGLE_SHEET_URL; 
// const SHOTS_API_URL = import.meta.env.VITE_SHOTS_API_URL;

  
//   // Example: published Apps Script endpoint that already works with GET & POST

//   try {
//     if (req.method === 'GET') {
//       // ✅ Read totalShots from Google Sheet
//       const response = await fetch(SHEET_URL);
//       if (!response.ok) throw new Error(`HTTP ${response.status}`);
//       const data = await response.json();
//       return res.status(200).json({ totalShots: data.totalShots ?? 0 });
//     }

//     if (req.method === 'POST') {
//       // ✅ Update totalShots in Google Sheet
//       const { totalShots } = req.body;
//       const response = await fetch(SHEET_URL, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ totalShots }),
//       });
//       if (!response.ok) throw new Error(`HTTP ${response.status}`);
//       const result = await response.json();
//       return res.status(200).json(result);
//     }

//     return res.status(405).json({ error: 'Method not allowed' });
//   } catch (err) {
//     console.error('Error in /api/shots:', err);
//     return res.status(500).json({ error: err.message });
//   }
// }


// api/shots.js
export default async function handler(req, res) {
  const SHEET_URL = process.env.GOOGLE_SHEET_URL;
  if (!SHEET_URL) {
    return res.status(500).json({ error: 'Missing SHEET_URL env variable' });
  }

  try {
    if (req.method === 'GET') {
      const response = await fetch(SHEET_URL);
      const data = await response.json();
      return res.status(200).json({ totalShots: data.totalShots || 0 });
    }

    if (req.method === 'POST') {
      const { totalShots } = req.body;
      if (typeof totalShots !== 'number') {
        return res.status(400).json({ error: 'totalShots must be a number' });
      }

      // Send updated totalShots to your Google Apps Script
      const response = await fetch(SHEET_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ totalShots }),
      });

      const result = await response.json();
      return res.status(200).json(result);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('Error in /api/shots:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}



