import Document from "@/types/documentType";

const initialDocuments: Document[] = [
  {
    id: "1",
    type: "bankdraft",
    title: "Bank Draft",
    position: 0,
    image: "/cat-1.jpeg",
  },
  {
    id: "2",
    type: "bill-of-lading",
    title: "Bill of Lading",
    position: 1,
    image: "/cat-2.avif",
  },
  {
    id: "3",
    type: "invoice",
    title: "Invoice",
    position: 2,
    image: "/cat-3.avif",
  },
  {
    id: "4",
    type: "bank-draft-2",
    title: "Bank Draft 2",
    position: 3,
    image: "/cat-4.avif",
  },
  {
    id: "5",
    type: "bill-of-lading-2",
    title: "Bill of Lading 2",
    position: 4,
    image: "/cat-5.avif",
  },
];

export default initialDocuments;
