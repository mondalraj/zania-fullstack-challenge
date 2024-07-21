import { useCreateDocument } from "@/hooks/useCreateDocument";
import Document from "@/types/documentType";
import { Box, Button, Drawer, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import React, { useState } from "react";

const AddNewDocument = ({
  opened,
  setOpened,
  documents,
}: {
  opened: boolean;
  setOpened: (opened: boolean) => void;
  documents: Document[];
}) => {
  const [loading, setLoading] = useState(false);
  const { mutate } = useCreateDocument();

  const form = useForm<Document>({
    initialValues: {
      id: (documents?.length + 1)?.toString() || Date.now().toString(),
      image: "/cat-1.jpeg",
      type: "",
      title: "",
      position: documents?.length || 0,
    },
  });

  const handleSubmit = (values: Document) => {
    setLoading(true);
    mutate(
      {
        ...values,
        id: (documents?.length + 1)?.toString() || Date.now().toString(),
        position: documents?.length || 0,
      },
      {
        onSuccess: () => {
          setOpened(false);
          notifications.show({
            message: "Document created successfully",
            color: "green",
          });
          setLoading(false);
        },
        onError: () => {
          setLoading(false);
          notifications.show({
            message: "Failed to add new document",
            color: "red",
          });
        },
      }
    );
  };

  return (
    <Drawer
      opened={opened}
      onClose={() => {
        setOpened(false);
      }}
      title="Add New Document"
      overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
      padding="xl"
      position="right"
      size={500}
      styles={{
        content: {
          backgroundColor: "black",
        },
        header: {
          backgroundColor: "black",
        },
      }}
    >
      <form
        autoComplete="off"
        onSubmit={form.onSubmit(handleSubmit)}
        style={{
          padding: "0 0 1rem 0",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <TextInput
          placeholder="Title"
          label="Title"
          required
          autoFocus
          data-autofocus
          size="md"
          {...form.getInputProps("title")}
        />

        <TextInput
          placeholder="Type"
          label="Type"
          required
          size="md"
          {...form.getInputProps("type")}
        />

        <Box
          style={(theme) => ({
            position: "fixed",
            bottom: 0,
            borderTop: `0.5px solid ${theme.colors.gray[2]}`,
            padding: "1rem",
            width: "95%",
            display: "flex",
            justifyContent: "flex-end",
            gap: "1rem",
          })}
        >
          <Button
            color="white"
            type="reset"
            radius="xs"
            variant="subtle"
            onClick={() => {
              setOpened(false);
            }}
          >
            Cancel
          </Button>
          <Button
            color="white"
            style={{
              backgroundColor: "white",
              color: "black",
            }}
            loading={loading}
            type="submit"
            radius="xs"
          >
            Add
          </Button>
        </Box>
      </form>
    </Drawer>
  );
};

export default AddNewDocument;
