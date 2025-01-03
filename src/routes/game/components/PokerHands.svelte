<script lang="ts">
    import { type PokerHandState } from "$game/scripts/poker-hands";

    let {
        pokerHands = $bindable(),
    }:{
        pokerHands: PokerHandState[],
    } = $props();
</script>

<div class="container">
    {#each pokerHands as hand}
        <div class="hand {hand.isSelected ? 'selected' : ''}">
            {hand.name}
        </div>
    {/each}
</div>

<style>
    .container {
        position: absolute;
        transform: translateX(24em);
        margin: 0em;
    }

    .hand {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 8em;
        height: 1.5em;
        margin: 0.25em;
        border: 0.1em solid black;
        border-radius: 0.3em;
        user-select: none;
    }

    .selected {
        background-color: lightblue;
    }
</style>
