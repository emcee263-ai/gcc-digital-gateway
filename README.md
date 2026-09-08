# GCC Digital Gateway

Full Next.js prototype based on the uploaded GCC Digital Service Platform presentation.

## Run in Acode
1. Extract this folder or upload its contents to your GitHub repository.
2. Open the repository/project in Acode.
3. Run `npm install`.
4. Run `npm run dev`.
5. Push changes to GitHub.
6. Import the repository into Vercel.

## Demo logins
- resident@gcc.demo
- clerk@gcc.demo
- finance@gcc.demo
- admin@gcc.demo

Any password works.

## Main features
Resident: dashboard, service directory, service requests, reference numbers, request tracking, billing, statements, Council notices, city information, profile.
Council: overview dashboard, request assignment/status workflow, resident records, billing administration, notice publishing, analytics, role-based views.
Storage: JSON files through Next.js API routes for mockup purposes.

## Production note
JSON filesystem writes are demo storage only and are not a durable production database on Vercel. The API layer is isolated so it can later be replaced with Supabase/PostgreSQL or a Council backend.
