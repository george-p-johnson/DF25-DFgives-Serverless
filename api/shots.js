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



export default async function handler(req, res) {
  const SHEET_URL = process.env.GOOGLE_SHEET_URL;

  try {
    const fetchOptions = {
      method: req.method,
      headers: { 'Content-Type': 'application/json' },
      body: req.method === 'POST' ? JSON.stringify(req.body) : undefined
    };

    const response = await fetch(SHEET_URL, fetchOptions);
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch from Google Sheets' });
  }
}
