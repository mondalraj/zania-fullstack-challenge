"use client";

import Image from "next/image";
import styles from "./styles.module.css";
import { Draggable } from "react-beautiful-dnd";

interface CardProps {
  index: number;
  id: string;
  image: string;
  type: string;
  title: string;
  onClick?: () => void;
}

const Card = ({ index, id, image, type, title, onClick }: CardProps) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={styles.card}
          onClick={onClick}
        >
          <div className={styles.cardTitle}>
            <p>{title}</p>
          </div>
          <Image
            src={image || "/cat-1.jpeg"}
            alt={title}
            width={350}
            height={220}
          />
        </div>
      )}
    </Draggable>
  );
};

export default Card;
