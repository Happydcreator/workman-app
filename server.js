// ============================================================
//  WORKMAN BACKEND — server.js
//  Nigeria's Artisan Marketplace API
//  Stack: Node.js + Express + In-Memory Data (No Database Yet)
// ============================================================

// 1. IMPORT PACKAGES
const express = require('express');  // Web framework
const cors    = require('cors');     // Allows frontend to talk to backend

// 2. CREATE THE APP
const app  = express();
const PORT = 5000;

// 3. MIDDLEWARE (runs on every request before your routes)
app.use(cors());           // Allow all origins (frontend can call this API freely)
app.use(express.json());   // Parse incoming JSON request bodies automatically


// ============================================================
//  IN-MEMORY DATA STORAGE
//  These arrays act as our "database" for now.
//  All data resets when you restart the server — that's fine for now!
// ============================================================

// --- ARTISANS ---
let artisans = [
  {
    id: 1,
    fullName: 'Emeka Okafor',
    businessName: "Emeka's Plumbing Pros",
    phone: '08012345678',
    email: 'emeka@plumbpros.ng',
    category: 'Plumbers',
    state: 'Lagos',
    city: 'Ikeja',
    experience: '6–10 years',
    about: 'Specialist in residential and commercial plumbing. We handle burst pipes, bathroom installations, borehole connections, and water tank setups. Fast response within Lagos.',
    imageUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
    verified: true,
    rating: 4.8,
    reviews: 47,
    completedJobs: 43,
  },
  {
    id: 2,
    fullName: 'Ngozi Adeyemi',
    businessName: 'NgoziGlam Hair Studio',
    phone: '08098765432',
    email: 'ngozi@glamhair.ng',
    category: 'Hairdressers',
    state: 'Lagos',
    city: 'Victoria Island',
    experience: '3–5 years',
    about: 'Award-winning hair stylist specialising in natural hair care, braids, weaves, and loc styling. Mobile service available across Lagos Island.',
    imageUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
    verified: true,
    rating: 4.9,
    reviews: 83,
    completedJobs: 79,
  },
  {
    id: 3,
    fullName: 'Musa Abdullahi',
    businessName: 'Musa Weld & Fabrication',
    phone: '08155566778',
    email: 'musa@weldng.ng',
    category: 'Welders',
    state: 'Kano',
    city: 'Sabon Gari',
    experience: '10–15 years',
    about: 'Expert welder and metal fabricator. Gates, railings, industrial tanks, trailers, and custom metalwork. We deliver across the North.',
    imageUrl: 'https://randomuser.me/api/portraits/men/55.jpg',
    verified: true,
    rating: 4.6,
    reviews: 32,
    completedJobs: 30,
  },
  {
    id: 4,
    fullName: 'Tunde Fashola',
    businessName: 'Fashola Electric Works',
    phone: '08067890123',
    email: 'tunde@fashelectric.ng',
    category: 'Electricians',
    state: 'Oyo',
    city: 'Ibadan',
    experience: '15+ years',
    about: 'COREN-registered electrician. We handle wiring, solar installations, inverter systems, and industrial electrical work. Serving Oyo and Osun states.',
    imageUrl: 'https://randomuser.me/api/portraits/men/77.jpg',
    verified: true,
    rating: 4.7,
    reviews: 61,
    completedJobs: 58,
  },
  {
    id: 5,
    fullName: 'Jide Ogundimu',
    businessName: 'Jide Furniture Makers',
    phone: '08078901234',
    email: 'jide@jidefurniture.ng',
    category: 'Furniture Makers',
    state: 'Ogun',
    city: 'Abeokuta',
    experience: '15+ years',
    about: 'Bespoke furniture crafted from quality hardwood. Sofas, dining sets, bedroom furniture, office workstations, and outdoor pieces.',
    imageUrl: 'https://randomuser.me/api/portraits/men/64.jpg',
    verified: true,
    rating: 4.9,
    reviews: 72,
    completedJobs: 68,
  },
  {
    id: 6,
    fullName: 'Amaka Nwosu',
    businessName: 'AmakaStitch Tailoring',
    phone: '08145678901',
    email: 'amaka@amacastitch.ng',
    category: 'Tailors',
    state: 'Enugu',
    city: 'Enugu',
    experience: '3–5 years',
    about: 'Custom fashion tailoring for men and women. Aso-oke attire, agbada, corporate wear, ankara styles, and uniforms. Quick turnaround, excellent finishing.',
    imageUrl: 'https://randomuser.me/api/portraits/women/29.jpg',
    verified: true,
    rating: 4.8,
    reviews: 55,
    completedJobs: 50,
  },
];

