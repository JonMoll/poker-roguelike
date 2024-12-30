export type CardState = {
    uuid: string,
    value: number,
    suit: number,
    isSelected: boolean,
    isEnabled: boolean,
}

export const getValueSymbol = (value: number): string => {
    const valueSymbols: { [key: number]: string } = {
        1: "A",
        11: "J",
        12: "Q",
        13: "K",
    };

    return valueSymbols[value] || value.toString();
};

export const getSuitSymbol = (suit: number): string => {
    const suitSymbols: { [key: number]: string } = {
        1: "♥",
        2: "♦",
        3: "♣",
        4: "♠",
    };

    return suitSymbols[suit] || "?";
};

export const getSuitColor = (suit: number): string => {
    const suitSymbols: { [key: number]: string } = {
        1: "red",
        2: "red",
        3: "black",
        4: "black",
    };

    return suitSymbols[suit] || "black";
};
