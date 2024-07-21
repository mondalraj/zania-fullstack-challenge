"use client";

import { useState, useEffect } from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import styles from "./page.module.css";
import Card from "./(components)/(Card)";
import Image from "next/image";
import Document from "@/types/documentType";
import { useGetAllDocs } from "@/hooks/useGetAllDocs";
import { useUpdateDocsOrder } from "@/hooks/useUpdateDocsOrder";
import { formatDistanceToNow } from "date-fns";
import { ActionIcon, Loader, Tooltip } from "@mantine/core";
import { useInterval } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import AddNewDocument from "./(components)/(Document)/AddNewDocument";

export default function Home() {
  const [documents, setDocuments] = useState<Document[] | null>(null);
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
  const [isBrowser, setIsBrowser] = useState(false);
  const [orderUpdated, setOrderUpdated] = useState(false);
  const [addNewDocument, setAddNewDocument] = useState(false);

  const updateReorderedDocs = () => {
    if (orderUpdated) {
      mutate(documents || [], {
        onSuccess: () => {
          setOrderUpdated(false);
        },
      });
    }
  };

  const interval = useInterval(updateReorderedDocs, 1000);

  const { data: allDocs, isLoading, isRefetching } = useGetAllDocs();

  const { mutate, isPending } = useUpdateDocsOrder();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsBrowser(true);
    }
  }, []);

  useEffect(() => {
    interval.start();
    return interval.stop;
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (allDocs?.data) {
      setDocuments(JSON.parse(allDocs.data));
    }
  }, [allDocs]);

  const handleCardClick = (doc: Document) => {
    setSelectedDoc(doc);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setSelectedDoc(null);
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const sourceIndex =
      Number(source.droppableId.split("-")[1]) * 3 + source.index;
    let destinationIndex =
      Number(destination.droppableId.split("-")[1]) * 3 + destination.index;

    if (
      Number(source.droppableId.split("-")[1]) <
      Number(destination.droppableId.split("-")[1])
    ) {
      destinationIndex =
        Number(destination.droppableId.split("-")[1]) * 3 +
        destination.index -
        1;
    }

    const newDocuments = documents ? [...documents] : [];
    const [removed] = newDocuments.splice(sourceIndex, 1);

    newDocuments.splice(destinationIndex, 0, removed);

    setOrderUpdated(true);

    setDocuments(newDocuments);
  };

  function splitIntoGroupsOfThree(arr: Document[]) {
    let resultArray = [];
    for (let i = 0; i < arr.length; i += 3) {
      let group = arr.slice(i, i + 3);
      resultArray.push(group);
    }
    return resultArray;
  }

  return (
    <div className={styles.container}>
      <AddNewDocument
        opened={addNewDocument}
        setOpened={setAddNewDocument}
        documents={documents || []}
      />

      <h2 className={styles.heading}>
        Documents Center
        {allDocs?.lastUpdated && (
          <p className={styles.lastUpdated}>
            {(isLoading || isRefetching || isPending) && (
              <Loader size="sm" color="white" />
            )}
            Last updated: {formatDistanceToNow(new Date(allDocs?.lastUpdated))}{" "}
            ago
          </p>
        )}
      </h2>
      <DragDropContext onDragEnd={onDragEnd}>
        {isBrowser ? (
          <div>
            {splitIntoGroupsOfThree(documents || []).map((group, index) => (
              <Droppable
                key={index}
                droppableId={`documents-${index}`}
                direction="horizontal"
              >
                {(provided) => (
                  <div
                    className={styles.dropContainer}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {group?.map((doc, index) => (
                      <Card
                        key={doc.id}
                        id={doc.id}
                        image={doc.image}
                        index={index}
                        type={doc.type}
                        title={doc.title}
                        onClick={() => handleCardClick(doc)}
                      />
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        ) : null}
      </DragDropContext>
      {selectedDoc && (
        <div className={styles.overlay} onClick={() => setSelectedDoc(null)}>
          <p className={styles.overlayText}>{selectedDoc.title}</p>
          <Image
            src={selectedDoc?.image || "/cat-1.jpeg"}
            alt="Selected"
            width={780}
            height={540}
          />
        </div>
      )}
      <Tooltip label="Add Document" position="left" withArrow>
        <ActionIcon
          style={{
            position: "fixed",
            bottom: 40,
            right: 40,
            backgroundColor: "white",
          }}
          variant="filled"
          size="xl"
          aria-label="Add Doc"
          radius="xl"
          color="white"
          onClick={() => setAddNewDocument(true)}
        >
          <IconPlus stroke={2} size={30} color="black" />
        </ActionIcon>
      </Tooltip>
    </div>
  );
}
