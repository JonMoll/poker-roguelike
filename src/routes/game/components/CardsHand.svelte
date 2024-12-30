<script lang="ts">
    import Card from "$game/components/Card.svelte";
    import { type CardState } from "$game/scripts/card";
    import {
        drawCards,
        discardHand,
        playHand,
        disableCards,
    } from "$game/scripts/game";

    let {
        handSize,
        deck = $bindable(),
        hand = $bindable(),
        discarded = $bindable(),
        played = $bindable(),
        handButtonsEnabled = $bindable(),
    }:{
        handSize: number,
        deck: CardState[],
        hand: CardState[],
        discarded: CardState[],
        played: CardState[],
        handButtonsEnabled: boolean,
    } = $props();

    let container: HTMLDivElement;

    [deck, hand] = drawCards(deck, hand, handSize);

    let clickDiscard = () => {
        if (handButtonsEnabled) {
            let discardedAtLeastOne: boolean;
            [hand, discarded, discardedAtLeastOne] = discardHand(hand, discarded);

            if (discardedAtLeastOne) {
                [deck, hand] = drawCards(deck, hand, handSize);
            };
        };
    };

    let clickPlayHand = () => {
        if (handButtonsEnabled) {
            [hand, played] = playHand(hand, played);
            disableCards(hand);
            disableCards(played);
            handButtonsEnabled = false;
        };
    };
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="container" bind:this={container}>
    <div class="cards">
        {#each hand as card}
            <Card
                value={card.value}
                suit={card.suit}
                bind:isSelected={card.isSelected}
                bind:isEnabled={card.isEnabled}
            />
        {/each}
    </div>
    <div class="buttons">
        <div class="button" onclick={clickPlayHand}> Play Hand </div>
        <div class="button" onclick={clickDiscard}> Discard </div>
    </div>
</div>

<style>
    .container {
        position: absolute;
        transform: translateY(11em);
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
