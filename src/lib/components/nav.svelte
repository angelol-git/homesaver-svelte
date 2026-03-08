<script>
  let { sets, currentSet, onUpdate } = $props();
</script>

<nav class="flex gap-1">
  {#each sets as set, index}
    <button
      onclick={() => {
        onUpdate(index);
      }}
      class="px-4 py-1 font-medium rounded-full cursor-pointer text-sm"
      class:bg-blue-500={currentSet === index}
      class:text-white={currentSet === index}
      class:text-gray-800={currentSet !== index}
      class:bg-gray-200={currentSet !== index}
    >
      Set {index + 1}
    </button>
  {/each}
</nav>