// --- SERVICE REQUESTS (BOOKINGS) ---
let serviceRequests = [
  {
    id: 1,
    customerName: 'Aisha Yusuf',
    phone: '08011223344',
    location: 'Wuse 2, Abuja',
    service: 'Electricians',
    date: '2025-07-10',
    description: 'Need inverter installation and rewiring of living room sockets.',
    status: 'Completed',
  },
  {
    id: 2,
    customerName: 'Gbenga Adewale',
    phone: '08033445566',
    location: 'Surulere, Lagos',
    service: 'Plumbers',
    date: '2025-07-15',
    description: 'Leaking pipes in bathroom and kitchen — urgent fix needed.',
    status: 'Accepted',
  },
  {
    id: 3,
    customerName: 'Chidi Okonkwo',
    phone: '08055667788',
    location: 'GRA, Port Harcourt',
    service: 'Mechanics',
    date: '2025-07-18',
    description: 'Toyota Camry 2015 engine noise and brake pad replacement.',
    status: 'Pending',
  },
];

// --- REVIEWS ---
let reviews = [
  {
    id: 1,
    artisanId: 1,
    customerName: 'Aisha Bello',
    rating: 5,
    review: 'Emeka fixed our burst pipe within 2 hours. Very professional and clean work!',
    date: '2025-06-15',
  },
  {
    id: 2,
    artisanId: 2,
    customerName: 'Temi Ogunleye',
    rating: 5,
    review: 'Ngozi is an absolute genius with hair! My bridal look was exactly what I wanted.',
    date: '2025-06-22',
  },
  {
    id: 3,
    artisanId: 5,
    customerName: 'Mrs Okonkwo',
    rating: 5,
    review: 'Jide built our complete dining set and it looks absolutely stunning.',
    date: '2025-07-05',
  },
];

// ID counters — we increment these to give each new item a unique ID
let nextArtisanId  = artisans.length + 1;
let nextRequestId  = serviceRequests.length + 1;
let nextReviewId   = reviews.length + 1;


// ============================================================
//  ROUTES — ARTISANS
// ============================================================

// GET /artisans — Return all artisans
// Example: fetch('http://localhost:5000/artisans')
app.get('/artisans', (req, res) => {
  res.json(artisans);
});

// GET /artisans/:id — Return one artisan by their ID
// Example: fetch('http://localhost:5000/artisans/1')
app.get('/artisans/:id', (req, res) => {
  const id      = parseInt(req.params.id);   // Get the ID from the URL
  const artisan = artisans.find(a => a.id === id);

  if (!artisan) {
    // If not found, send a 404 error
    return res.status(404).json({ error: 'Artisan not found' });
  }

  res.json(artisan);
});

// POST /artisans — Add a new artisan (from the Register form)
// Example: fetch('http://localhost:5000/artisans', { method:'POST', body: JSON.stringify({...}) })
app.post('/artisans', (req, res) => {
  const { fullName, businessName, phone, email, category, state, city, experience, about, imageUrl } = req.body;

  // Basic validation — make sure required fields are present
  if (!fullName || !businessName || !phone || !category || !state || !city || !experience || !about) {
    return res.status(400).json({ error: 'Please provide all required fields.' });
  }

  // Build the new artisan object
  const newArtisan = {
    id:           nextArtisanId++,   // Give it the next available ID
    fullName,
    businessName,
    phone,
    email:        email || '',
    category,
    state,
    city,
    experience,
    about,
    imageUrl:     imageUrl || '',
    verified:     false,             // New artisans start unverified
    rating:       0,
    reviews:      0,
    completedJobs: 0,
  };

  artisans.push(newArtisan);         // Add to our in-memory array
  res.status(201).json(newArtisan);  // 201 = "Created"
});


