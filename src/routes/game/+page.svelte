<script lang="ts">
    import "$game/styles/global.css";
    import Canvas from "$game/components/Canvas.svelte";
    import CardsHand from "$game/components/CardsHand.svelte";
    import CardsPlayed from "$game/components/CardsPlayed.svelte";
    import PokerHands from "$game/components/PokerHands.svelte";
    import { type CardState } from "$game/scripts/card";
    import { type PokerHandState } from "$game/scripts/poker-hands";
    import { generatePokerHands } from "$game/scripts/poker-hands";
    import {
        generateDeck,
        shuffleDeck,
    } from "$game/scripts/game";

    let handSize: number = 8;
    let maxSelectedCards: number = 5;
    let deck: CardState[] = $state(shuffleDeck(generateDeck()));
    let hand: CardState[] = $state([]);
    let discarded: CardState[] = $state([]);
    let played: CardState[] = $state([]);
    let handButtonsEnabled: boolean = $state(true);
    let pokerHands: PokerHandState[] = $state(generatePokerHands());
</script>

<Canvas>
    <PokerHands
        bind:pokerHands={pokerHands}
    />
    <CardsPlayed
        handSize={handSize}
        maxSelectedCards={maxSelectedCards}
        bind:deck={deck}
        bind:hand={hand}
        bind:discarded={discarded}
        bind:played={played}
        bind:pokerHands={pokerHands}
        bind:handButtonsEnabled={handButtonsEnabled}
    />
    <CardsHand
        handSize={handSize}
        maxSelectedCards={maxSelectedCards}
        bind:deck={deck}
        bind:hand={hand}
        bind:discarded={discarded}
        bind:played={played}
        bind:pokerHands={pokerHands}
        bind:handButtonsEnabled={handButtonsEnabled}
    />
</Canvas>
