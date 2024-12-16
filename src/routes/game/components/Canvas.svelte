<script lang="ts">
    import { onMount } from "svelte";

    export let fontRatio: number = 0.03;
    export let aspectRatio: number = 16 / 9;
    export let containerWidth: string = "100dvw";
    export let containerHeight: string = "100dvh";
    export let containerColor: string = "#323232";
    export let canvasColor: string = "#ffffff";

    let container: HTMLDivElement;
    let canvas: HTMLDivElement;

    let resizeCanvas = () => {
        let containerWidth: number = container.offsetWidth;
        let containerHeight: number = container.offsetHeight;
        let containerRatio: number = containerWidth / containerHeight;

        if (containerRatio > aspectRatio) {
            let newWidth: number = containerHeight * aspectRatio;
            canvas.style.width = `${newWidth}px`;
            canvas.style.height = "100%";

            let newFontSize: number = containerHeight * fontRatio;
            canvas.style.fontSize = `${newFontSize}px`;
        } else {
            let newHeight: number = containerWidth / aspectRatio;
            canvas.style.width = "100%";
            canvas.style.height = `${newHeight}px`;

            let newFontSize: number = containerWidth * (fontRatio / aspectRatio);
            canvas.style.fontSize = `${newFontSize}px`;
        }
    };

    onMount(() => {
        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        return () => {
            window.removeEventListener("resize", resizeCanvas);
        };
    });
</script>

<div
    class="container"
    style:width={containerWidth}
    style:height={containerHeight}
    style:background-color={containerColor}
    bind:this={container}
>
    <div
        class="canvas"
        style:background-color={canvasColor}
        bind:this={canvas}
    >
        <slot />
    </div>
</div>

<style>
    .container {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0;
    }

    .canvas {
        display: flex;
        overflow: hidden;
        position: relative;
        align-items: center;
        justify-content: center;
    }
</style>
