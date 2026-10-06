/**
 * Smoothly scrolls to a target section or element, offsetting for fixed/sticky headers
 * across all mobile, tablet, and desktop viewports.
 */
export const scrollToSection = (sectionId: string, extraOffset: number = 14) => {
  if (!sectionId || sectionId === 'hero' || sectionId === 'top') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  const target = document.getElementById(sectionId);
  if (!target) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  const header = document.querySelector('.site-header, .dest-detail-top-bar, header');
  const headerHeight = header ? header.getBoundingClientRect().height : 80;
  
  const y = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - extraOffset;
  
  window.scrollTo({
    top: Math.max(0, y),
    behavior: 'smooth'
  });
};
