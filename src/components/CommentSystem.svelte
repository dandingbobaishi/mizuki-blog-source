<script lang="ts">
  import { onMount } from 'svelte';
  import Icon from '@iconify/svelte';
  
  export let postId: string;
  export let postTitle: string;
  
  let comments: Comment[] = [];
  let newComment = '';
  let replyTo: string | null = null;
  let isSubmitting = false;
  let sortBy: 'newest' | 'oldest' | 'popular' = 'newest';
  let showEmojiPicker = false;
  
  interface Comment {
    id: string;
    author: string;
    avatar: string;
    content: string;
    timestamp: Date;
    likes: number;
    replies: Comment[];
    isLiked: boolean;
  }
  
  const emojis = ['👍', '❤️', '😂', '😮', '😢', '😡', '🎉', '🔥', '💯', '👏'];
  
  onMount(() => {
    loadComments();
  });
  
  async function loadComments() {
    // 模拟加载评论
    comments = [
      {
        id: '1',
        author: '张三',
        avatar: '/assets/avatars/user1.jpg',
        content: '这篇文章写得很好，学到了很多！',
        timestamp: new Date('2024-01-01'),
        likes: 5,
        replies: [
          {
            id: '1-1',
            author: '李四',
            avatar: '/assets/avatars/user2.jpg',
            content: '同感，作者的见解很独特',
            timestamp: new Date('2024-01-02'),
            likes: 2,
            replies: [],
            isLiked: false
          }
        ],
        isLiked: false
      }
    ];
  }
  
  async function submitComment() {
    if (!newComment.trim() || isSubmitting) return;
    
    isSubmitting = true;
    
    try {
      // 模拟提交评论
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const comment: Comment = {
        id: Date.now().toString(),
        author: '当前用户',
        avatar: '/assets/avatars/current-user.jpg',
        content: newComment,
        timestamp: new Date(),
        likes: 0,
        replies: [],
        isLiked: false
      };
      
      if (replyTo) {
        // 添加回复
        addReply(comments, replyTo, comment);
        replyTo = null;
      } else {
        // 添加新评论
        comments = [comment, ...comments];
      }
      
      newComment = '';
    } catch (error) {
      console.error('提交评论失败:', error);
    } finally {
      isSubmitting = false;
    }
  }
  
  function addReply(commentList: Comment[], parentId: string, reply: Comment) {
    for (let comment of commentList) {
      if (comment.id === parentId) {
        comment.replies.push(reply);
        return true;
      }
      if (comment.replies.length > 0) {
        if (addReply(comment.replies, parentId, reply)) {
          return true;
        }
      }
    }
    return false;
  }
  
  function toggleLike(commentId: string) {
    updateCommentLike(comments, commentId);
    comments = [...comments];
  }
  
  function updateCommentLike(commentList: Comment[], commentId: string) {
    for (let comment of commentList) {
      if (comment.id === commentId) {
        comment.isLiked = !comment.isLiked;
        comment.likes += comment.isLiked ? 1 : -1;
        return true;
      }
      if (comment.replies.length > 0) {
        if (updateCommentLike(comment.replies, commentId)) {
          return true;
        }
      }
    }
    return false;
  }
  
  function startReply(commentId: string, authorName: string) {
    replyTo = commentId;
    newComment = `@${authorName} `;
  }
  
  function cancelReply() {
    replyTo = null;
    newComment = '';
  }
  
  function insertEmoji(emoji: string) {
    newComment += emoji;
    showEmojiPicker = false;
  }
  
  function sortComments() {
    switch (sortBy) {
      case 'newest':
        comments.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
        break;
      case 'oldest':
        comments.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
        break;
      case 'popular':
        comments.sort((a, b) => b.likes - a.likes);
        break;
    }
    comments = [...comments];
  }
  
  function formatTime(date: Date) {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 1) return '刚刚';
    if (minutes < 60) return `${minutes}分钟前`;
    if (hours < 24) return `${hours}小时前`;
    if (days < 7) return `${days}天前`;
    return date.toLocaleDateString();
  }
  
  $: {
    sortComments();
  }
</script>

