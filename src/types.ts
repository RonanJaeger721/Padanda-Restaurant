export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  image: string;
  isFeatured?: boolean;
  isPopular?: boolean;
  spicyLevel?: 0 | 1 | 2 | 3;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  rating: number;
  date: string;
  avatar: string;
}

export interface GalleryItem {
  id: string;
  url: string;
  caption: string;
  category: 'food' | 'interior' | 'exterior' | 'events';
}

export interface WhyUsItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}
