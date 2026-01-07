<script lang="ts">
  import { onMount } from 'svelte';
  import { Icon } from '@iconify/svelte';
  
  let searchQuery = '';
  let searchResults: any[] = [];
  let isSearching = false;
  let searchHistory: string[] = [];
  let showHistory = false;
  let selectedIndex = -1;
  let searchInput: HTMLInputElement;
  
  // 搜索建议
  const searchSuggestions = [
    '技术文章', '生活随笔', '项目分享', '学习笔记',
    'JavaScript', 'TypeScript', 'Vue', 'React',
    '前端开发', '后端开发', '全栈开发'
  ];
  
  // 从本地存储加载搜索历史
  onMount(() => {
    const saved = localStorage.getItem('search-history');
    if (saved) {
      searchHistory = JSON.parse(saved);
    }
  });
  
  // 保存搜索历史
  function saveSearchHistory(query: string) {
    if (query.trim() && !searchHistory.includes(query)) {
      searchHistory = [query, ...searchHistory.slice(0, 9)]; // 保留最近10条
      localStorage.setItem('search-history', JSON.stringify(searchHistory));
    }
  }
  
  // 执行搜索
  async function performSearch(query: string) {
    if (!query.trim()) {
      searchResults = [];
      return;
    }
    
    isSearching = true;
    saveSearchHistory(query);
    
    try {
      // 这里应该调用实际的搜索API
      // 模拟搜索延迟
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // 模拟搜索结果
      searchResults = [
        {
          title: `搜索结果: ${query}`,
          excerpt: '这是一个模拟的搜索结果...',
          url: '/posts/example',
          type: 'post',
          tags: ['技术', '前端']
        },
        // 更多结果...
      ];
    } catch (error) {
      console.error('搜索失败:', error);
      searchResults = [];
    } finally {
      isSearching = false;
    }
  }
  
  // 处理输入
  function handleInput(event: Event) {
    const target = event.target as HTMLInputElement;
    searchQuery = target.value;
    
    if (searchQuery.length > 2) {
      performSearch(searchQuery);
    } else {
      searchResults = [];
    }
  }
  
  // 处理键盘导航
  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      selectedIndex = Math.min(selectedIndex + 1, searchResults.length - 1);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      selectedIndex = Math.max(selectedIndex - 1, -1);
    } else if (event.key === 'Enter') {
      event.preventDefault();
      if (selectedIndex >= 0 && searchResults[selectedIndex]) {
        window.location.href = searchResults[selectedIndex].url;
      } else if (searchQuery.trim()) {
        performSearch(searchQuery);
      }
    } else if (event.key === 'Escape') {
      searchQuery = '';
      searchResults = [];
      selectedIndex = -1;
      showHistory = false;
    }
  }
  
  // 清除搜索历史
  function clearHistory() {
    searchHistory = [];
    localStorage.removeItem('search-history');
    showHistory = false;
  }
  
  // 使用历史搜索
  function useHistoryItem(item: string) {
    searchQuery = item;
    showHistory = false;
    performSearch(item);
    searchInput.focus();
  }
  
  // 使用搜索建议
  function useSuggestion(suggestion: string) {
    searchQuery = suggestion;
    performSearch(suggestion);
    searchInput.focus();
  }
</script>

