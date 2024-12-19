<script lang="ts">
    import Card from "$game/components/Card.svelte";

    let container: HTMLDivElement;
</script>

<div class="container" bind:this={container}>
    {#each Array(8) as _}
        <Card containerWidth={"4em"} isSelected={false} />
    {/each}
</div>

<style>
    .container {
        display: flex;
        position: absolute;
        align-items: center;
        justify-content: center;
        transform: translateY(8em);
        margin: 0em;
        /*border: 0.1em solid red;*/
    }
</style>
