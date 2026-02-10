
import React, { useState, useRef } from 'react';
// Added AlertCircle to the imports to fix "Cannot find name" error
import { Camera, Upload, Send, RefreshCw, Download, Sparkles, Wand2, Trash2, AlertCircle } from 'lucide-react';
import { editImageWithGemini } from '../services/geminiService';

interface ImageAIEditorProps {
  isSubscribed: boolean;
}

const ImageAIEditor: React.FC<ImageAIEditorProps> = ({ isSubscribed }) => {
  const [sourceImage, setSourceImage] = useState<string | null>(null);
  const [editedImage, setEditedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSourceImage(event.target?.result as string);
        setEditedImage(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProcessImage = async () => {
    if (!sourceImage || !prompt || !isSubscribed) return;
    
    setLoading(true);
    setError(null);
    try {
      const mimeType = sourceImage.substring(sourceImage.indexOf(':') + 1, sourceImage.indexOf(';'));
      const result = await editImageWithGemini(sourceImage, mimeType, prompt);
      if (result) {
        setEditedImage(result);
      } else {
        setError("AI couldn't process the request. Please try a different prompt.");
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const clear = () => {
    setSourceImage(null);
    setEditedImage(null);
    setPrompt('');
    setError(null);
  };

  if (!isSubscribed) {
    return (
      <div className="p-8 flex flex-col items-center justify-center text-center min-h-[60vh]">
        <div className="bg-slate-100 p-6 rounded-full mb-6">
          <Wand2 className="w-12 h-12 text-slate-400" />
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-2">Premium Feature</h3>
        <p className="text-sm text-slate-500 mb-6">
          Advanced AI Image editing requires a subscription. Activate for just <span className="font-bold">Rs. 20/month</span> to access this and real-time disaster alerts.
        </p>
        <button className="bg-orange-600 text-white font-bold px-8 py-3 rounded-full shadow-lg">
          Get Started Now
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center mb-2 px-1">
        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-500" />
          AI Photo Assistant
        </h3>
        {sourceImage && (
          <button onClick={clear} className="text-xs font-bold text-red-500 flex items-center gap-1">
            <Trash2 className="w-3 h-3" /> Clear
          </button>
        )}
      </div>

      {/* Preview Area */}
      <div className="relative aspect-[4/3] bg-slate-100 rounded-3xl overflow-hidden border-2 border-dashed border-slate-200 flex items-center justify-center group">
        {!sourceImage ? (
          <div className="text-center p-8">
            <div className="bg-white w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm text-indigo-600">
              <Upload className="w-8 h-8" />
            </div>
            <p className="text-sm font-bold text-slate-600 mb-1">No Photo Selected</p>
            <p className="text-xs text-slate-400">Upload an image to start editing with AI</p>
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="mt-6 bg-white text-slate-800 font-bold px-6 py-2 rounded-full border border-slate-200 shadow-sm hover:bg-slate-50 active:scale-95 transition-all"
            >
              Select Image
            </button>
          </div>
        ) : (
          <img 
            src={editedImage || sourceImage} 
            alt="Source" 
            className="w-full h-full object-contain bg-slate-200"
          />
        )}
        
        {loading && (
          <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex flex-col items-center justify-center">
            <RefreshCw className="w-10 h-10 text-indigo-600 animate-spin mb-3" />
            <p className="text-sm font-bold text-slate-800">AI is working...</p>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">Applying instructions</p>
          </div>
        )}
      </div>

      {/* Input controls */}
      {sourceImage && (
        <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 transition-all">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Edit Instructions</label>
            <textarea 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. Add a retro filter, remove the background, or make it look like a rainy day..."
              className="w-full resize-none border-none focus:ring-0 text-sm p-0 min-h-[80px]"
            />
            <div className="flex justify-between items-center mt-2 pt-2 border-t border-slate-100">
              <div className="flex gap-2">
                 <button className="text-[10px] bg-slate-100 px-2 py-1 rounded-md text-slate-600 font-bold hover:bg-slate-200 transition-colors" onClick={() => setPrompt("Convert into a black and white sketch")}>Sketch</button>
                 <button className="text-[10px] bg-slate-100 px-2 py-1 rounded-md text-slate-600 font-bold hover:bg-slate-200 transition-colors" onClick={() => setPrompt("Change background to a scenic Sri Lankan beach")}>Beach</button>
              </div>
              <button 
                onClick={handleProcessImage}
                disabled={loading || !prompt}
                className={`flex items-center gap-2 px-6 py-2 rounded-full font-bold shadow-lg transition-all active:scale-95 ${loading || !prompt ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-indigo-600 text-white shadow-indigo-200'}`}
              >
                <Send className="w-4 h-4" />
                Generate
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 text-xs p-3 rounded-xl border border-red-100 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <p>{error}</p>
            </div>
          )}

          {editedImage && (
            <button 
              className="w-full bg-slate-800 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all"
              onClick={() => {
                const link = document.createElement('a');
                link.href = editedImage;
                link.download = 'edited_image.png';
                link.click();
              }}
            >
              <Download className="w-5 h-5" />
              Download Edited Photo
            </button>
          )}
        </div>
      )}

      <input 
        type="file" 
        accept="image/*" 
        className="hidden" 
        ref={fileInputRef} 
        onChange={handleFileUpload} 
      />
    </div>
  );
};

export default ImageAIEditor;
