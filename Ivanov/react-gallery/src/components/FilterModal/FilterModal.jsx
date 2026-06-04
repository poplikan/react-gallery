import { useState } from 'react';
import './FilterModal.scss';

function FilterModal({ isOpen, onClose, filters, onFilterChange }) {
  const [activeGroup, setActiveGroup] = useState(null);

  const toggleGroup = (group) => {
    setActiveGroup(activeGroup === group ? null : group);
  };

  const handleArtistChange = (e) => {
    onFilterChange({ ...filters, artist: e.target.value });
  };

  const handleLocationChange = (e) => {
    onFilterChange({ ...filters, location: e.target.value });
  };

  const handleYearFromChange = (e) => {
    onFilterChange({ ...filters, yearFrom: e.target.value });
  };

  const handleYearToChange = (e) => {
    onFilterChange({ ...filters, yearTo: e.target.value });
  };

  const handleClear = () => {
    onFilterChange({ artist: '', location: '', yearFrom: '', yearTo: '' });
  };

  return (
    <div className={`filter-modal ${isOpen ? 'active' : ''}`} id="filterModal">
      <div className="filter-modal__header">
        <button className="filter-modal__close" onClick={onClose}>
          <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.386207 14.8252C0.165517 15.049 0.165517 15.3846 0.386207 15.6084C0.606897 15.8322 0.937931 15.8322 1.15862 15.6084L7.88966 8.8951L14.731 15.8322C14.9517 16.0559 15.2828 16.0559 15.5034 15.8322C15.7241 15.6084 15.7241 15.2727 15.5034 15.049L8.66207 8.11189L15.8345 0.951049C16.0552 0.727273 16.0552 0.391608 15.8345 0.167832C15.6138 -0.0559441 15.2828 -0.0559441 15.0621 0.167832L7.88966 7.32867L0.937931 0.27972C0.717241 0.0559441 0.386207 0.0559441 0.165517 0.27972C-0.0551724 0.503497 -0.0551724 0.839161 0.165517 1.06294L7.22759 8.11189L0.386207 14.8252Z" fill="currentColor"/>
          </svg>
        </button>
      </div>

      <div className="filter-modal__content">
        {/* Artist */}
        <div className={`filter-group ${activeGroup === 'artist' ? 'active' : ''}`}>
          <div className="filter-group__header" onClick={() => toggleGroup('artist')}>
            <span>artist</span>
            <span className="filter-group__toggle"></span>
          </div>
          <div className="filter-group__body">
            <div className="select-wrap">
              <select className="filter-select" value={filters.artist} onChange={handleArtistChange}>
                <option value="">Select the artist</option>
                <option value="Leonardo da Vinci">Leonardo da Vinci</option>
                <option value="Vincent van Gogh">Vincent van Gogh</option>
                <option value="Edvard Munch">Edvard Munch</option>
                <option value="Francisco Goya">Francisco Goya</option>
                <option value="Sandro Botticelli">Sandro Botticelli</option>
                <option value="Grant Wood">Grant Wood</option>
                <option value="Rembrandt van Rijn">Rembrandt van Rijn</option>
                <option value="Johannes Vermeer">Johannes Vermeer</option>
                <option value="Michelangelo">Michelangelo</option>
                <option value="Caravaggio">Caravaggio</option>
                <option value="Diego Velazquez">Diego Velazquez</option>
                <option value="Caspar David Friedrich">Caspar David Friedrich</option>
                <option value="Eugene Delacroix">Eugene Delacroix</option>
                <option value="Georges Seurat">Georges Seurat</option>
                <option value="Hieronymus Bosch">Hieronymus Bosch</option>
                <option value="Salvador Dali">Salvador Dali</option>
                <option value="Pieter Bruegel the Elder">Pieter Bruegel the Elder</option>
                <option value="Katsushika Hokusai">Katsushika Hokusai</option>
                <option value="Edward Hopper">Edward Hopper</option>
              </select>
            </div>
          </div>
        </div>

        {/* Location */}
        <div className={`filter-group ${activeGroup === 'location' ? 'active' : ''}`}>
          <div className="filter-group__header"



onClick={() => toggleGroup('location')}>
            <span>location</span>
            <span className="filter-group__toggle"></span>
          </div>
          <div className="filter-group__body">
            <div className="select-wrap">
              <select className="filter-select" value={filters.location} onChange={handleLocationChange}>
                <option value="">Select the location</option>
                <option value="Louvre Museum, Paris">Louvre Museum, Paris</option>
                <option value="MoMA, New York">MoMA, New York</option>
                <option value="National Gallery, Oslo">National Gallery, Oslo</option>
                <option value="Museo del Prado, Madrid">Museo del Prado, Madrid</option>
                <option value="Uffizi Gallery, Florence">Uffizi Gallery, Florence</option>
                <option value="Art Institute of Chicago">Art Institute of Chicago</option>
                <option value="National Gallery of Art, Washington D.C.">National Gallery of Art, Washington D.C.</option>
                <option value="Mauritshuis, The Hague">Mauritshuis, The Hague</option>
                <option value="Santa Maria delle Grazie, Milan">Santa Maria delle Grazie, Milan</option>
                <option value="Sistine Chapel, Vatican">Sistine Chapel, Vatican</option>
                <option value="San Luigi dei Francesi, Rome">San Luigi dei Francesi, Rome</option>
                <option value="Hamburger Kunsthalle, Hamburg">Hamburger Kunsthalle, Hamburg</option>
                <option value="Kunsthistorisches Museum, Vienna">Kunsthistorisches Museum, Vienna</option>
                <option value="Metropolitan Museum of Art, New York">Metropolitan Museum of Art, New York</option>
              </select>
            </div>
          </div>
        </div>

        {/* Years */}
        <div className={`filter-group ${activeGroup === 'years' ? 'active' : ''}`}>
          <div className="filter-group__header" onClick={() => toggleGroup('years')}>
            <span>years</span>
            <span className="filter-group__toggle"></span>
          </div>
          <div className="filter-group__body">
            <div className="year-inputs">
              <input
                type="number"
                placeholder="From"
                className="year-input"
                value={filters.yearFrom}
                onChange={handleYearFromChange}
              />
              <span className="year-dash">
                <svg width="16" height="2" viewBox="0 0 16 2" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.7 1.4H15.4C15.6 1.4 15.7 1.3 15.9 1.2C15.9 1 16 0.9 16 0.7C16 0.5 15.9 0.4 15.8 0.2C15.7 0.0999998 15.5 0 15.3 0H8.7H7.3H0.7C0.5 0 0.4 0.0999998 0.2 0.2C0.1 0.4 0 0.5 0 0.7C0 0.9 0.1 1 0.2 1.2C0.3 1.3 0.5 1.4 0.7 1.4H7.4H8.7Z" fill="currentColor"/>
                </svg>
              </span>
              <input
                type="number"
                placeholder="To"
                className="year-input"
                value={filters.yearTo}
                onChange={handleYearToChange}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="filter-modal__footer">
        <span className="filter-modal__result">show the results</span>
        <span className="filter-modal__clear" onClick={handleClear}>clear</span>
      </div>
    </div>
  );
}

export default FilterModal;