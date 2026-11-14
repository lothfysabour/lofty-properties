export const neighborhoods = [
  'Tous les quartiers',
  'Palmeraie',
  'Guéliz',
]

// ⚠️  Renseignez 'price' (en DH, prix par nuit réel sur Airbnb). Laissé à null, le prix n'est pas affiché.
export const apartments = [
  {
    id: 1,
    name: 'Palmeraie | Chic 2CH • Piscine & Tennis',
    neighborhood: 'Palmeraie',
    price: null,
    bedrooms: 2,
    bathrooms: 2,
    guests: 5,
    rating: 5.0,
    reviews: 10,
    image: 'https://a0.muscache.com/im/pictures/hosting/Hosting-1760389354195143815/original/dccc8577-5e73-4686-8e64-5b15d6488ab9.jpeg?im_w=1200',
    airbnbUrl: 'https://www.airbnb.fr/rooms/1760389354195143815',
    amenities: ['Piscine', 'Tennis', 'Salle de sport', 'Wi-Fi fibre', 'Parking gratuit'],
    verified: true,
    badge: 'Coup de cœur voyageurs',
    description: 'Appartement 2 chambres au style bohème marocain, dans une résidence sécurisée et paisible, à 15 min du centre de Marrakech.',
  },
  {
    id: 2,
    name: 'Guéliz | Chic & Cosy 2CH • Centre-ville',
    neighborhood: 'Guéliz',
    price: null,
    bedrooms: 2,
    bathrooms: 2,
    guests: 5,
    rating: 5.0,
    reviews: 2,
    image: 'https://a0.muscache.com/im/pictures/hosting/Hosting-1812615074416223970/original/366103be-88f5-4917-968f-2cf7bff4c96c.jpeg?im_w=1200',
    airbnbUrl: 'https://www.airbnb.fr/rooms/1812615074416223970',
    amenities: ['Wi-Fi fibre', 'Parking gratuit', 'Climatisation', 'Cuisine équipée', 'Arrivée autonome'],
    verified: true,
    badge: 'Nouvelle annonce',
    description: 'Appartement 2 chambres au style bohème marocain, dans une résidence sécurisée au cœur de Guéliz, à quelques pas des restaurants et commerces.',
  },
]
