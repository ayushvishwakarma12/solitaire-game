export const ItemTypes = {
  CARD: "card",
};

export interface cardData {
  values: number;
  imageUrl: string;
  faceUp: boolean;
}

export interface GameData {
  deck: [];
  foundation: [];
  moves: number;
  piles: cardData[][];
  score: number;
  completedSequence: number;
}

export interface CardProps {
  card: cardData;
  pileIndex: number;
  cardIndex: number;
  onCardMove: (
    sourcePileIndex: number,
    sourceCardIndex: number,
    targetPileIndex: number,
    targetCardIndex: number
  ) => void;
}

export interface DragItem {
  pileIndex: number;
  cardIndex: number;
}
