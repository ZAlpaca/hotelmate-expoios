import { Hotel, SpecialEvent, User } from './types';

export const HOTELS: Hotel[] = [
  {
    id: 'lumina-peak',
    name: 'Lumina Peak Residence',
    title: 'Lumina Peak Residence',
    subtitle: 'Альпы, Франция',
    originalPriceText: 'от 45,000₽ / ночь',
    priceEUR: 450,
    originalCurrency: 'RUB',
    description: 'Уединение среди заснеженных вершин Альп. Панорамные виды на Монблан, персональный спа-сервис, камин в каждом номере и прямой выход к горнолыжным трассам. Ощутите абсолютную тишину приватного шале в сочетании со стандартами пятизвездочного отеля.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCPLg4Zc92faMwXFCKSTGUzGHy8ZS461J-ewcuypA66Vuq0zSQCcb-UdKFUv-XsMwGWJaOvDy85e6TEJe6e686E2V2iLsotei17cUrAPlQ5Q9efGIAWM4-mWzrfvfE8lVyIuXgyl4n1wEHvGcnsLvF8WMO07L1oPkGzpTOYd1xJpsP5mlLkMzrkzAYs8nLZsVNh4clYq9ryEdcRJwP5Pwu_ZTXGtOFSeG-vxeCsO3U3rfqecgsb0zfPNZFEgX3mMnQ_OfaRvXiQIfY',
    locationName: 'Альпы, Франция',
    locationDetail: 'Шамони-Монблан, Франция',
    rating: 4.9,
    reviewsCount: 124,
    featured: true,
    amenities: [
      { icon: 'wifi', label: 'Wi-Fi' },
      { icon: 'spa', label: 'Спа-салон' },
      { icon: 'pool', label: 'Бассейн' },
      { icon: 'fireplace', label: 'Камин' },
      { icon: 'sports_recreation', label: 'Ski-in/out' }
    ],
    mapImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDYSCJav797R-WKUOxHTV1dBzoaRHRmzVeRiEo_mWBOhu4syAExtDY9sbSeiPKrrwS4BjZIF78CK1q0Q5UIVHDXtuzdn_mmgvNfrcfpWUVSJ72OZ3kjjck_TpPi8pyoWyJRvTjaVV2gVCI36b8HqQoZEdw9l_zXRJ5nxFK0T_V6N0_nTZzL_pIDjc7SrUJFLqZ8QYudqYd39EqSB89MIZ27NNse11gTbrVkerrenE4sVGDp4Hxb7sG7Q4pvk1lBE725WVI_2Ry8uKc', // fallback
    locationCoordinates: { lat: 45.9227, lng: 6.8685 }
  },
  {
    id: 'azure-retreat',
    name: 'The Azure Retreat',
    title: 'Azure Cove Villa',
    subtitle: 'Греция, Санторини',
    originalPriceText: '€850 / ночь',
    priceEUR: 850,
    originalCurrency: 'EUR',
    description: 'Откройте для себя воплощение тихой роскоши в самом сердце Санторини. The Azure Retreat предлагает эксклюзивный отдых, где современный минимализм встречается с традиционной кикладской архитектурой. Каждый номер спроектирован так, чтобы обеспечить максимальное уединение и захватывающий панорамный вид на Эгейское море и закаты над кальдерой.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDfE0LMbmZyyEkj02jLU880n5NSpvWKxTBhUtgKUiCg9Wgn-3uqr1t3E5PZB_cW0WhOJFokxTslRLeC0nV6Xv5T6pZgcqtMhzTR_Jtj0QroJG75_9fEIGygvnzeC-zCXueN0GUXrE2TSL0nWmj6S2JDbgnfzUM8wUuoOdQfH01NfKIFtipUwVuU1FQxh7UK8sfCutQtm0jeHUEpXOp3wSgF9YQTTjS90jgObp0nHEwOH69fXWV1ne1FNBfo0suN0ZUXrTE1TEGL0Xw',
    locationName: 'Греция, Санторини',
    locationDetail: 'Ия, Санторини, Греция',
    rating: 4.98,
    reviewsCount: 96,
    featured: true,
    amenities: [
      { icon: 'wifi', label: 'Wi-Fi' },
      { icon: 'spa', label: 'Спа' },
      { icon: 'pool', label: 'Бассейн' },
      { icon: 'restaurant', label: 'Ресторан' },
      { icon: 'beach_access', label: 'Пляж' }
    ],
    mapImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDYSCJav797R-WKUOxHTV1dBzoaRHRmzVeRiEo_mWBOhu4syAExtDY9sbSeiPKrrwS4BjZIF78CK1q0Q5UIVHDXtuzdn_mmgvNfrcfpWUVSJ72OZ3kjjck_TpPi8pyoWyJRvTjaVV2gVCI36b8HqQoZEdw9l_zXRJ5nxFK0T_V6N0_nTZzL_pIDjc7SrUJFLqZ8QYudqYd39EqSB89MIZ27NNse11gTbrVkerrenE4sVGDp4Hxb7sG7Q4pvk1lBE725WVI_2Ry8uKc',
    locationCoordinates: { lat: 36.4618, lng: 25.3753 }
  },
  {
    id: 'verdant-sanctuary',
    name: 'Verdant Sanctuary',
    title: 'Verdant Sanctuary',
    subtitle: 'Бали, Убуд',
    originalPriceText: 'от 38,000₽ / ночь',
    priceEUR: 380,
    originalCurrency: 'RUB',
    description: 'Тропический рай в самом сердце Убуда. Окруженный пышными джунглями и священными рисовыми террасами, отель сочетает в себе экологичный дизайн и сервис ультра-люкс. Собственные виллы с инфинити-бассейнами, аюрведический спа-центр и утренние сессии йоги на открытом воздухе.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDLBbwNvNAld7kWo42z434DJNMBjek5UITTSx5q0N6xqFMywpXiWxbl4PtAaoOUsZynbPGBCybuz0y0sB5f9eUXBrHFLzTFx4NDoYlyCythylk60xffZAdIof5E5-me180ZWgmq6VvFW5_cpDtDZIQYpZMjHbjh16TxZyXr69tim0TIpkkjSDJJnQSbJMiY3qT8WN0nPHpur_fIYRQw3C0gX_QzdgTI_-1kmvHiBrAZmAPE0OR2fK6Sr4H5ZTR15djYu5UQyMjoETg',
    locationName: 'Бали, Убуд',
    locationDetail: 'Убуд, Бали, Индонезия',
    rating: 4.95,
    reviewsCount: 154,
    featured: true,
    amenities: [
      { icon: 'wifi', label: 'Wi-Fi' },
      { icon: 'spa', label: 'Спа' },
      { icon: 'pool', label: 'Бассейн' },
      { icon: 'self_improvement', label: 'Йога' },
      { icon: 'nature_people', label: 'Джунгли' }
    ],
    mapImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDYSCJav797R-WKUOxHTV1dBzoaRHRmzVeRiEo_mWBOhu4syAExtDY9sbSeiPKrrwS4BjZIF78CK1q0Q5UIVHDXtuzdn_mmgvNfrcfpWUVSJ72OZ3kjjck_TpPi8pyoWyJRvTjaVV2gVCI36b8HqQoZEdw9l_zXRJ5nxFK0T_V6N0_nTZzL_pIDjc7SrUJFLqZ8QYudqYd39EqSB89MIZ27NNse11gTbrVkerrenE4sVGDp4Hxb7sG7Q4pvk1lBE725WVI_2Ry8uKc', // fallback
    locationCoordinates: { lat: -8.5069, lng: 115.2625 }
  }
];

