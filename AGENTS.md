# Backend PRD - NutriAI RAG Service

## Overview

Backend bertanggung jawab untuk:

- Mengelola dokumen Permenkes sebagai knowledge base.
- Melakukan Retrieval-Augmented Generation (RAG).
- Menyediakan API untuk frontend Next.js.
- Menghubungkan ChromaDB dengan LLM (Qwen/Llama).
- Mengelola chat session dan histori percakapan.
- Menyediakan endpoint evaluasi model untuk penelitian.

Backend menggunakan FastAPI sebagai API server utama.

---

# Architecture

Frontend (Next.js)
↓
FastAPI
↓
RAG Service
├── Retriever
├── Prompt Builder
├── LLM Service
└── Response Formatter
↓
ChromaDB
↓
Permenkes Knowledge Base

---

# Folder Structure

backend/
│
├── app/
│ ├── api/
│ │ ├── chat.py
│ │ ├── health.py
│ │ ├── bmi.py
│ │ └── evaluation.py
│ │
│ ├── services/
│ │ ├── rag_service.py
│ │ ├── retriever_service.py
│ │ ├── llm_service.py
│ │ ├── embedding_service.py
│ │ └── ingestion_service.py
│ │
│ ├── models/
│ │ ├── request.py
│ │ └── response.py
│ │
│ ├── core/
│ │ ├── config.py
│ │ ├── prompt.py
│ │ └── logger.py
│ │
│ └── main.py
│
├── chroma_db/
│
├── documents/
│ └── permenkes.pdf
│
├── tests/
│
├── requirements.txt
│
└── .env

---

# Main Components

## 1. Document Ingestion Service

Purpose:

Mengubah PDF menjadi knowledge base yang dapat dicari oleh AI.

Flow:

PDF
↓
Load PDF
↓
Split Document
↓
Generate Embedding
↓
Store Vector
↓
ChromaDB

Responsibilities:

- Load PDF
- Chunking
- Embedding
- Save Vector

Run only once.

Example:

python ingest.py

Output:

chroma_db/

---

# Chunking Strategy

Configuration:

chunk_size = 1000

chunk_overlap = 200

Reason:

- Cocok untuk dokumen regulasi.
- Menjaga konteks antar halaman.
- Mengurangi kehilangan informasi.

---

# Embedding Service

Purpose:

Mengubah text menjadi vector embedding.

Initial Model:

sentence-transformers/all-MiniLM-L6-v2

Future Models:

- BGE Large
- E5 Large
- Instructor XL

Responsibilities:

- Generate embeddings
- Similarity search preparation

---

# ChromaDB

Purpose:

Menyimpan embedding Permenkes.

Collection:

permenkes_gizi

Stored Metadata:

{
"page": 27,
"source": "Permenkes No 41 Tahun 2014"
}

Benefits:

- Fast retrieval
- Lightweight
- Easy local deployment

---

# Retriever Service

Purpose:

Mengambil konteks yang relevan dari knowledge base.

Configuration:

search_type = similarity

k = 5

Future:

k dapat diubah menjadi:

- 3
- 5
- 7
- 10

untuk eksperimen penelitian.

Flow:

User Question
↓
Vector Search
↓
Top K Documents
↓
Context

---

# Prompt Builder

Purpose:

Menyusun prompt sebelum dikirim ke LLM.

Template:

System:

Anda adalah asisten ahli gizi.

Jawab hanya berdasarkan konteks yang diberikan.

Jika informasi tidak tersedia,
katakan bahwa informasi tidak ditemukan
dalam dokumen Permenkes.

Context:
{context}

Question:
{question}

Answer:

Rules:

- Bahasa Indonesia
- Naratif
- Tidak membuat informasi baru
- Tidak menggunakan pengetahuan luar

---

# LLM Service

Purpose:

Mengelola model AI.

Supported Models:

- Qwen2.5 7B
- Qwen2.5 14B
- Llama 3

Model Selection:

ENV:

MODEL_NAME=qwen

atau

MODEL_NAME=llama

Responsibilities:

- Load model
- Generate answer
- Switch model

---

# RAG Service

Purpose:

Orchestrator utama sistem.

Flow:

Question
↓
Retriever
↓
Context
↓
Prompt Builder
↓
LLM
↓
Answer

Responsibilities:

- Execute RAG pipeline
- Build response
- Return sources

Pseudo Flow:

answer = rag_service.ask(question)

---

# API Endpoints

## Health Check

GET /health

Response:

{
"status": "ok"
}

Purpose:

Monitoring service.

---

## Chat Endpoint

POST /chat

Request:

{
"question": "Apa itu gizi seimbang?"
}

Process:

1. Receive question
2. Retrieve context
3. Generate answer
4. Return result

Response:

{
"answer": "...",
"sources": [
{
"page": 27
}
]
}

---

## BMI Endpoint

POST /bmi

Request:

{
"weight": 63,
"height": 160
}

Response:

{
"bmi": 24.6,
"category": "Normal"
}

Purpose:

Support feature.

No AI needed.

---

## Evaluation Endpoint

POST /evaluate

Request:

{
"question": "...",
"model": "qwen14b"
}

Response:

{
"answer": "...",
"latency": 2.4
}

Purpose:

Research comparison.

---

# Error Handling

Invalid Input:

400

Question Empty:

422

Model Failure:

500

Vector DB Failure:

500

Response Example:

{
"success": false,
"message": "Unable to process request"
}

---

# Environment Variables

HF_TOKEN=

MODEL_NAME=qwen

CHROMA_PATH=./chroma_db

PDF_PATH=./documents/permenkes.pdf

TOP_K=5

TEMPERATURE=0.3

MAX_NEW_TOKENS=512

---

# Performance Targets

Cold Start:

< 30 seconds

Chat Response:

< 5 seconds

Retrieval:

< 500 ms

Availability:

99%

---

# Research Metrics

For each model record:

- Accuracy
- Relevancy
- Hallucination Rate
- Latency
- Context Utilization

Models:

- Qwen 7B
- Qwen 14B
- Llama 3

Output:

Comparison table for thesis/report.

---

# Development Roadmap

Phase 1

- FastAPI setup
- ChromaDB setup
- PDF ingestion

Phase 2

- Retriever implementation
- Prompt engineering

Phase 3

- Qwen integration
- Chat endpoint

Phase 4

- Evaluation endpoint
- Model comparison

Phase 5

- Optimization
- Deployment
- Testing

---

# Definition of Done

Backend is complete when:

✓ PDF successfully ingested

✓ ChromaDB populated

✓ RAG working

✓ Chat endpoint working

✓ Sources returned

✓ Model switch supported

✓ Evaluation endpoint working

✓ Connected successfully to Next.js frontend
