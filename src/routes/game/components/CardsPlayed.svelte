<script lang="ts">
    import Card from "$game/components/Card.svelte";
    import { type CardState } from "$game/scripts/card";
    import {
        drawCards,
        discardPlayed,
        enableCards,
    } from "$game/scripts/game";

    let {
        handSize,
        deck = $bindable(),
        hand = $bindable(),
        discarded = $bindable(),
        played = $bindable(),
    }:{
        handSize: number,
        deck: CardState[],
        hand: CardState[],
        played: CardState[],
        discarded: CardState[],
    } = $props();

    let container: HTMLDivElement;

    let clickOK = () => {
        [played, discarded] = discardPlayed(played, discarded);
        [deck, hand] = drawCards(deck, hand, handSize);
        enableCards(hand);
        enableCards(played);
    };
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="container" bind:this={container}>
    <div class="cards">
        {#each played as card}
            <Card
                value={card.value}
                suit={card.suit}
                bind:isSelected={card.isSelected}
                bind:isEnabled={card.isEnabled}
            />
        {/each}
    </div>
    <div class="buttons">
        {#if played.length > 0}
            <div class="button" onclick={clickOK}> OK </div>
        {/if}
    </div>
</div>

<style>
    .container {
        position: absolute;
        transform: translateY(0em);
        margin: 0em;
    }

    .cards {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .buttons {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 6em;
        height: 2em;
        margin: 0.25em;
        border: 0.1em solid black;
        border-radius: 0.3em;
        user-select: none;
    }
</style>
