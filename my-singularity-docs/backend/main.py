from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import httpx # Assuming httpx is installed

app = FastAPI()

# Configure CORS
origins = [
    "http://localhost",
    "http://localhost:5173", # Frontend development server
    # Add other origins as needed for deployment
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def read_root():
    return {"message": "Welcome to the Singularity Docs API"}

@app.get("/docs/{file_path:path}")
async def get_github_doc(file_path: str):
    github_repo_url = "https://raw.githubusercontent.com/deadsg235/SINGULARITY-DOCS/main/"
    full_url = f"{github_repo_url}{file_path}"

    async with httpx.AsyncClient() as client:
        response = await client.get(full_url)

        if response.status_code == 200:
            return {"content": response.text}
        elif response.status_code == 404:
            raise HTTPException(status_code=404, detail="Document not found")
        else:
            raise HTTPException(status_code=response.status_code, detail="Error fetching document from GitHub")