<svelte:options tag="codello-input" />

<script lang="ts">
  //   export let propertyDisplayName: string = "property",
  //     property: null | string = null,
  //     defaultValue: null | string = null,
  //     type: "cssInput";
  //   export let outerHTML = "string";
  //* Cound is defined as a number */
  //   <!-- aaaaaaaaaa: {count},{propertyDisplayName},{property},{defaultValue},{type}, {outerHTML} -->
  //   export let count: number = 0;
  //   const increment = () => {
  //     count += 1;
  //   };
</script>

<!-- <button on:click={increment}>
</button> -->

<div>
  <div class="test">aaa</div>
  <slot />
  <slot name="name" />
  <slot name="address" />
</div>

<style>
  .test {
    color: brown;
  }
</style>
