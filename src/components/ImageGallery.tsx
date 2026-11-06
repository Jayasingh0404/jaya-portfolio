import React, { useState } from 'react';
import { ProjectImage } from '../types';
import { Lightbox } from './Lightbox';
import { Image as ImageIcon, Eye, Star, UploadCloud } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Props {
  images: ProjectImage[];
  projectTitle: string;
  projectId: string;
}

export const ImageGallery: React.FC<Props> = ({ images, projectTitle, projectId }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  if (!images || images.length === 0) {
    return (
      <div className="rounded-2xl p-8 bg-slate-50 dark:bg-[#0c1322] border border-dashed border-slate-300 dark:border-white/10 text-center flex flex-col items-center justify-center">
        <div className="w-12 h-12 rounded-xl bg-slate-200 dark:bg-white/5 flex items-center justify-center text-slate-400 mb-3">
          <ImageIcon className="w-6 h-6" />
        </div>
        <h5 className="font-semibold text-sm text-slate-800 dark:text-slate-200 mb-1">
          No live screenshots published yet
        </h5>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mb-4">
          You can upload project screenshots anytime via the secure Admin Dashboard without code changes.
        </p>
        <Link
          to={`/admin?project=${projectId}`}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold transition-colors"
        >
          <UploadCloud className="w-3.5 h-3.5" />
          Manage & Upload Screenshots
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((img, idx) => (
          <div
            key={img.id}
            onClick={() => openLightbox(idx)}
            className="group relative aspect-video rounded-xl overflow-hidden bg-slate-900 border border-slate-200 dark:border-white/10 cursor-pointer shadow-sm hover:shadow-lg transition-all"
          >
            <img
              src={img.imageUrl}
              alt={img.altText || img.caption || `${projectTitle} screenshot`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />

            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3 text-white">
              <div className="flex justify-end">
                <span className="p-1.5 rounded-lg bg-white/20 backdrop-blur-md">
                  <Eye className="w-4 h-4" />
                </span>
              </div>
              <div>
                <p className="text-xs font-semibold line-clamp-1">
                  {img.caption || img.imageName}
                </p>
                {img.isCover && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono text-amber-400 mt-1">
                    <Star className="w-3 h-3 fill-amber-400" />
                    Cover Photo
                  </span>
                )}
              </div>
            </div>

            {/* Badge for cover image if not hovered */}
            {img.isCover && (
              <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md border border-amber-400/30 text-[10px] font-mono font-medium text-amber-300 flex items-center gap-1 group-hover:opacity-0 transition-opacity">
                <Star className="w-2.5 h-2.5 fill-amber-300" />
                Cover
              </span>
            )}
          </div>
        ))}
      </div>

      <Lightbox
        images={images}
        currentIndex={currentIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onSelectIndex={setCurrentIndex}
      />
    </div>
  );
};

