import { type CardState } from "$game/scripts/card";

export type PokerHandState = {
    name: string,
    level: number,
    chips: number,
    mult: number,
    isSelected: boolean,
}

export const generatePokerHands = (): PokerHandState[] => {
    const pokerHands: PokerHandState[] = [
        { name: "Royal Flush",
          level: 1, chips: 100, mult: 8, isSelected: false },
        { name: "Straight Flush",
          level: 1, chips: 100, mult: 8, isSelected: false },
        { name: "Four of a Kind",
          level: 1, chips: 60, mult: 7, isSelected: false },
        { name: "Full House",
          level: 1, chips: 40, mult: 4, isSelected: false },
        { name: "Flush",
          level: 1, chips: 35, mult: 4, isSelected: false },
        { name: "Straight",
          level: 1, chips: 30, mult: 4, isSelected: false },
        { name: "Three of a Kind",
          level: 1, chips: 30, mult: 3, isSelected: false },
        { name: "Two Pair",
          level: 1, chips: 20, mult: 2, isSelected: false },
        { name: "Pair",
          level: 1, chips: 10, mult: 2, isSelected: false },
        { name: "High Card",
          level: 1, chips: 5, mult: 1, isSelected: false },
    ];

    return pokerHands;
};

export const getPokerHandName = (cards: CardState[]): string => {
    if (isRoyalFlush(cards)) return "Royal Flush";
    if (isStraightFlush(cards)) return "Straight Flush";
    if (isFourOfAKind(cards)) return "Four of a Kind";
    if (isFullHouse(cards)) return "Full House";
    if (isFlush(cards)) return "Flush";
    if (isStraight(cards)) return "Straight";
    if (isThreeOfAKind(cards)) return "Three of a Kind";
    if (isTwoPair(cards)) return "Two Pair";
    if (isPair(cards)) return "Pair";
    return "High Card";
};

const isRoyalFlush = (cards: CardState[]): boolean => {
    return isStraightFlush(cards) && cards.some(card => card.value === 1);
};

const isStraightFlush = (cards: CardState[]): boolean => {
    return isFlush(cards) && isStraight(cards);
};

const isFourOfAKind = (cards: CardState[]): boolean => {
    return hasNOfAKind(cards, 4);
};

const isFullHouse = (cards: CardState[]): boolean => {
    return hasNOfAKind(cards, 3) && hasNOfAKind(cards, 2);
};

const isFlush = (cards: CardState[]): boolean => {
    const suits = cards.map(card => card.suit);
    return new Set(suits).size === 1;
};

const isStraight = (cards: CardState[]): boolean => {
    const values = cards.map(card => card.value).sort((a, b) => a - b);
    for (let i = 1; i < values.length; i++) {
        if (values[i] !== values[i - 1] + 1) {
            return false;
        }
    }
    return true;
};

const isThreeOfAKind = (cards: CardState[]): boolean => {
    return hasNOfAKind(cards, 3);
};

const isTwoPair = (cards: CardState[]): boolean => {
    const pairs = cards.reduce((acc, card) => {
        acc[card.value] = (acc[card.value] || 0) + 1;
        return acc;
    }, {} as { [key: number]: number });
    return Object.values(pairs).filter(count => count === 2).length === 2;
};

const isPair = (cards: CardState[]): boolean => {
    return hasNOfAKind(cards, 2);
};

const hasNOfAKind = (cards: CardState[], n: number): boolean => {
    const counts = cards.reduce((acc, card) => {
        acc[card.value] = (acc[card.value] || 0) + 1;
        return acc;
    }, {} as { [key: number]: number });
    return Object.values(counts).some(count => count === n);
};

export const getPokerHandCards = (
    hand: string,
    cards: CardState[],
): CardState[] => {
    switch (hand) {
        case "Royal Flush":
            return getRoyalFlushCards(cards);
        case "Straight Flush":
            return getStraightFlushCards(cards);
        case "Four of a Kind":
            return getNOfAKindCards(cards, 4);
        case "Full House":
            return getFullHouseCards(cards);
        case "Flush":
            return getFlushCards(cards);
        case "Straight":
            return getStraightCards(cards);
        case "Three of a Kind":
            return getNOfAKindCards(cards, 3);
        case "Two Pair":
            return getTwoPairCards(cards);
        case "Pair":
            return getNOfAKindCards(cards, 2);
        default:
            return getHighCard(cards);
    }
};

const getRoyalFlushCards = (cards: CardState[]): CardState[] => {
    return getStraightFlushCards(cards).filter(card => card.value >= 10 || card.value === 1);
};

const getStraightFlushCards = (cards: CardState[]): CardState[] => {
    return getFlushCards(cards).filter(card => isStraight([card]));
};

const getNOfAKindCards = (cards: CardState[], n: number): CardState[] => {
    const counts = cards.reduce((acc, card) => {
        acc[card.value] = (acc[card.value] || 0) + 1;
        return acc;
    }, {} as { [key: number]: number });
    const value = Object.keys(counts).find(key => counts[parseInt(key)] === n);
    return cards.filter(card => card.value === parseInt(value!));
};

const getFullHouseCards = (cards: CardState[]): CardState[] => {
    const threeOfAKind = getNOfAKindCards(cards, 3);
    const pair = getNOfAKindCards(cards, 2);
    return [...threeOfAKind, ...pair];
};

const getFlushCards = (cards: CardState[]): CardState[] => {
    const suits = cards.map(card => card.suit);
    const flushSuit = suits.find(suit => suits.filter(s => s === suit).length >= 5);
    return cards.filter(card => card.suit === flushSuit);
};

const getStraightCards = (cards: CardState[]): CardState[] => {
    const values = cards.map(card => card.value).sort((a, b) => a - b);
    const straight = [];
    for (let i = 0; i < values.length - 4; i++) {
        if (values[i + 4] === values[i] + 4) {
            straight.push(cards[i], cards[i + 1], cards[i + 2], cards[i + 3], cards[i + 4]);
            break;
        }
    }
    return straight;
};

const getTwoPairCards = (cards: CardState[]): CardState[] => {
    const pairs = cards.reduce((acc, card) => {
        acc[card.value] = (acc[card.value] || 0) + 1;
        return acc;
    }, {} as { [key: number]: number });
    const pairValues = Object.keys(pairs).filter(key => pairs[parseInt(key)] === 2);
    return cards.filter(card => pairValues.includes(card.value.toString()));
};

const getHighCard = (cards: CardState[]): CardState[] => {
    return [cards.reduce((highCard, card) => card.value > highCard.value ? card : highCard)];
};