<div class="advanced-search-container">
  <!-- 搜索输入框 -->
  <div class="search-input-wrapper glass-card">
    <Icon icon="material-symbols:search" class="search-icon" />
    <input
      bind:this={searchInput}
      bind:value={searchQuery}
      on:input={handleInput}
      on:keydown={handleKeydown}
      on:focus={() => showHistory = searchHistory.length > 0 && !searchQuery}
      placeholder="搜索文章、标签、分类..."
      class="search-input"
      autocomplete="off"
    />
    
    {#if searchQuery}
      <button
        on:click={() => {
          searchQuery = '';
          searchResults = [];
          selectedIndex = -1;
        }}
        class="clear-button"
        aria-label="清除搜索"
      >
        <Icon icon="material-symbols:close" />
      </button>
    {/if}
    
    {#if isSearching}
      <div class="loading-spinner">
        <Icon icon="material-symbols:progress-activity" class="animate-spin" />
      </div>
    {/if}
  </div>
  
  <!-- 搜索建议 -->
  {#if !searchQuery && !showHistory}
    <div class="search-suggestions glass-card">
      <h3>热门搜索</h3>
      <div class="suggestions-grid">
        {#each searchSuggestions as suggestion}
          <button
            on:click={() => useSuggestion(suggestion)}
            class="suggestion-tag"
          >
            {suggestion}
          </button>
        {/each}
      </div>
    </div>
  {/if}
  
  <!-- 搜索历史 -->
  {#if showHistory && searchHistory.length > 0}
    <div class="search-history glass-card">
      <div class="history-header">
        <h3>搜索历史</h3>
        <button on:click={clearHistory} class="clear-history-btn">
          <Icon icon="material-symbols:delete-outline" />
          清除
        </button>
      </div>
      <div class="history-list">
        {#each searchHistory as item}
          <button
            on:click={() => useHistoryItem(item)}
            class="history-item"
          >
            <Icon icon="material-symbols:history" />
            {item}
          </button>
        {/each}
      </div>
    </div>
  {/if}
  
  <!-- 搜索结果 -->
  {#if searchResults.length > 0}
    <div class="search-results glass-card">
      <div class="results-header">
        <h3>搜索结果 ({searchResults.length})</h3>
      </div>
      <div class="results-list">
        {#each searchResults as result, index}
          <a
            href={result.url}
            class="result-item"
            class:selected={index === selectedIndex}
          >
            <div class="result-content">
              <h4>{result.title}</h4>
              <p>{result.excerpt}</p>
              <div class="result-meta">
                <span class="result-type">{result.type}</span>
                {#if result.tags}
                  <div class="result-tags">
                    {#each result.tags as tag}
                      <span class="tag">#{tag}</span>
                    {/each}
                  </div>
                {/if}
              </div>
            </div>
            <Icon icon="material-symbols:chevron-right" class="result-arrow" />
          </a>
        {/each}
      </div>
    </div>
  {/if}
  
  <!-- 无结果提示 -->
  {#if searchQuery && !isSearching && searchResults.length === 0}
    <div class="no-results glass-card">
      <Icon icon="material-symbols:search-off" class="no-results-icon" />
      <h3>未找到相关内容</h3>
      <p>尝试使用不同的关键词或查看热门搜索</p>
    </div>
  {/if}
</div>

<style>
  .advanced-search-container {
    position: relative;
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
  }
  
  .search-input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    padding: 12px 16px;
    margin-bottom: 16px;
  }
  
  .search-icon {
    width: 20px;
    height: 20px;
    color: var(--text-50);
    margin-right: 12px;
  }
  
  .search-input {
    flex: 1;
    border: none;
    outline: none;
    background: transparent;
    font-size: 16px;
    color: var(--text-90);
  }
  
  .search-input::placeholder {
    color: var(--text-50);
  }
  
  .clear-button, .loading-spinner {
    margin-left: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
  }
  
  .clear-button {
    border: none;
    background: none;
    cursor: pointer;
    color: var(--text-50);
    transition: color 0.2s;
  }
  
  .clear-button:hover {
    color: var(--text-90);
  }
  
  .search-suggestions, .search-history, .search-results, .no-results {
    padding: 16px;
    margin-bottom: 16px;
  }
  
  .search-suggestions h3, .search-history h3, .search-results h3, .no-results h3 {
    margin: 0 0 12px 0;
    font-size: 14px;
    font-weight: 600;
    color: var(--text-75);
  }
  
  .suggestions-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  
  .suggestion-tag {
    padding: 6px 12px;
    border: 1px solid var(--border-color);
    border-radius: 16px;
    background: transparent;
    color: var(--text-75);
    font-size: 12px;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .suggestion-tag:hover {
    background: var(--primary);
    color: white;
    border-color: var(--primary);
  }
  
  .history-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
  }
  
  .clear-history-btn {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 4px 8px;
    border: none;
    background: none;
    color: var(--text-50);
    font-size: 12px;
    cursor: pointer;
    transition: color 0.2s;
  }
  
  .clear-history-btn:hover {
    color: var(--text-75);
  }
  
  .history-list {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  
  .history-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    border: none;
    background: none;
    color: var(--text-75);
    font-size: 14px;
    text-align: left;
    cursor: pointer;
    border-radius: 8px;
    transition: background-color 0.2s;
  }
  
  .history-item:hover {
    background: var(--btn-plain-bg-hover);
  }
  
  .results-header {
    margin-bottom: 16px;
  }
  
  .results-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  
  .result-item {
    display: flex;
    align-items: center;
    padding: 12px;
    border-radius: 8px;
    text-decoration: none;
    color: inherit;
    transition: all 0.2s;
    border: 1px solid transparent;
  }
  
  .result-item:hover, .result-item.selected {
    background: var(--btn-plain-bg-hover);
    border-color: var(--primary);
  }
  
  .result-content {
    flex: 1;
  }
  
  .result-content h4 {
    margin: 0 0 4px 0;
    font-size: 16px;
    font-weight: 600;
    color: var(--text-90);
  }
  
  .result-content p {
    margin: 0 0 8px 0;
    font-size: 14px;
    color: var(--text-75);
    line-height: 1.4;
  }
  
  .result-meta {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  
  .result-type {
    padding: 2px 6px;
    background: var(--primary);
    color: white;
    font-size: 10px;
    border-radius: 4px;
    text-transform: uppercase;
  }
  
  .result-tags {
    display: flex;
    gap: 4px;
  }
  
  .tag {
    font-size: 10px;
    color: var(--text-50);
  }
  
  .result-arrow {
    width: 20px;
    height: 20px;
    color: var(--text-50);
    margin-left: 12px;
  }
  
  .no-results {
    text-align: center;
    padding: 32px 16px;
  }
  
  .no-results-icon {
    width: 48px;
    height: 48px;
    color: var(--text-30);
    margin-bottom: 16px;
  }
  
  .no-results p {
    margin: 8px 0 0 0;
    color: var(--text-50);
    font-size: 14px;
  }
  
  @media (max-width: 768px) {
    .advanced-search-container {
      max-width: 100%;
    }
    
    .search-input-wrapper {
      padding: 10px 14px;
    }
    
    .search-input {
      font-size: 16px; /* 防止iOS缩放 */
    }
  }
</style>