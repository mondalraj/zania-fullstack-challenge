"use client";

import Image from "next/image";
import styles from "./styles.module.css";
import { Draggable } from "react-beautiful-dnd";
import { ActionIcon, Menu } from "@mantine/core";
import { IconDotsVertical, IconEdit, IconTrash } from "@tabler/icons-react";
import { useDeleteDocument } from "@/hooks/useDeleteDocument";
import { notifications } from "@mantine/notifications";

interface CardProps {
  index: number;
  id: string;
  image: string;
  type: string;
  title: string;
  onClick?: () => void;
}

const Card = ({ index, id, image, type, title, onClick }: CardProps) => {
  const { mutate: deleteDocument } = useDeleteDocument();

  const handleDelete = () => {
    deleteDocument(id, {
      onSuccess: () => {
        notifications.show({
          message: "Document deleted successfully",
          color: "green",
        });
      },
      onError: (error) => {
        console.error(error);
        notifications.show({
          message: "Failed to delete document",
          color: "red",
        });
      },
    });
  };

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={styles.card}
        >
          <div className={styles.cardTitle}>
            <p>{title}</p>
            <div className={styles.menuContainer}>
              <Menu shadow="md" width={160}>
                <Menu.Target>
                  <ActionIcon color="white" variant="transparent">
                    <IconDotsVertical size={18} />
                  </ActionIcon>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Label>Actions</Menu.Label>

                  {/* <Menu.Item
                    leftSection={<IconEdit size={18} />}
                    onClick={() => {}}
                  >
                    Edit
                  </Menu.Item> */}

                  <Menu.Item
                    onClick={() => {
                      handleDelete();
                    }}
                    leftSection={<IconTrash size={18} color="red" />}
                  >
                    Delete
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </div>
          </div>
          <Image
            src={image || "/cat-1.jpeg"}
            alt={title}
            width={350}
            height={220}
            onClick={onClick}
          />
        </div>
      )}
    </Draggable>
  );
};

export default Card;