<div class="comment-system">
  <!-- 评论统计 -->
  <div class="comment-header glass-card">
    <h3>评论 ({comments.length})</h3>
    <div class="comment-controls">
      <select bind:value={sortBy} class="sort-select">
        <option value="newest">最新</option>
        <option value="oldest">最早</option>
        <option value="popular">最热</option>
      </select>
    </div>
  </div>
  
  <!-- 评论输入框 -->
  <div class="comment-input-section glass-card">
    {#if replyTo}
      <div class="reply-indicator">
        <Icon icon="material-symbols:reply" />
        <span>回复评论</span>
        <button on:click={cancelReply} class="cancel-reply">
          <Icon icon="material-symbols:close" />
        </button>
      </div>
    {/if}
    
    <div class="comment-input-wrapper">
      <textarea
        bind:value={newComment}
        placeholder={replyTo ? "写下你的回复..." : "写下你的评论..."}
        class="comment-input"
        rows="3"
      ></textarea>
      
      <div class="input-actions">
        <div class="emoji-section">
          <button
            on:click={() => showEmojiPicker = !showEmojiPicker}
            class="emoji-button"
          >
            <Icon icon="material-symbols:sentiment-satisfied" />
          </button>
          
          {#if showEmojiPicker}
            <div class="emoji-picker">
              {#each emojis as emoji}
                <button
                  on:click={() => insertEmoji(emoji)}
                  class="emoji-item"
                >
                  {emoji}
                </button>
              {/each}
            </div>
          {/if}
        </div>
        
        <button
          on:click={submitComment}
          disabled={!newComment.trim() || isSubmitting}
          class="submit-button"
        >
          {#if isSubmitting}
            <Icon icon="material-symbols:progress-activity" class="animate-spin" />
          {:else}
            <Icon icon="material-symbols:send" />
          {/if}
          {replyTo ? '回复' : '发表'}
        </button>
      </div>
    </div>
  </div>
  
  <!-- 评论列表 -->
  <div class="comment-list">
    {#each comments as comment}
      <div class="comment-item glass-card">
        <div class="comment-avatar">
          <img src={comment.avatar} alt={comment.author} />
        </div>
        
        <div class="comment-content">
          <div class="comment-header">
            <span class="comment-author">{comment.author}</span>
            <span class="comment-time">{formatTime(comment.timestamp)}</span>
          </div>
          
          <div class="comment-text">{comment.content}</div>
          
          <div class="comment-actions">
            <button
              on:click={() => toggleLike(comment.id)}
              class="action-button"
              class:liked={comment.isLiked}
            >
              <Icon icon="material-symbols:thumb-up" />
              {comment.likes}
            </button>
            
            <button
              on:click={() => startReply(comment.id, comment.author)}
              class="action-button"
            >
              <Icon icon="material-symbols:reply" />
              回复
            </button>
          </div>
          
          <!-- 回复列表 -->
          {#if comment.replies.length > 0}
            <div class="replies">
              {#each comment.replies as reply}
                <div class="reply-item">
                  <div class="comment-avatar">
                    <img src={reply.avatar} alt={reply.author} />
                  </div>
                  
                  <div class="comment-content">
                    <div class="comment-header">
                      <span class="comment-author">{reply.author}</span>
                      <span class="comment-time">{formatTime(reply.timestamp)}</span>
                    </div>
                    
                    <div class="comment-text">{reply.content}</div>
                    
                    <div class="comment-actions">
                      <button
                        on:click={() => toggleLike(reply.id)}
                        class="action-button"
                        class:liked={reply.isLiked}
                      >
                        <Icon icon="material-symbols:thumb-up" />
                        {reply.likes}
                      </button>
                      
                      <button
                        on:click={() => startReply(comment.id, reply.author)}
                        class="action-button"
                      >
                        <Icon icon="material-symbols:reply" />
                        回复
                      </button>
                    </div>
                  </div>
                </div>
              {/each}
            </div>
          {/if}
        </div>
      </div>
    {/each}
  </div>
  
  {#if comments.length === 0}
    <div class="no-comments glass-card">
      <Icon icon="material-symbols:chat-bubble-outline" class="no-comments-icon" />
      <h3>暂无评论</h3>
      <p>成为第一个评论的人吧！</p>
    </div>
  {/if}
</div>

<style>
  .comment-system {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px 0;
  }
  
  .comment-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 20px;
    margin-bottom: 20px;
  }
  
  .comment-header h3 {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    color: var(--text-90);
  }
  
  .sort-select {
    padding: 6px 12px;
    border: 1px solid var(--border-color);
    border-radius: 6px;
    background: var(--card-bg);
    color: var(--text-75);
    font-size: 14px;
  }
  
  .comment-input-section {
    padding: 20px;
    margin-bottom: 20px;
  }
  
  .reply-indicator {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    background: var(--primary);
    color: white;
    border-radius: 6px;
    margin-bottom: 12px;
    font-size: 14px;
  }
  
  .cancel-reply {
    margin-left: auto;
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    padding: 2px;
  }
  
  .comment-input-wrapper {
    position: relative;
  }
  
  .comment-input {
    width: 100%;
    padding: 12px;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    background: var(--card-bg);
    color: var(--text-90);
    font-size: 14px;
    line-height: 1.5;
    resize: vertical;
    min-height: 80px;
  }
  
  .comment-input:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(var(--primary-rgb), 0.1);
  }
  
  .input-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 12px;
  }
  
  .emoji-section {
    position: relative;
  }
  
  .emoji-button {
    padding: 8px;
    border: none;
    background: none;
    color: var(--text-50);
    cursor: pointer;
    border-radius: 6px;
    transition: all 0.2s;
  }
  
  .emoji-button:hover {
    background: var(--btn-plain-bg-hover);
    color: var(--text-75);
  }
  
  .emoji-picker {
    position: absolute;
    bottom: 100%;
    left: 0;
    background: var(--card-bg);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    padding: 8px;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 4px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    z-index: 10;
  }
  
  .emoji-item {
    padding: 6px;
    border: none;
    background: none;
    cursor: pointer;
    border-radius: 4px;
    font-size: 16px;
    transition: background-color 0.2s;
  }
  
  .emoji-item:hover {
    background: var(--btn-plain-bg-hover);
  }
  
  .submit-button {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 8px 16px;
    background: var(--primary);
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    transition: all 0.2s;
  }
  
  .submit-button:hover:not(:disabled) {
    background: var(--primary-hover);
    transform: translateY(-1px);
  }
  
  .submit-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  .comment-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  
  .comment-item {
    display: flex;
    gap: 12px;
    padding: 20px;
  }
  
  .comment-avatar img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
  }
  
  .comment-content {
    flex: 1;
  }
  
  .comment-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 8px;
  }
  
  .comment-author {
    font-weight: 600;
    color: var(--text-90);
    font-size: 14px;
  }
  
  .comment-time {
    color: var(--text-50);
    font-size: 12px;
  }
  
  .comment-text {
    color: var(--text-75);
    line-height: 1.6;
    margin-bottom: 12px;
  }
  
  .comment-actions {
    display: flex;
    gap: 16px;
  }
  
  .action-button {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 4px 8px;
    border: none;
    background: none;
    color: var(--text-50);
    cursor: pointer;
    border-radius: 4px;
    font-size: 12px;
    transition: all 0.2s;
  }
  
  .action-button:hover {
    background: var(--btn-plain-bg-hover);
    color: var(--text-75);
  }
  
  .action-button.liked {
    color: var(--primary);
  }
  
  .replies {
    margin-top: 16px;
    padding-left: 20px;
    border-left: 2px solid var(--border-color);
  }
  
  .reply-item {
    display: flex;
    gap: 12px;
    margin-bottom: 16px;
  }
  
  .reply-item .comment-avatar img {
    width: 32px;
    height: 32px;
  }
  
  .no-comments {
    text-align: center;
    padding: 40px 20px;
  }
  
  .no-comments-icon {
    width: 48px;
    height: 48px;
    color: var(--text-30);
    margin-bottom: 16px;
  }
  
  .no-comments h3 {
    margin: 0 0 8px 0;
    color: var(--text-75);
  }
  
  .no-comments p {
    margin: 0;
    color: var(--text-50);
    font-size: 14px;
  }
  
  @media (max-width: 768px) {
    .comment-system {
      padding: 16px;
    }
    
    .comment-header {
      padding: 12px 16px;
    }
    
    .comment-input-section {
      padding: 16px;
    }
    
    .comment-item {
      padding: 16px;
    }
    
    .input-actions {
      flex-direction: column;
      align-items: stretch;
      gap: 12px;
    }
    
    .emoji-section {
      align-self: flex-start;
    }
  }
</style>