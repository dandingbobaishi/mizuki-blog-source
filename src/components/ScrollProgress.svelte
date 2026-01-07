<script lang="ts">
  import { onMount } from 'svelte';
  
  let progress = 0;
  let isVisible = false;
  
  function updateProgress() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    progress = (scrollTop / scrollHeight) * 100;
    isVisible = scrollTop > 100;
  }
  
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
  
  onMount(() => {
    updateProgress();
    window.addEventListener('scroll', updateProgress);
    
    return () => {
      window.removeEventListener('scroll', updateProgress);
    };
  });
</script>

<!-- 滚动进度条 -->
<div 
  class="fixed top-0 left-0 w-full h-1 z-50 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 origin-left transition-transform duration-150"
  style="transform: scaleX({progress / 100})"
></div>

<!-- 回到顶部按钮 -->
<button
  class="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-40 flex items-center justify-center group"
  class:opacity-0={!isVisible}
  class:pointer-events-none={!isVisible}
  class:translate-y-4={!isVisible}
  on:click={scrollToTop}
  aria-label="回到顶部"
>
  <svg 
    class="w-6 h-6 transition-transform duration-300 group-hover:-translate-y-1" 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24"
  >
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
  </svg>
  
  <!-- 进度环 -->
  <svg class="absolute inset-0 w-12 h-12 -rotate-90">
    <circle
      cx="24"
      cy="24"
      r="20"
      fill="none"
      stroke="rgba(255,255,255,0.3)"
      stroke-width="2"
    />
    <circle
      cx="24"
      cy="24"
      r="20"
      fill="none"
      stroke="rgba(255,255,255,0.8)"
      stroke-width="2"
      stroke-dasharray="125.6"
      stroke-dashoffset={125.6 - (progress / 100) * 125.6}
      stroke-linecap="round"
      class="transition-all duration-150"
    />
  </svg>
</button>

<style>
  button {
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }
  
  button:hover {
    transform: translateY(-2px) scale(1.05);
  }
</style>