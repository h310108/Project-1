import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Instagram, Facebook, AtSign, Send, Music } from 'lucide-react';

// --- Types ---
interface Post {
  id: string;
  title: string;
  text: string;
  date: string;
  location?: string;
}

// --- Components ---
const Navigation = () => {
  const location = useLocation();
  
  return (
    <header className="w-full py-10 px-8 flex flex-col md:flex-row justify-between items-center border-b border-white/5 mb-16 sticky top-0 z-50 bg-[#0A0A0A]/80 backdrop-blur-md">
      <Link to="/" className="mb-6 md:mb-0 group">
        <span className="font-serif font-bold text-4xl tracking-[-0.05em] text-[#E5E5E5] group-hover:text-[#800000] transition-colors">NOIR.</span>
      </Link>
      <nav className="flex gap-12 font-sans text-[10px] tracking-[0.4em] uppercase font-medium">
        <Link to="/" className={`transition-all duration-700 ${location.pathname === '/' ? 'text-[#E5E5E5] border-b border-[#800000] pb-1' : 'text-[#A0A0A0] hover:text-[#E5E5E5]'}`}>About</Link>
        <Link to="/interests" className={`transition-all duration-700 ${location.pathname === '/interests' ? 'text-[#E5E5E5] border-b border-[#800000] pb-1' : 'text-[#A0A0A0] hover:text-[#E5E5E5]'}`}>Interests</Link>
        <Link to="/feed" className={`transition-all duration-700 ${location.pathname === '/feed' ? 'text-[#E5E5E5] border-b border-[#800000] pb-1' : 'text-[#A0A0A0] hover:text-[#E5E5E5]'}`}>Journal</Link>
      </nav>
    </header>
  );
};

