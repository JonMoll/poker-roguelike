<script lang="ts">
    import {
        getValueSymbol,
        getSuitSymbol,
        getSuitColor,
    } from "$game/scripts/card";

    let {
        value,
        suit,
        isSelected = $bindable(),
        isEnabled = $bindable(),
    }:{
        value: number,
        suit: number,
        isSelected: boolean,
        isEnabled: boolean,
    } = $props();

    let container: HTMLDivElement;

    let clickContainer = () => {
        if (isEnabled) {
            isSelected = !isSelected;
        };
    };

    let classSelected = (): string => {
        if (isSelected) {
            return "selected";
        } else {
            return "not-selected";
        };
    };
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
    class="container {classSelected()}"
    onclick={clickContainer}
    bind:this={container}
>
    <div class="symbol-value">
        <div style:color={getSuitColor(suit)}> {getValueSymbol(value)} </div>
    </div>

    <div class="symbol-suit">
        <div style:color={getSuitColor(suit)}> {getSuitSymbol(suit)} </div>
    </div>
</div>

<style>
    @keyframes selected {
        0% {
            transform: translateY(0em);
        }
        100% {
            transform: translateY(-2em);
        }
    }

    @keyframes not-selected {
        0% {
            transform: translateY(-2em);
        }
        100% {
            transform: translateY(0);
        }
    }

    .selected {
        animation: selected 0.2s forwards;
    }

    .not-selected {
        animation: not-selected 0.2s forwards;
    }

    .container {
        display: flex;
        position: static;
        align-items: center;
        justify-content: center;
        width: 4em;
        height: 5.6em;
        margin: 0.2em;
        border: 0.1em solid black;
        border-radius: 0.3em;
        user-select: none;
        background-color: white;
    }

    .symbol-value {
        position: absolute;
        width: 1em;
        transform: translateX(-1.25em) translateY(-2.0em);
    }

    .symbol-suit {
        position: absolute;
        width: 1em;
        transform: translateX(-1.25em) translateY(-1.0em);
    }
</style>
