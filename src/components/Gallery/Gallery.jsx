import GalleryCard from './GalleryCard/GalleryCard';
import './Gallery.scss';

function Gallery({ paintings, searchQuery }) {
  if (!paintings || paintings.length === 0) {
    return (
      <div className="container">
        {searchQuery.trim() !== ''
          ? `По запросу "${searchQuery}" ничего не найдено`
          : 'Нет картин для отображения'}
      </div>
    );
  }

  return (
    <div className="container">
      <div className="gallery">
        {paintings.map((painting) => (
          <GalleryCard
            key={painting.id || painting.title}
            title={painting.title}
            year={painting.year}
            artist={painting.artist}
            location={painting.location}
            imageUrl={painting.imageUrl}
          />
        ))}
      </div>
    </div>
  );
}

export default Gallery;