// ============================================================
//  ROUTES — SERVICE REQUESTS (BOOKINGS)
// ============================================================

// GET /requests — Return all service requests
app.get('/requests', (req, res) => {
  res.json(serviceRequests);
});

// POST /requests — Submit a new service request
app.post('/requests', (req, res) => {
  const { customerName, phone, location, service, date, description } = req.body;

  if (!customerName || !phone || !location || !service || !date) {
    return res.status(400).json({ error: 'Please provide all required fields.' });
  }

  const newRequest = {
    id: nextRequestId++,
    customerName,
    phone,
    location,
    service,
    date,
    description: description || '',
    status: 'Pending',              // All new requests start as Pending
  };

  serviceRequests.push(newRequest);
  res.status(201).json(newRequest);
});

// PUT /requests/:id — Update the status of a request (Pending → Accepted → Completed)
app.put('/requests/:id', (req, res) => {
  const id      = parseInt(req.params.id);
  const request = serviceRequests.find(r => r.id === id);

  if (!request) {
    return res.status(404).json({ error: 'Request not found' });
  }

  const { status } = req.body;
  const validStatuses = ['Pending', 'Accepted', 'Completed'];

  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: 'Status must be Pending, Accepted, or Completed.' });
  }

  request.status = status;          // Update the status in place
  res.json(request);                // Return the updated request
});


// ============================================================
//  ROUTES — REVIEWS
// ============================================================

// GET /reviews — Return all reviews
app.get('/reviews', (req, res) => {
  res.json(reviews);
});

// GET /reviews?artisanId=1 — Return reviews for a specific artisan
// (The same GET /reviews route handles this with a query param)
app.get('/reviews/artisan/:artisanId', (req, res) => {
  const artisanId = parseInt(req.params.artisanId);
  const filtered  = reviews.filter(r => r.artisanId === artisanId);
  res.json(filtered);
});

// POST /reviews — Submit a new review
app.post('/reviews', (req, res) => {
  const { artisanId, customerName, rating, review } = req.body;

  if (!artisanId || !customerName || !rating) {
    return res.status(400).json({ error: 'artisanId, customerName, and rating are required.' });
  }

  if (rating < 1 || rating > 5) {
    return res.status(400).json({ error: 'Rating must be between 1 and 5.' });
  }

  // Check the artisan actually exists
  const artisan = artisans.find(a => a.id === parseInt(artisanId));
  if (!artisan) {
    return res.status(404).json({ error: 'Artisan not found.' });
  }

  const newReview = {
    id:           nextReviewId++,
    artisanId:    parseInt(artisanId),
    customerName,
    rating:       parseInt(rating),
    review:       review || '',
    date:         new Date().toISOString().split('T')[0], // Today's date: "2025-07-01"
  };

  reviews.push(newReview);

  // Also update the artisan's review count
  artisan.reviews += 1;

  // Recalculate the artisan's average rating from all their reviews
  const artisanReviews = reviews.filter(r => r.artisanId === artisan.id);
  const avgRating      = artisanReviews.reduce((sum, r) => sum + r.rating, 0) / artisanReviews.length;
  artisan.rating       = Math.round(avgRating * 10) / 10; // Round to 1 decimal place

  res.status(201).json(newReview);
});


// ============================================================
//  ROOT ROUTE — Just a health check
// ============================================================
app.get('/', (req, res) => {
  res.json({
    message: '🔧 Workman API is running!',
    version: '1.0.0',
    endpoints: {
      artisans:        'GET /artisans | POST /artisans | GET /artisans/:id',
      serviceRequests: 'GET /requests | POST /requests | PUT /requests/:id',
      reviews:         'GET /reviews  | POST /reviews  | GET /reviews/artisan/:id',
    },
  });
});


// ============================================================
//  START THE SERVER
// ============================================================
app.listen(PORT, () => {
  console.log(`✅ Workman server running at http://localhost:${PORT}`);
  console.log(`📋 Artisans loaded:         ${artisans.length}`);
  console.log(`📋 Service requests loaded: ${serviceRequests.length}`);
  console.log(`📋 Reviews loaded:          ${reviews.length}`);
});
