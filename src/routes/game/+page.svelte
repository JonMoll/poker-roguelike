<script lang="ts">
    import "$game/styles/global.css";
    import Canvas from "$game/components/Canvas.svelte";
    import CardsHand from "$game/components/CardsHand.svelte";
    import { type CardState } from "$game/scripts/card";
    import {
        generateDeck,
        shuffleDeck,
    } from "$game/scripts/game";

    let handSize: number = 8;
    let deck: CardState[] = $state(shuffleDeck(generateDeck()));
    let hand: CardState[] = $state([]);
    let discarded: CardState[] = $state([]);
</script>

<Canvas>
    <CardsHand
        handSize={handSize}
        bind:deck={deck}
        bind:hand={hand}
        bind:discarded={discarded}
    />
</Canvas>
