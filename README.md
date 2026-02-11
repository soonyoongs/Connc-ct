## Quick Start

### Prerequisites
- Node.js 
- npm or yarn

### Installation

1. **Clone the repository**
```bash
   git clone <your-repo-url>
   cd <your-project-name>
```

2. **Set up environment variables**
   
   Create a `.env` file in the root directory:
```bash
   touch .env
```
   
   Add the following variables:
```env
   VITE_SUPABASE_URL=https://uugnucyqrqpyhdoabtjn.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV1Z251Y3lxcnFweWhkb2FidGpuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA3MDM2ODIsImV4cCI6MjA4NjI3OTY4Mn0.fuYgaKKmKmLMLTQESXfPK9WLj9075ykKcDN5haagIjE
```
   

3. **Install dependencies**
```bash
   npm install
```

4. **Run the development server**
```bash
   npm run dev
```

The application should now be running on `http://localhost:5173` (or the port shown in your terminal).
