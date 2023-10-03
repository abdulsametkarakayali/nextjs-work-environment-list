// utils/seoFriendlyURL.ts

export function createSEOFriendlyURL(title: string): string {
    const turkishCharacters: { [key: string]: string } = {
      'ı': 'i',
      'ğ': 'g',
      'ü': 'u',
      'ş': 's',
      'ç': 'c',
      'ö': 'o',
      'İ': 'i',
      'Ğ': 'g',
      'Ü': 'u',
      'Ş': 's',
      'Ç': 'c',
      'Ö': 'o'
    };
  
    const seoFriendlyTitle = title
      .toLowerCase()
      .replace(/[\s]/g, '-')
      .replace(/[ığüşçöİĞÜŞÇÖ]/g, match => turkishCharacters[match])
      .replace(/[^a-z0-9-]/g, '')
      .slice(0, 50);
  
    return `${seoFriendlyTitle}`;
  }
  