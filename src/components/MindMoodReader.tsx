import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Post {
  id: string;
  data: {
    title: string;
    subtitle?: string;
    date: Date;
    mood: string;
    tags: string[];
    excerpt: string;
    cover?: { src: string };
    weiboOriginal?: boolean;
  };
  body: string;
}

interface MindMoodReaderProps {
  posts: Post[];
}

export default function MindMoodReader({ posts }: MindMoodReaderProps) {
  const [index, setIndex] = useState(0);
  
  // 安全检查：确保 posts 存在且不为空
  if (!posts || posts.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No posts available</h3>
          <p className="text-gray-500">Check back later for new content.</p>
        </div>
      </div>
    );
  }
  
  const post = posts[index];

  // 键盘导航
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setIndex((prev) => (prev - 1 + posts.length) % posts.length);
      } else if (e.key === "ArrowRight") {
        setIndex((prev) => (prev + 1) % posts.length);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [posts.length]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[90vh] p-6">
      {/* 左侧预览菜单 */}
      <aside className="lg:col-span-3 bg-white/20 backdrop-blur-lg rounded-2xl p-4 shadow-sm overflow-y-auto border border-violet-100/40 max-h-[40vh] lg:max-h-[80vh] order-2 lg:order-1">
        <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
          <span className="text-xl">📜</span>
          Posts
        </h2>
        <div className="space-y-2">
          {posts.map((p, i) => (
            <motion.button
              key={p.id}
              onClick={() => setIndex(i)}
              className={`block text-left px-3 py-2 rounded-lg transition-all duration-200 w-full ${
                i === index
                  ? "bg-violet-100/60 text-violet-800 font-medium shadow-sm"
                  : "hover:bg-white/30 text-gray-600 hover:text-gray-800"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="text-sm font-medium truncate">{p.data.title}</div>
              <div className="text-xs text-gray-500 mt-1">
                {new Date(p.data.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric"
                })}
              </div>
            </motion.button>
          ))}
        </div>
      </aside>

      {/* 右侧阅读区 */}
      <div className="lg:col-span-9 relative order-1 lg:order-2">
        <AnimatePresence mode="wait">
          <motion.article
            key={post.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="bg-white/60 backdrop-blur-2xl rounded-3xl shadow-lg border border-violet-100/50 p-10 prose prose-lg max-w-none leading-relaxed text-gray-700 dark:text-gray-200"
          >
            {/* 文章头部 */}
            <header className="mb-8">
              <h1 className="text-3xl font-bold text-violet-800 mb-2 font-serif">
                {post.data.title}
              </h1>
              {post.data.subtitle && (
                <p className="text-gray-500 italic mb-4">{post.data.subtitle}</p>
              )}
              <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                <span>
                  {new Date(post.data.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                  })}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  post.data.mood === "Reflective" ? "bg-blue-100 text-blue-700" :
                  post.data.mood === "Hopeful" ? "bg-yellow-100 text-yellow-700" :
                  post.data.mood === "Grateful" ? "bg-pink-100 text-pink-700" :
                  post.data.mood === "Healing" ? "bg-green-100 text-green-700" :
                  post.data.mood === "Contemplative" ? "bg-purple-100 text-purple-700" :
                  "bg-rose-100 text-rose-700"
                }`}>
                  {post.data.mood}
                </span>
                {post.data.weiboOriginal && (
                  <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                    Weibo Original
                  </span>
                )}
              </div>
              <p className="text-gray-600 italic">{post.data.excerpt}</p>
            </header>

            {/* 文章内容 */}
            <div
              dangerouslySetInnerHTML={{ __html: post.body }}
              className="markdown"
            />

            {/* 标签 */}
            {post.data.tags && post.data.tags.length > 0 && (
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex flex-wrap gap-2">
                  {post.data.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-violet-100 text-violet-700 rounded-full text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.article>
        </AnimatePresence>

        {/* 底部导航 */}
        <motion.div 
          className="flex justify-between items-center mt-6 text-sm text-gray-500"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <motion.button
            onClick={() => setIndex((index - 1 + posts.length) % posts.length)}
            className="hover:text-violet-700 transition-colors duration-200 flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-violet-50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ← Prev
          </motion.button>
          
          <div className="flex items-center gap-2">
            <span className="font-medium">{index + 1}</span>
            <span className="text-gray-400">/</span>
            <span className="font-medium">{posts.length}</span>
          </div>
          
          <motion.button
            onClick={() => setIndex((index + 1) % posts.length)}
            className="hover:text-violet-700 transition-colors duration-200 flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-violet-50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Next →
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
