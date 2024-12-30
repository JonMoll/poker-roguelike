import { v4 as uuidv4 } from 'uuid';
import { type CardState } from "$game/scripts/card";

export const generateDeck = (): CardState[] => {
    const deck: CardState[] = [];

    for (let value = 1; value <= 13; value++) {
        for (let suit = 1; suit <= 4; suit++) {
            deck.push({
                uuid: uuidv4(),
                value,
                suit,
                isSelected: false,
                isEnabled: true,
            });
        }
    }

    return deck;
};

export const shuffleDeck = (deck: CardState[]): CardState[] => {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }

    return deck;
};

export const drawCards = (
    deck: CardState[],
    hand: CardState[],
    handSize: number,
): [CardState[], CardState[]] => {
    const cardsToDraw = handSize - hand.length;
    if (cardsToDraw <= 0) {
        console.log("Hand is already full");
        return [deck, hand];
    }

    for (let i = 0; i < cardsToDraw; i++) {
        if (deck.length === 0) {
            console.log("Deck is out of cards");
            break;
        }
        hand.push(deck.pop()!);
    }

    return [deck, hand];
};

export const discardHand = (
    hand: CardState[],
    discarded: CardState[],
): [CardState[], CardState[], boolean] => {
    let discardedAtLeastOne = false;

    hand = hand.filter(card => {
        if (card.isSelected) {
            card.isSelected = false;
            discarded.push(card);
            discardedAtLeastOne = true;
            return false;
        }
        return true;
    });

    return [hand, discarded, discardedAtLeastOne];
};

export const playHand = (
    hand: CardState[],
    played: CardState[],
): [CardState[], CardState[]] => {
    hand = hand.filter(card => {
        if (card.isSelected) {
            card.isSelected = false;
            played.push(card);
            return false;
        }
        return true;
    });

    return [hand, played];
};

export const discardPlayed = (
    played: CardState[],
    discarded: CardState[],
): [CardState[], CardState[]] => {
    discarded.push(...played);
    played.length = 0;

    return [played, discarded];
};

export const disableCards = (cards: CardState[]): void => {
    cards.forEach(card => {
        card.isEnabled = false;
    });
};

export const enableCards = (cards: CardState[]): void => {
    cards.forEach(card => {
        card.isEnabled = true;
    });
};
