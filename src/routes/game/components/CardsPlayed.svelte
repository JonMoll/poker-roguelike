<script lang="ts">
    import Card from "$game/components/Card.svelte";
    import { type CardState } from "$game/scripts/card";

    let {
        played = $bindable(),
    }:{
        played: CardState[],
    } = $props();

    let container: HTMLDivElement;
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
            />
        {/each}
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
</style>
