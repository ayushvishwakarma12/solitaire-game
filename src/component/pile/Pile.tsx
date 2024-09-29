import { useEffect, useState } from "react";
import backSideOfCard from "../../assets/backSideOfCard.png";
import { cardData, GameData } from "../../itemTypes/itemTypes";
import Card from "../card/Card";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import Footer from "../footer/Footer";

const Pile = () => {
  const [cards, setCards] = useState<cardData[][]>([]);
  const [deck, setDeck] = useState<cardData[][]>([]);
  const [client, setClient] = useState<Client | null>(null);
  const [move, setMove] = useState<number>(0);
  const [completedSequence, setCompletedSequence] = useState<number>(0);

  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/game");
    const stompClient = new Client({
      webSocketFactory: () => socket,
      onConnect: () => {
        console.log("conneted to web socket");
        stompClient.subscribe("/topic/gameState", (message) => {
          const pilesData = JSON.parse(message.body);
          console.log("piles data", pilesData);
        });
      },
      onWebSocketError: (error) => {
        console.error("WebSocket error:", error);
      },
      onDisconnect: (frame) => {
        console.log("Disconnected:", frame);
      },
      onStompError: (frame) => {
        console.log("Broker Error" + frame.headers["message"]);
      },
    });

    stompClient.activate();
    setClient(stompClient);

    fetchCards();

    return () => {
      stompClient.deactivate();
    };
  }, []);

  const fetchCards = async () => {
    const response = await fetch("http://localhost:8080/game/game-state", {
      method: "GET",
    });
    const data: GameData = await response.json();

    setMove(data.moves);
    if (data?.piles.length > 0) {
      setDeck(data.deck);
      setCards(data.piles);
      setCompletedSequence(data.completedSequence);
    }
  };

  const handleCardMove = (
    sourcePileIndex: number,
    sourceCardIndex: number,
    targetPileIndex: number
  ) => {
    console.log("handle card move");
    const moveRequest = {
      sourcePileIndex,
      sourceCardIndex,
      targetPileIndex,
    };
    if (client) {
      // Check if client is not null
      client.publish({
        destination: "/app/game/moveCard",
        body: JSON.stringify(moveRequest),
      });
    } else {
      console.error("WebSocket client is not initialized");
    }
    fetchCards();
  };

  const handleDeckClick = async () => {
    const response = await fetch("http://localhost:8080/game/deck/distribute", {
      method: "POST",
    });
    if (response.ok) {
      const updatedGameState: GameData = await response.json();
      setCards(updatedGameState.piles);
    } else {
      console.log("Failed to distribute cards");
    }
    fetchCards();
  };

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <div className=" max-w-[1300px] mx-auto py-5 min-h-screen flex flex-col ">
          {cards?.length > 0 && (
            <div className="grid grid-cols-10 gap-2">
              {cards.map((pile, pileIndex) => {
                return (
                  <div key={pileIndex} className="relative  h-[220px]">
                    {pile.map((card, cardIndex) => (
                      <Card
                        key={cardIndex}
                        card={card}
                        pileIndex={pileIndex}
                        cardIndex={cardIndex}
                        onCardMove={handleCardMove}
                      />
                    ))}
                  </div>
                );
              })}
            </div>
          )}
          {Array.from(Array(completedSequence)).map((_, index) => (
            <div key={index} className="absolute bottom-0 left-16">
              <img src={backSideOfCard} className="w-[200px] " />
            </div>
          ))}

          <div className="relative top-[250px] self-end min-w-[290px] left-[90px]">
            {Array.from({ length: Math.floor(deck.length / 10) }).map(
              (_, index) => (
                <div
                  key={index}
                  className="absolute "
                  style={{
                    left: `${index * 20}px`,
                  }}
                  onClick={handleDeckClick}
                >
                  <img
                    className="w-[190px] h-[200px] cursor-pointer"
                    src={backSideOfCard}
                  />
                </div>
              )
            )}
          </div>
        </div>
      </DndProvider>
      <Footer fetchCards={fetchCards} move={move} />
    </>
  );
};

export default Pile;
