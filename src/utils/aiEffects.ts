
// AI-themed animations and visual effects

export const generateGlowColor = () => {
  const colors = ['#9b87f5', '#7E69AB', '#1EAEDB', '#33C3F0'];
  return colors[Math.floor(Math.random() * colors.length)];
};

export const generateUniquePattern = (seed: string): string => {
  // Create a semi-unique pattern based on string input
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  const patternType = hash % 4;
  const colorHue = Math.abs(hash) % 360;
  
  switch (patternType) {
    case 0: return `radial-gradient(circle at 50% 0%, hsla(${colorHue}, 100%, 70%, 0.4) 0%, transparent 70%)`;
    case 1: return `linear-gradient(135deg, hsla(${colorHue}, 100%, 70%, 0.3) 0%, transparent 70%)`;
    case 2: return `repeating-linear-gradient(45deg, hsla(${colorHue}, 100%, 70%, 0.1) 0px, hsla(${colorHue}, 100%, 70%, 0.2) 10px)`;
    default: return `conic-gradient(from 45deg, transparent, hsla(${colorHue}, 100%, 70%, 0.2), transparent)`;
  }
};
