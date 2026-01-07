<script lang="ts">
  import { onMount } from 'svelte';
  import { Icon } from '@iconify/svelte';
  
  let isOpen = false;
  let currentTheme = 'auto';
  let primaryColor = 230;
  let fontSize = 16;
  let borderRadius = 12;
  let animationSpeed = 'normal';
  let backgroundPattern = 'none';
  
  const themes = [
    { id: 'light', name: '浅色', icon: 'material-symbols:light-mode' },
    { id: 'dark', name: '深色', icon: 'material-symbols:dark-mode' },
    { id: 'auto', name: '自动', icon: 'material-symbols:brightness-auto' }
  ];
  
  const colorPresets = [
    { name: '蓝色', hue: 230, color: '#3b82f6' },
    { name: '紫色', hue: 270, color: '#8b5cf6' },
    { name: '粉色', hue: 330, color: '#ec4899' },
    { name: '绿色', hue: 150, color: '#10b981' },
    { name: '橙色', hue: 30, color: '#f59e0b' },
    { name: '红色', hue: 0, color: '#ef4444' }
  ];
  
  const backgroundPatterns = [
    { id: 'none', name: '无' },
    { id: 'dots', name: '圆点' },
    { id: 'grid', name: '网格' },
    { id: 'waves', name: '波浪' },
    { id: 'geometric', name: '几何' }
  ];
  
  onMount(() => {
    loadSettings();
    applySettings();
  });
  
  function loadSettings() {
    const saved = localStorage.getItem('theme-settings');
    if (saved) {
      const settings = JSON.parse(saved);
      currentTheme = settings.theme || 'auto';
      primaryColor = settings.primaryColor || 230;
      fontSize = settings.fontSize || 16;
      borderRadius = settings.borderRadius || 12;
      animationSpeed = settings.animationSpeed || 'normal';
      backgroundPattern = settings.backgroundPattern || 'none';
    }
  }
  
  function saveSettings() {
    const settings = {
      theme: currentTheme,
      primaryColor,
      fontSize,
      borderRadius,
      animationSpeed,
      backgroundPattern
    };
    localStorage.setItem('theme-settings', JSON.stringify(settings));
  }
  
  function applySettings() {
    const root = document.documentElement;
    
    // 应用主题
    if (currentTheme === 'auto') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.classList.toggle('dark', prefersDark);
    } else {
      root.classList.toggle('dark', currentTheme === 'dark');
    }
    
    // 应用颜色
    root.style.setProperty('--hue', primaryColor.toString());
    
    // 应用字体大小
    root.style.setProperty('--base-font-size', `${fontSize}px`);
    
    // 应用圆角
    root.style.setProperty('--radius-large', `${borderRadius}px`);
    root.style.setProperty('--radius-medium', `${borderRadius * 0.75}px`);
    root.style.setProperty('--radius-small', `${borderRadius * 0.5}px`);
    
    // 应用动画速度
    const speedMultiplier = {
      'slow': 1.5,
      'normal': 1,
      'fast': 0.5
    }[animationSpeed] || 1;
    
    root.style.setProperty('--animation-speed', speedMultiplier.toString());
    
    // 应用背景图案
    applyBackgroundPattern();
    
    saveSettings();
  }
  
  function applyBackgroundPattern() {
    const body = document.body;
    body.className = body.className.replace(/bg-pattern-\w+/g, '');
    
    if (backgroundPattern !== 'none') {
      body.classList.add(`bg-pattern-${backgroundPattern}`);
    }
  }
  
  function resetToDefaults() {
    currentTheme = 'auto';
    primaryColor = 230;
    fontSize = 16;
    borderRadius = 12;
    animationSpeed = 'normal';
    backgroundPattern = 'none';
    applySettings();
  }
  
  function exportSettings() {
    const settings = {
      theme: currentTheme,
      primaryColor,
      fontSize,
      borderRadius,
      animationSpeed,
      backgroundPattern
    };
    
    const blob = new Blob([JSON.stringify(settings, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'theme-settings.json';
    a.click();
    URL.revokeObjectURL(url);
  }
  
  function importSettings(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const settings = JSON.parse(e.target?.result as string);
        currentTheme = settings.theme || 'auto';
        primaryColor = settings.primaryColor || 230;
        fontSize = settings.fontSize || 16;
        borderRadius = settings.borderRadius || 12;
        animationSpeed = settings.animationSpeed || 'normal';
        backgroundPattern = settings.backgroundPattern || 'none';
        applySettings();
      } catch (error) {
        alert('导入失败：文件格式不正确');
      }
    };
    reader.readAsText(file);
  }
  
  $: if (typeof window !== 'undefined') {
    applySettings();
  }
</script>

<!-- 主题定制器按钮 -->
<button
  on:click={() => isOpen = !isOpen}
  class="theme-customizer-trigger glass-card"
  aria-label="主题定制"
>
  <Icon icon="material-symbols:palette" class="w-5 h-5" />
</button>

<!-- 主题定制器面板 -->
{#if isOpen}
  <div class="theme-customizer-overlay" on:click={() => isOpen = false}>
    <div class="theme-customizer-panel glass-card" on:click|stopPropagation>
      <div class="panel-header">
        <h2>主题定制</h2>
        <button on:click={() => isOpen = false} class="close-button">
          <Icon icon="material-symbols:close" />
        </button>
      </div>
      
      <div class="panel-content">
        <!-- 主题选择 -->
        <div class="setting-group">
          <h3>主题模式</h3>
          <div class="theme-options">
            {#each themes as theme}
              <button
                on:click={() => currentTheme = theme.id}
                class="theme-option"
                class:active={currentTheme === theme.id}
              >
                <Icon icon={theme.icon} />
                <span>{theme.name}</span>
              </button>
            {/each}
          </div>
        </div>
        
        <!-- 主色调 -->
        <div class="setting-group">
          <h3>主色调</h3>
          <div class="color-presets">
            {#each colorPresets as preset}
              <button
                on:click={() => primaryColor = preset.hue}
                class="color-preset"
                class:active={primaryColor === preset.hue}
                style="background-color: {preset.color}"
                title={preset.name}
              ></button>
            {/each}
          </div>
          <div class="color-slider">
            <input
              type="range"
              min="0"
              max="360"
              bind:value={primaryColor}
              class="slider"
            />
            <span class="slider-value">色相: {primaryColor}°</span>
          </div>
        </div>
        
        <!-- 字体大小 -->
        <div class="setting-group">
          <h3>字体大小</h3>
          <div class="font-size-controls">
            <input
              type="range"
              min="12"
              max="20"
              bind:value={fontSize}
              class="slider"
            />
            <span class="slider-value">{fontSize}px</span>
          </div>
        </div>
        
        <!-- 圆角大小 -->
        <div class="setting-group">
          <h3>圆角大小</h3>
          <div class="border-radius-controls">
            <input
              type="range"
              min="0"
              max="24"
              bind:value={borderRadius}
              class="slider"
            />
            <span class="slider-value">{borderRadius}px</span>
          </div>
        </div>
        
        <!-- 动画速度 -->
        <div class="setting-group">
          <h3>动画速度</h3>
          <div class="animation-speed-options">
            <button
              on:click={() => animationSpeed = 'slow'}
              class="speed-option"
              class:active={animationSpeed === 'slow'}
            >
              慢速
            </button>
            <button
              on:click={() => animationSpeed = 'normal'}
              class="speed-option"
              class:active={animationSpeed === 'normal'}
            >
              正常
            </button>
            <button
              on:click={() => animationSpeed = 'fast'}
              class="speed-option"
              class:active={animationSpeed === 'fast'}
            >
              快速
            </button>
          </div>
        </div>
        
        <!-- 背景图案 -->
        <div class="setting-group">
          <h3>背景图案</h3>
          <div class="pattern-options">
            {#each backgroundPatterns as pattern}
              <button
                on:click={() => backgroundPattern = pattern.id}
                class="pattern-option"
                class:active={backgroundPattern === pattern.id}
              >
                {pattern.name}
              </button>
            {/each}
          </div>
        </div>
        
        <!-- 操作按钮 -->
        <div class="setting-group">
          <div class="action-buttons">
            <button on:click={resetToDefaults} class="action-button secondary">
              <Icon icon="material-symbols:refresh" />
              重置
            </button>
            <button on:click={exportSettings} class="action-button secondary">
              <Icon icon="material-symbols:download" />
              导出
            </button>
            <label class="action-button secondary">
              <Icon icon="material-symbols:upload" />
              导入
              <input
                type="file"
                accept=".json"
                on:change={importSettings}
                style="display: none;"
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  .theme-customizer-trigger {
    position: fixed;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
    width: 48px;
    height: 48px;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    z-index: 1000;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-75);
  }
  
  .theme-customizer-trigger:hover {
    transform: translateY(-50%) scale(1.1);
    color: var(--primary);
  }
  
  .theme-customizer-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(4px);
    z-index: 1001;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
  }
  
  .theme-customizer-panel {
    width: 100%;
    max-width: 480px;
    max-height: 90vh;
    overflow-y: auto;
    border-radius: 16px;
  }
  
  .panel-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 24px;
    border-bottom: 1px solid var(--border-color);
  }
  
  .panel-header h2 {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    color: var(--text-90);
  }
  
  .close-button {
    width: 32px;
    height: 32px;
    border: none;
    background: none;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-50);
    transition: all 0.2s;
  }
  
  .close-button:hover {
    background: var(--btn-plain-bg-hover);
    color: var(--text-75);
  }
  
  .panel-content {
    padding: 24px;
  }
  
  .setting-group {
    margin-bottom: 32px;
  }
  
  .setting-group:last-child {
    margin-bottom: 0;
  }
  
  .setting-group h3 {
    margin: 0 0 16px 0;
    font-size: 14px;
    font-weight: 600;
    color: var(--text-75);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  
  .theme-options {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
  }
  
  .theme-option {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 16px 12px;
    border: 2px solid var(--border-color);
    border-radius: 8px;
    background: var(--card-bg);
    cursor: pointer;
    transition: all 0.2s;
    font-size: 12px;
    color: var(--text-75);
  }
  
  .theme-option:hover {
    border-color: var(--primary);
  }
  
  .theme-option.active {
    border-color: var(--primary);
    background: rgba(var(--primary-rgb), 0.1);
    color: var(--primary);
  }
  
  .color-presets {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 8px;
    margin-bottom: 16px;
  }
  
  .color-preset {
    width: 40px;
    height: 40px;
    border: 3px solid transparent;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .color-preset:hover {
    transform: scale(1.1);
  }
  
  .color-preset.active {
    border-color: var(--text-90);
    transform: scale(1.1);
  }
  
  .color-slider, .font-size-controls, .border-radius-controls {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  
  .slider {
    flex: 1;
    height: 6px;
    border-radius: 3px;
    background: var(--border-color);
    outline: none;
    -webkit-appearance: none;
  }
  
  .slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: var(--primary);
    cursor: pointer;
    border: 2px solid white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
  
  .slider::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: var(--primary);
    cursor: pointer;
    border: 2px solid white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
  
  .slider-value {
    font-size: 12px;
    color: var(--text-50);
    min-width: 60px;
    text-align: right;
  }
  
  .animation-speed-options, .pattern-options {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
  }
  
  .speed-option, .pattern-option {
    padding: 12px;
    border: 2px solid var(--border-color);
    border-radius: 6px;
    background: var(--card-bg);
    cursor: pointer;
    transition: all 0.2s;
    font-size: 12px;
    color: var(--text-75);
    text-align: center;
  }
  
  .speed-option:hover, .pattern-option:hover {
    border-color: var(--primary);
  }
  
  .speed-option.active, .pattern-option.active {
    border-color: var(--primary);
    background: rgba(var(--primary-rgb), 0.1);
    color: var(--primary);
  }
  
  .action-buttons {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
  }
  
  .action-button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    padding: 12px;
    border: 2px solid var(--border-color);
    border-radius: 6px;
    background: var(--card-bg);
    cursor: pointer;
    transition: all 0.2s;
    font-size: 12px;
    color: var(--text-75);
    text-decoration: none;
  }
  
  .action-button:hover {
    border-color: var(--primary);
    color: var(--primary);
  }
  
  .action-button.secondary {
    border-color: var(--border-color);
  }
  
  @media (max-width: 768px) {
    .theme-customizer-trigger {
      right: 16px;
      width: 44px;
      height: 44px;
    }
    
    .theme-customizer-overlay {
      padding: 16px;
    }
    
    .panel-header {
      padding: 16px 20px;
    }
    
    .panel-content {
      padding: 20px;
    }
    
    .color-presets {
      grid-template-columns: repeat(3, 1fr);
    }
    
    .color-preset {
      width: 36px;
      height: 36px;
    }
  }
</style>