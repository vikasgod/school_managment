# School ERP — Next.js starter

A responsive School Management ERP dashboard using Next.js App Router, TypeScript, Tailwind CSS, Recharts, Lucide icons, MongoDB, and Mongoose.

## Requirements

- Node.js 20.9+
- MongoDB Atlas or a local MongoDB server

## Install and run

```bash
npm install
```

Copy `.env.example` to `.env.local`, then set your MongoDB connection string:

```env
MONGODB_URI=mongodb+srv://USERNAME:PASSWORD@YOUR_CLUSTER.mongodb.net/school_erp?retryWrites=true&w=majority
```

In MongoDB Atlas, add your current IP to Network Access and create a database user. Do not commit `.env.local` to source control.

```bash
npm run dev
```

Open http://localhost:3000.

## API endpoints

### `GET /api/students`
Returns up to 100 students, newest first.

### `POST /api/students`
JSON body:

```json
{
  "admissionNo": "ADM-2026-001",
  "name": "Rahul Sharma",
  "className": "Class 4",
  "section": "A",
  "guardianName": "Amit Sharma",
  "phone": "9876543210"
}
```

### `GET /api/dashboard`
Returns active student/staff counts, class count, current-month paid fee total, and recent students.

## Important notes

- Dashboard cards and charts currently use sample display data so the design renders before the database is populated.
- The quick Add Student modal is a front-end demo. Use `POST /api/students` to persist a student in MongoDB.
- Before production use, add authentication, role-based access control, server-side authorization, input validation, audit logs, and school-specific data isolation.
- The sample school name, figures, events, and activity feed are placeholders.