const PostModal = ({ post, onClose }: { post: Post | null; onClose: () => void }) => {
  if (!post) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 bg-black/95 backdrop-blur-xl"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="max-w-5xl w-full bg-[#121212] border border-white/10 overflow-hidden shadow-[0_0_100px_rgba(0,0,0,1)] flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full md:w-3/5 aspect-video md:aspect-auto bg-black flex items-center justify-center overflow-hidden">
          <img 
            src={`https://picsum.photos/seed/noir-post-${post.id}/1200/1600`} 
            alt={post.title} 
            className="w-full h-full object-cover noir-image opacity-80"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="w-full md:w-2/5 p-8 md:p-12 flex flex-col justify-between bg-black/40 relative">
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 text-[#A0A0A0] hover:text-white transition-colors"
          >
            CLOSE [X]
          </button>
          
          <div>
            <div className="flex items-center gap-4 text-[9px] tracking-[0.4em] text-[#800000] uppercase font-mono mb-8">
              <span>Scene #{post.id.slice(-4)}</span>
              <span className="w-8 h-[1px] bg-[#800000]/30"></span>
              <span>{post.date}</span>
            </div>
            
            <h2 className="font-serif text-4xl md:text-5xl text-[#E5E5E5] mb-8 leading-tight tracking-tighter">
              {post.title}
            </h2>
            
            <div className="space-y-6 text-[#A0A0A0] font-sans leading-relaxed">
              <p className="text-lg whitespace-pre-wrap">
                {post.text}
              </p>
              <div className="accent-line opacity-20 my-8"></div>
              <p className="text-xs tracking-widest uppercase text-[#444]">
                Location: {post.location || 'Unknown Studio'}
              </p>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-white/5 flex justify-between items-end">
            <div className="text-[8px] tracking-[0.5em] uppercase text-[#333]">
              Noir Production <br/> Still Archive
            </div>
            <div className="font-serif italic text-xs text-[#666]">
              Film No. {post.id.slice(0, 6)}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const CinematicFooter = () => (
  <footer className="cinematic-footer mt-32">
    <div className="max-w-6xl mx-auto flex flex-col items-center gap-16">
      <div className="flex justify-center gap-12">
        <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="studio-logo">
          <Instagram size={20} strokeWidth={1.5} />
        </a>
        <a href="https://www.facebook.com/?locale=zh_TW" target="_blank" rel="noopener noreferrer" className="studio-logo">
          <Facebook size={20} strokeWidth={1.5} />
        </a>
        <a href="https://www.threads.com/?hl=zh-tw" target="_blank" rel="noopener noreferrer" className="studio-logo">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/9/9d/Threads_%28app%29_logo.svg" 
            alt="Threads" 
            className="w-5 h-5 invert opacity-80 hover:opacity-100 transition-opacity" 
            referrerPolicy="no-referrer"
          />
        </a>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-20 text-[9px] tracking-[0.6em] uppercase text-[#444]">
        <div className="flex flex-col gap-3">
          <span className="text-[#666]">Directed By</span>
          <span className="text-[#A0A0A0]">Brian</span>
        </div>
        <div className="flex flex-col gap-3">
          <span className="text-[#666]">Produced By</span>
          <span className="text-[#A0A0A0]">Life Experiences</span>
        </div>
        <div className="flex flex-col gap-3">
          <span className="text-[#666]">Cinematography</span>
          <span className="text-[#A0A0A0]">Daily Observations</span>
        </div>
      </div>

      <div className="text-[8px] tracking-[1em] uppercase text-[#333] mt-10">
        <p>© 2026 Noir Productions / All Rights Reserved</p>
      </div>
    </div>
  </footer>
);

// --- Pages ---
const Home = () => {
  return (
    <div className="max-w-6xl mx-auto px-6">
      {/* Hero Section - Movie Poster Style */}
      <section className="poster-grid mb-40">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative group"
        >
          <div className="aspect-[3/4] overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
            <img 
              src="https://picsum.photos/seed/noir-hero/800/1000" 
              alt="Noir Portrait" 
              className="w-full h-full object-cover noir-image"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute top-4 left-4 text-[8px] tracking-[0.5em] text-white/20 uppercase font-mono">
            Scene 01 / Take 42
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
          className="flex flex-col"
        >
          <h2 className="text-[#800000] font-serif tracking-[0.8em] uppercase text-[10px] mb-10">Featured Presentation</h2>
          <h1 className="font-serif text-6xl md:text-8xl mb-12 leading-[0.8] text-[#E5E5E5] tracking-tighter">
            Hello, I am Brian
          </h1>
          <div className="note-box mb-12">
            <p className="text-2xl mb-4 text-[#E5E5E5]">Finding truth between frames.</p>
          </div>
          <div className="accent-line mb-12 opacity-30"></div>
          <p className="text-[10px] tracking-[0.3em] uppercase leading-loose text-[#666] max-w-sm">
            Capturing the shadows between the light. Finding the narrative in the mundane.
          </p>
        </motion.div>
      </section>

      {/* About Me Section - Personal Note Style */}
      <section className="mb-40 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="font-serif text-4xl mb-12 text-[#E5E5E5]">About Me</h2>
          <div className="space-y-8 text-lg leading-relaxed text-[#A0A0A0] font-sans">
            <p>
              I am a photographer and designer, documenting the rhythm of life.
            </p>
            <p className="italic">
              Loving photography, design, and documenting life.
            </p>
            <p>
              This is not a portfolio, nor a resume. It is a record of my observations of this world.
              Between the black and white, I try to find the details that have been forgotten.
            </p>
          </div>
          <div className="silver-line mt-16 opacity-20"></div>
        </motion.div>
      </section>
    </div>
  );
};

const InterestsPage = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 pb-32">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="mb-32 text-center"
      >
        <h2 className="font-serif text-6xl mb-6 text-[#E5E5E5] tracking-widest">Interests</h2>
        <p className="text-[#800000] tracking-[0.8em] uppercase text-[9px] mb-20">Personal Soundtrack</p>
      </motion.div>

      {/* Music Interests Section - Soundtrack Style */}
      <section className="mb-40">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-6 mb-16">
            <div className="w-12 h-[1px] bg-[#800000]"></div>
            <h2 className="font-serif text-4xl text-[#E5E5E5] tracking-tight">Soundtrack</h2>
            <span className="text-[9px] tracking-[0.5em] uppercase text-[#444] font-mono">Top 10 Selections</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-12">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="group flex items-baseline gap-6 border-b border-white/5 pb-6 hover:border-[#800000] transition-colors">
                <span className="font-mono text-[10px] text-[#333] group-hover:text-[#800000] transition-colors">
                  {(i + 1).toString().padStart(2, '0')}
                </span>
                <div className="flex flex-col gap-1 flex-1">
                  <span className="font-sans text-[11px] tracking-[0.3em] uppercase text-[#666] group-hover:text-[#A0A0A0] transition-colors">
                    Artist Name
                  </span>
                  <a 
                    href="#" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-serif text-2xl text-[#E5E5E5] hover:text-[#800000] transition-colors inline-flex items-center gap-3"
                  >
                    Song Title
                    <Music size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-20 text-center">
            <p className="text-[9px] tracking-[0.4em] uppercase text-[#333] font-mono italic">
              "Music is the shorthand of emotion." — Leo Tolstoy
            </p>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

const FeedPage = ({ posts, newPostText, setNewPostText, handlePost, onPostClick }: any) => {
  return (
    <div className="max-w-4xl mx-auto px-6 pb-32">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="mb-32 text-center"
      >
        <h2 className="font-serif text-6xl mb-6 text-[#E5E5E5] tracking-widest">Journal</h2>
        <p className="text-[#800000] tracking-[0.8em] uppercase text-[9px] mb-20">Daily Observations</p>
        
        <div className="max-w-2xl mx-auto bg-white/5 p-12 border border-white/5 backdrop-blur-sm">
          <textarea 
            className="w-full bg-transparent border-none focus:ring-0 font-sans text-[#E5E5E5] resize-none h-40 text-xl leading-relaxed placeholder:text-[#333]"
            placeholder="Capture a moment..."
            value={newPostText}
            onChange={(e) => setNewPostText(e.target.value)}
          />
          <div className="flex justify-center mt-10">
            <button 
              className="bg-[#E5E5E5] text-black px-16 py-4 font-sans text-[10px] tracking-[0.5em] uppercase hover:bg-[#800000] hover:text-white transition-all flex items-center gap-4"
              onClick={handlePost}
            >
              <Send size={14} />
              Post
            </button>
          </div>
        </div>
      </motion.div>

      <div className="space-y-32">
        {posts.length === 0 ? (
          <p className="text-center text-[#444] font-serif italic tracking-widest">No entries yet.</p>
        ) : (
          posts.map((post: Post, index: number) => (
            <motion.div 
              key={post.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center cursor-pointer group"
              onClick={() => onPostClick(post)}
            >
              <div className={`border border-white/5 p-2 bg-black/40 transition-all duration-500 group-hover:border-[#800000]/50 ${index % 2 !== 0 ? 'md:order-2' : ''}`}>
                <img 
                  src={`https://picsum.photos/seed/noir-post-${post.id}/800/600`} 
                  alt="Post visual" 
                  className="w-full h-full object-cover noir-image"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex flex-col gap-8">
                <div className="flex items-center gap-4 text-[9px] tracking-[0.4em] text-[#444] uppercase font-mono">
                  <span>Entry #{post.id.slice(-4)}</span>
                  <span className="w-10 h-[1px] bg-[#333]"></span>
                  <span>{post.date}</span>
                </div>
                <h3 className="font-serif text-3xl text-[#E5E5E5] group-hover:text-[#800000] transition-colors">
                  {post.title}
                </h3>
                <p className="font-sans text-lg leading-relaxed text-[#A0A0A0] whitespace-pre-wrap line-clamp-3">
                  {post.text}
                </p>
                <div className="text-[8px] tracking-[0.3em] uppercase text-[#800000] opacity-0 group-hover:opacity-100 transition-opacity">
                  View Full Script
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

// --- Main App ---
export default function App() {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      title: 'Light and Shadow',
      text: 'Captured a moment of light and shadow. Between the frames, I saw the passage of time.',
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      location: 'Old Town Square'
    }
  ]);
  const [newPostText, setNewPostText] = useState("");
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const handlePost = () => {
    if (!newPostText.trim()) return;
    const newPost: Post = {
      id: Date.now().toString(),
      title: newPostText.split('\n')[0].slice(0, 30) + (newPostText.length > 30 ? '...' : ''),
      text: newPostText,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      location: 'Studio A'
    };
    setPosts([newPost, ...posts]);
    setNewPostText("");
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col relative bg-[#0A0A0A]">
        {/* Film Grain Overlay */}
        <div className="film-grain"></div>
        
        <Navigation />
        <main className="flex-1 w-full relative z-10">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/interests" element={<InterestsPage />} />
              <Route path="/feed" element={
                <FeedPage 
                  posts={posts} 
                  newPostText={newPostText} 
                  setNewPostText={setNewPostText} 
                  handlePost={handlePost} 
                  onPostClick={setSelectedPost}
                />
              } />
            </Routes>
          </AnimatePresence>
        </main>
        <CinematicFooter />

        <AnimatePresence>
          {selectedPost && (
            <PostModal 
              post={selectedPost} 
              onClose={() => setSelectedPost(null)} 
            />
          )}
        </AnimatePresence>
      </div>
    </BrowserRouter>
  );
}
