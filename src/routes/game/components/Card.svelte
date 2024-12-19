<script lang="ts">
    let {
        containerWidth = "4em",
        isSelected = false,
    }:{
        containerWidth: string,
        isSelected: boolean,
    } = $props();

    let container: HTMLDivElement;
    let aspectRatio: number = 3.5 / 2.5;
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
    class="container {isSelected ? 'selected' : 'not-selected'}"
    style:width={containerWidth}
    style:height={`calc(${containerWidth} * ${aspectRatio})`}
    style:border-radius={`calc(${containerWidth} * 0.1)`}
    onclick={() => {isSelected = !isSelected}}
    bind:this={container}
>
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

    .container {
        display: flex;
        position: static;
        align-items: center;
        justify-content: center;
        margin: 0.25em;
        border: 0.1em solid black;
    }

    .selected {
        animation: selected 0.25s forwards;
    }

    .not-selected {
        animation: not-selected 0.25s forwards;
    }
</style>
