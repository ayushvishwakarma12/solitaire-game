import React from "react";
import { CardProps, DragItem, ItemTypes } from "../../itemTypes/itemTypes";
import backSideOfCard from "../../assets/backSideOfCard.png";
import { useDrag, useDrop } from "react-dnd";

const Card: React.FC<CardProps> = ({
  card,
  pileIndex,
  cardIndex,
  onCardMove,
}) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: { pileIndex, cardIndex },
    canDrag: card.faceUp,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop: (item: DragItem) => {
      if (item.pileIndex !== pileIndex || item.cardIndex !== cardIndex) {
        onCardMove(item.pileIndex, item.cardIndex, pileIndex, cardIndex);
      }
    },
  });

  return (
    <div
      ref={(node) => drag(drop(node))}
      style={{
        opacity: isDragging ? 0 : 1,
        cursor: card.faceUp ? "move" : "not-allowed",
        top: `${cardIndex * 30}px`,
        left: "0",
        position: "absolute",
        transform: isDragging ? "scale(1.1)" : "scale(1)",
        transition: "transform 0.2s ease-in-out, opacity 0.2s ease-in-out",
        animation: !isDragging ? "bounce 0.5s ease-out" : "none",
      }}
      className={`transition-all duration-200 ${
        isDragging ? "transform scale-105" : ""
      }`}
    >
      <img
        className={`${!card.faceUp && "scale-150"}`}
        src={card.faceUp ? card.imageUrl : backSideOfCard}
      />
    </div>
  );
};

export default Card;
