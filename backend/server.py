import contextlib

import databases
import sqlalchemy

from starlette.applications import Starlette
from starlette.config import Config
from starlette.responses import JSONResponse
from starlette.middleware.cors import CORSMiddleware
from starlette.routing import Route

# Configuration from environment variables or '.env' file.
config = Config(".env")
DATABASE_URL = config("DATABASE_URL")


# Database table definitions.
metadata = sqlalchemy.MetaData()

notes = sqlalchemy.Table(
    "documents",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.String, primary_key=True),
    sqlalchemy.Column("type", sqlalchemy.String),
    sqlalchemy.Column("title", sqlalchemy.String),
    sqlalchemy.Column("image", sqlalchemy.String),
    sqlalchemy.Column("position", sqlalchemy.Integer),
)

database = databases.Database(DATABASE_URL)


@contextlib.asynccontextmanager
async def lifespan(app):
    await database.connect()
    yield
    await database.disconnect()


async def get_all_docs(request):
    if request.method == "GET":
        data = [
            {
                "id": "1",
                "type": "bankdraft",
                "title": "Bank Draft",
                "position": 0,
                "image": "/cat-1.jpeg",
            },
            {
                "id": "2",
                "type": "bill-of-lading",
                "title": "Bill of Lading",
                "position": 1,
                "image": "/cat-2.avif",
            },
            {
                "id": "3",
                "type": "invoice",
                "title": "Invoice",
                "position": 2,
                "image": "/cat-3.avif",
            },
            {
                "id": "4",
                "type": "bank-draft-2",
                "title": "Bank Draft 2",
                "position": 3,
                "image": "/cat-4.avif",
            },
            {
                "id": "5",
                "type": "bill-of-lading-2",
                "title": "Bill of Lading 2",
                "position": 4,
                "image": "/cat-5.avif",
            },
        ]
        return JSONResponse({"status": 200, "data": data})


routes = [
    Route("/get-all-docs", endpoint=get_all_docs, methods=["GET"]),
]

app = Starlette(
    routes=routes,
    lifespan=lifespan,
)
app.add_middleware(CORSMiddleware, allow_origins=["*"])
