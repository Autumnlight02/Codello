<svelte:options tag="experimental-tag" />

<script lang="ts">
  // component props
  // Camel case not supported for props, see drawback section.
  import { get_current_component } from "svelte/internal";
  const thisComponent = get_current_component();

  console.log(thisComponent);
</script>

<main>
  <div class="card-container" />
  test
  <div class="testDiv" />
</main>
