"use client";

import { useTournament } from '@/components/TournamentContext';

export default function GalleryPage() {
  const { photos } = useTournament();

  return (
    <main className="container" style={{ paddingTop: '64px', paddingBottom: '64px' }}>
      <div style={{ marginBottom: '48px', borderBottom: '1px solid var(--outline-variant)', paddingBottom: '24px' }}>
        <h1 className="display-lg" style={{ color: 'var(--primary)', textTransform: 'uppercase' }}>Photo Gallery</h1>
        <p className="body-lg" style={{ color: 'var(--on-surface-variant)', marginTop: '16px', maxWidth: '600px' }}>
          Explore the best moments, celebrations, and intense action from the KYC Super League.
        </p>
      </div>

      {photos.length === 0 ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px', background: 'var(--surface-container)', border: '1px dashed var(--outline-variant)' }}>
          <p className="headline-md" style={{ color: 'var(--on-surface-variant)' }}>No photos uploaded yet.</p>
        </div>
      ) : (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
          gap: '24px',
          alignItems: 'start'
        }}>
          {photos.map(photo => (
            <div key={photo.id} className="card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <img 
                src={photo.url} 
                alt={photo.caption || 'Gallery photo'} 
                style={{ 
                  width: '100%', 
                  height: '250px', 
                  objectFit: 'cover',
                  transition: 'transform 0.3s ease'
                }} 
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              />
              {photo.caption && (
                <div style={{ padding: '16px', background: 'var(--surface-container-high)', borderTop: '1px solid var(--outline-variant)' }}>
                  <p className="body-md" style={{ color: 'var(--on-surface)' }}>{photo.caption}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
