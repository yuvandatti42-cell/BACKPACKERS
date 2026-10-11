import React, { useState, useEffect, useRef } from 'react';
import './GlideSelect.css';

export interface GlideSelectOption {
  value: string;
  label: string;
  tag?: string;
  [key: string]: any;
}

export interface GlideSelectProps {
  options: GlideSelectOption[] | any;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string, option: GlideSelectOption) => void;
  ariaLabel?: string;
  showTags?: boolean;
  accentColor?: string;
  surfaceColor?: string;
  highlightColor?: string;
  textColor?: string;
  size?: 'sm' | 'md' | 'lg';
  radius?: number;
  menuWidth?: number | string;
  placement?: 'bottom' | 'top';
  align?: 'left' | 'right';
  popDuration?: number;
  glideDuration?: number;
  rememberPosition?: boolean;
  disabled?: boolean;
  className?: string;
}

export const GlideSelect: React.FC<GlideSelectProps> = ({
  options = [],
  value: controlledValue,
  defaultValue,
  onChange,
  ariaLabel = 'Select option',
  showTags = true,
  accentColor = '#f5f5f5',
  surfaceColor = '#27272a',
  highlightColor = '#3f3f46',
  textColor = '#f5f5f5',
  size = 'md',
  radius = 10,
  menuWidth = 180,
  placement = 'bottom',
  align = 'left',
  popDuration = 180,
  glideDuration = 220,
  disabled = false,
  className = ''
}) => {
  // Normalize options array
  const parsedOptions: GlideSelectOption[] = Array.isArray(options) ? options : [];

  const initialVal = controlledValue !== undefined 
    ? controlledValue 
    : (defaultValue || (parsedOptions[0] ? parsedOptions[0].value : ''));

  const [selectedValue, setSelectedValue] = useState<string>(initialVal);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [hoveredIndex, setHoveredIndex] = useState<number>(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Sync controlled value
  useEffect(() => {
    if (controlledValue !== undefined) {
      setSelectedValue(controlledValue);
    }
  }, [controlledValue]);

  // Find active option
  const activeOption = parsedOptions.find(opt => opt.value === selectedValue) || parsedOptions[0];

  // Set default hover index to active option index when menu opens
  useEffect(() => {
    if (isOpen) {
      const idx = parsedOptions.findIndex(opt => opt.value === selectedValue);
      setHoveredIndex(idx !== -1 ? idx : 0);
    }
  }, [isOpen, selectedValue, parsedOptions]);

  // Click Outside Listener
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    if (!isOpen) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        setIsOpen(true);
      }
      return;
    }

    if (e.key === 'Escape') {
      e.preventDefault();
      setIsOpen(false);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHoveredIndex(prev => (prev + 1) % parsedOptions.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHoveredIndex(prev => (prev - 1 + parsedOptions.length) % parsedOptions.length);
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (hoveredIndex >= 0 && hoveredIndex < parsedOptions.length) {
        selectOption(parsedOptions[hoveredIndex]);
      }
    }
  };

  const selectOption = (option: GlideSelectOption) => {
    if (disabled) return;
    if (controlledValue === undefined) {
      setSelectedValue(option.value);
    }
    setIsOpen(false);
    if (onChange) {
      onChange(option.value, option);
    }
  };

  // Compute highlight pill position
  const getItemTop = (index: number) => {
    if (index < 0) return 0;
    // Each menu item has fixed/measured height + padding
    const itemEl = itemRefs.current[index];
    return itemEl ? itemEl.offsetTop : index * 40;
  };

  const getItemHeight = (index: number) => {
    if (index < 0) return 38;
    const itemEl = itemRefs.current[index];
    return itemEl ? itemEl.offsetHeight : 38;
  };

  const currentHighlightTop = getItemTop(hoveredIndex);
  const currentHighlightHeight = getItemHeight(hoveredIndex);

  return (
    <div
      ref={containerRef}
      className={`glide-select-container glide-size-${size} ${isOpen ? 'is-open' : ''} ${disabled ? 'is-disabled' : ''} ${className}`}
      onKeyDown={handleKeyDown}
      style={{
        '--surface-color': surfaceColor,
        '--highlight-color': highlightColor,
        '--text-color': textColor,
        '--accent-color': accentColor,
        '--radius': `${radius}px`,
        '--pop-duration': `${popDuration}ms`,
        '--glide-duration': `${glideDuration}ms`
      } as React.CSSProperties}
    >
      {/* Trigger Button */}
      <button
        type="button"
        className="glide-select-trigger"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={ariaLabel}
        disabled={disabled}
      >
        <span className="trigger-label">
          {activeOption ? activeOption.label : 'Select'}
        </span>
        <svg
          className={`trigger-chevron ${isOpen ? 'is-rotated' : ''}`}
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {/* Floating Menu */}
      {isOpen && (
        <div
          className={`glide-select-menu placement-${placement} align-${align}`}
          role="listbox"
          aria-label={ariaLabel}
          style={{ width: typeof menuWidth === 'number' ? `${menuWidth}px` : menuWidth }}
        >
          {/* Animated Gliding Highlight Pill */}
          {hoveredIndex >= 0 && (
            <div
              className="glide-highlight-pill"
              style={{
                transform: `translateY(${currentHighlightTop}px)`,
                height: `${currentHighlightHeight}px`,
                transitionDuration: `${glideDuration}ms`
              }}
            />
          )}

          <div className="glide-options-list">
            {parsedOptions.map((opt, idx) => {
              const isSelected = opt.value === selectedValue;
              const isHovered = idx === hoveredIndex;

              return (
                <button
                  key={opt.value}
                  ref={(el) => (itemRefs.current[idx] = el)}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  className={`glide-option-item ${isSelected ? 'is-selected' : ''} ${isHovered ? 'is-hovered' : ''}`}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onClick={() => selectOption(opt)}
                >
                  <span className="option-label">{opt.label}</span>

                  <div className="option-right-meta">
                    {showTags && opt.tag && (
                      <span className="option-tag">{opt.tag}</span>
                    )}

                    {isSelected && (
                      <svg
                        className="option-check-icon"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default GlideSelect;