export const EVENTS: SpecialEvent[] = [
  {
    id: 'michelin-night',
    category: 'Гастрономия',
    title: 'Ночь Мишлен',
    description: 'Эксклюзивный ужин от шеф-повара Марко Пьера в Peak Residence. Уникальное дегустационное меню из 7 блюд с винным сопровождением.',
    originalPriceText: '15,000₽ / персону',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDp-hXiEkN7IxYOhTwC3LPwJC1gzBZyXhWDa5hGfU5K-QqtzLKLNmhbvfgUBrjloKAEsqQX4_WwGm9Hhk-2h0DBwZaWWfBoCp274TLU-f8p4TNqlej4aIAL_olbwFDrTqgmGXDTGAXQG3PAarZdupSL3JeI-bo1dLu-HGy6BC1hq1_Nosps3q3jm_dAAp-LGOdofQpLWdNIyNhy0mBgFjvL43clfAxaxaxuFf8Hj6mWiKCZmmkOP_yi3wN7vQ-E4xPf9y4uJ9P7dVk',
    location: 'Lumina Peak Residence, ресторан "Ciel"',
    priceAmount: 150
  },
  {
    id: 'mindfulness-retreat',
    category: 'Wellness',
    title: 'Ретрит осознанности',
    description: '3 дня медитаций, глубокого расслабления и премиальных спа-процедур под руководством мастеров традиционной медицины.',
    originalPriceText: '48,000₽ / пакет',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAuH0T3MaGpICGAb4Hl6CzljdUX0gYDiUxVfj8wQwtrH6SK4g_647YzhTTgQ6n8X-qhFJi5TP9swzebTHUyWxfTsyHLsXHy0m80mN09llfVVsLWDpf54uyp4dkcx0FKvsoc9l-4D979jmVrPCPN26BIv4DMcbDe4fRPe5Fvth_Gqk3XUPVuy3okyD2ZeTMI0N5gV1ItBjf8XECmA4wFehctG5u2uE9fKT_ID3awjKSWfw1Zgq23gwpt12jQGfptmVZtHfVhlZNt7Wk',
    location: 'Verdant Sanctuary, Бали',
    priceAmount: 480
  },
  {
    id: 'jazz-evening',
    category: 'Музыка',
    title: 'Вечер джаза',
    description: 'Живой чарующий звук в исполнении джаз-квартета и авторские коктейли на панорамной террасе Azure Cove Lounge.',
    originalPriceText: 'Бесплатно для членов клуба',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAubvZ6cAvBwsQD12DsdWmAbvvprv-o9EgYKTgnB5Rs5QPNKYWzFn0c_hKo_lWvdT6tX4a-fgwNWl4-5xDy7K6Hx97azQCkFfrj3CY2cTSqTklGQkNyxjBsVm6Il-HbhDoPzYlaoThYOE5zPQ_h3FdOAbSYeW1_J25R_p9wDK1WcZS6x2Tg7ttceJXhzhBk_2FoL3NDI7Yw6trD5jJ60si90Ng94kEH_ltYeaofgabiLBppwPSfNKwn8X_qm1dN9s_oAqXMuRAkLYs',
    location: 'The Azure Retreat, Санторини',
    priceAmount: 0
  }
];

export const INITIAL_USER: User = {
  name: 'Алекс',
  email: 'alex.lumina@circle.com',
  memberSince: 'Март 2025',
  isCircleMember: true,
  loyaltyPoints: 12450,
  tier: 'Lumina Circle'
};
