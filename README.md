## Library / Framework
1. Tailwind css
2. Shadcn UI
3. axios
4. Next.js
5. tanstack query


src/
├── api/                         # Layer komunikasi API
│   ├── messages/
│   │   ├── messages.ts          # Fungsi fetch API (GetAllMessages, DeleteMessage, dsb.)
│   │   └── type.ts               # Tipe data untuk messages
│   └── type.ts                   # Tipe global ResponseApi
│
├── app/
│   ├── messages/
│   │   ├── page.tsx              # Halaman utama MessagesPage (hanya wrapper)
│   │   ├── components/
│   │   │   ├── InboxList.tsx
│   │   │   ├── ReadMessage.tsx
│   │   │   └── MessageHeader.tsx
│   │   └── hooks/
│   │       └── useMessages.ts    # React Query hooks untuk messages
│   │
│   └── layout.tsx
│
├── components/
│   ├── dialog/
│   │   └── alert-dialog.tsx      # Alert dialog reusable
│   ├── ui/                       # Komponen UI base (Button, Separator, dsb.)
│   │   ├── button.tsx
│   │   ├── separator.tsx
│   │   └── ...
│   └── feedback/
│       ├── Spinner.tsx           # Loader/Spinner reusable
│       └── ErrorState.tsx
│
├── hooks/
│   └── use-truncate.ts           # Hook util seperti truncateText
│
├── lib/
│   └── utils.ts                  # Utility functions
│
└── types/
    └── index.ts                  # Tipe global