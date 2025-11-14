# spa-app
Vue.js SPA + FastAPI Starter (with future Auth0 integration)
# Vue.js SPA + FastAPI Starter Project

This project is a clean starter template that combines:

- **Vue.js 3 + Vite** (frontend SPA)
- **FastAPI** (Python backend API)
- **CORS-enabled communication between frontend and backend)**

It serves as a base for further enhancements, including **Auth0 authentication**.

---

## 📁 Project Structure



spa-app/
backend/
├── main.py
├── venv/
frontend/
├── package.json
├── vite.config.ts
├── src/
├── App.vue
├── main.ts
├── router/ (may exist but empty)


The frontend and backend run separately during development.

---

## 🚀 Backend Setup (FastAPI)

### 1. Create and activate a virtual environment

```bash
cd backend
python3 -m venv venv
source venv/bin/activate      # macOS / Linux
# venv\Scripts\activate       # Windows

2. Install dependencies
pip install fastapi uvicorn[standard] python-dotenv

3. Run the FastAPI server
uvicorn main:app --reload --port 8000

4. Test the API

Visit:

👉 http://localhost:8000/api/hello

Expected output:

{"message": "Hello from Python FastAPI backend!"}

🌐 Frontend Setup (Vue.js + Vite)
1. Install Node 20 LTS

Vue + Vite require Node 18 or 20 LTS.
Node 22/25 causes devtools errors.

Using Homebrew:

brew install node@20
brew link --overwrite node@20


Or using nvm:

nvm install 20
nvm use 20

2. Install frontend dependencies
cd frontend
npm install

3. Run the Vue dev server
npm run dev


Frontend runs at:

👉 http://localhost:5173

🔗 Connecting Vue to FastAPI

App.vue calls the backend like this:

const res = await fetch("http://localhost:8000/api/hello")

CORS is enabled in FastAPI:
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

🧪 Running the Full Stack

Start backend:

cd backend
source venv/bin/activate
uvicorn main:app --reload --port 8000


Start frontend (new terminal):

cd frontend
npm run dev


Open:

👉 http://localhost:5173

Click the button in the UI to call the backend.

🔐 Next Steps: Auth0 Integration

This project is prepared for future Auth0 SPA authentication.

Next steps will include:

Adding Auth0 SPA SDK to Vue

Login / Logout buttons

Getting access tokens

Sending Authorization: Bearer <token> to FastAPI

Validating JWT tokens in FastAPI

When ready, run:

npm install @auth0/auth0-spa-js


Then follow the Auth0 integration steps.

📌 Notes

The project runs perfectly without Vue Router.

You may add routing later to support pages like /profile or /dashboard.

For now, everything is handled in App.vue.