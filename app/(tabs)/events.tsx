import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useState } from 'react';

const CATEGORIES = [
  { id: 'all', label: 'Все' },
  { id: 'gastronomy', label: 'Гастрономия' },
  { id: 'wellness', label: 'Wellness' },
  { id: 'music', label: 'Музыка' },
];

const EVENTS = [
  { id: 'michelin-night', category: 'gastronomy', title: 'Ночь Мишлен', description: 'Эксклюзивный ужин от шеф-повара Марко Пьера в Peak Residence.', price: '15 000₽ / персону', location: 'Lumina Peak Residence', categoryLabel: 'Гастрономия' },
  { id: 'mindfulness-retreat', category: 'wellness', title: 'Ретрит осознанности', description: '3 дня медитаций, глубокого расслабления и премиальных спа-процедур.', price: '48 000₽ / пакет', location: 'Verdant Sanctuary, Бали', categoryLabel: 'Wellness' },
  { id: 'jazz-evening', category: 'music', title: 'Вечер джаза', description: 'Живой чарующий звук в исполнении джаз-квартета и авторские коктейли.', price: 'Бесплатно для членов клуба', location: 'The Azure Retreat, Санторини', categoryLabel: 'Музыка' },
  { id: 'wine-tasting', category: 'gastronomy', title: 'Дегустация вин', description: 'Вечер коллекционных вин в уютном лобби-баре.', price: '8 000₽ / персону', location: 'Lumina Peak Residence', categoryLabel: 'Гастрономия' },
  { id: 'morning-yoga', category: 'wellness', title: 'Утренняя йога', description: 'Ежедневные занятия йогой на рассвете с видом на океан.', price: 'Бесплатно', location: 'Verdant Sanctuary, Бали', categoryLabel: 'Wellness' },
];

export default function EventsScreen() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const filtered = selectedCategory === 'all' ? EVENTS : EVENTS.filter(e => e.category === selectedCategory);

  const handleOrder = (event: typeof EVENTS[0]) => {
    Alert.alert('Заказ оформлен!', `${event.title}\n\nСтоимость: ${event.price}\n\nБилет привязан к вашей карте LUMINA.`, [{ text: 'Отлично' }]);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerLabel}>Эксклюзивные предложения</Text>
        <Text style={styles.headerTitle}>Особые события</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipsContainer}>
        <View style={styles.chipsRow}>
          {CATEGORIES.map((cat) => (
            <TouchableOpacity key={cat.id} onPress={() => setSelectedCategory(cat.id)} style={[styles.chip, selectedCategory === cat.id && styles.chipActive]}>
              <Text style={[styles.chipText, selectedCategory === cat.id && styles.chipTextActive]}>{cat.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {filtered.map((event) => (
        <TouchableOpacity key={event.id} activeOpacity={0.95} style={styles.eventCard}>
          <View style={styles.eventImageArea}>
            <View style={styles.eventBadge}>
              <Text style={styles.eventBadgeText}>{event.categoryLabel}</Text>
            </View>
          </View>
          <View style={styles.eventContent}>
            <Text style={styles.eventTitle}>{event.title}</Text>
            <Text style={styles.eventLocation}>📍 {event.location}</Text>
            <Text style={styles.eventDescription}>{event.description}</Text>
            <View style={styles.eventFooter}>
              <View>
                <Text style={styles.eventPriceLabel}>Стоимость</Text>
                <Text style={styles.eventPrice}>{event.price}</Text>
              </View>
              <TouchableOpacity style={styles.eventButton} activeOpacity={0.8} onPress={() => handleOrder(event)}>
                <Text style={styles.eventButtonText}>Заказать</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fbf9f8', paddingTop: 64, paddingHorizontal: 20, paddingBottom: 112 },
  header: { marginBottom: 24 },
  headerLabel: { fontSize: 11, fontWeight: '700', letterSpacing: 2, color: '#75777e', textTransform: 'uppercase', marginBottom: 4 },
  headerTitle: { fontSize: 28, fontWeight: '700', color: '#000', letterSpacing: -0.5 },
  chipsContainer: { marginBottom: 24, marginHorizontal: -20, paddingHorizontal: 20 },
  chipsRow: { flexDirection: 'row', gap: 8 },
  chip: { paddingHorizontal: 20, paddingVertical: 10, borderRadius: 100, backgroundColor: '#f5f3f3' },
  chipActive: { backgroundColor: '#000' },
  chipText: { fontSize: 13, fontWeight: '700', color: '#44474d' },
  chipTextActive: { color: '#fff' },
  eventCard: { marginBottom: 24, backgroundColor: '#f5f3f3', borderRadius: 32, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(197,198,205,0.15)', shadowColor: '#0d1c32', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.04, shadowRadius: 25 },
  eventImageArea: { height: 180, backgroundColor: '#0d1c32', padding: 16 },
  eventBadge: { backgroundColor: 'rgba(255,255,255,0.95)', borderRadius: 100, paddingHorizontal: 16, paddingVertical: 6, alignSelf: 'flex-start' },
  eventBadgeText: { fontSize: 10, fontWeight: '700', letterSpacing: 1, color: '#000', textTransform: 'uppercase' },
  eventContent: { padding: 24 },
  eventTitle: { fontSize: 18, fontWeight: '700', color: '#000', marginBottom: 4 },
  eventLocation: { fontSize: 11, color: '#75777e', marginBottom: 12 },
  eventDescription: { fontSize: 14, color: '#44474d', lineHeight: 20, marginBottom: 16 },
  eventFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 16, borderTopWidth: 1, borderTopColor: 'rgba(197,198,205,0.1)' },
  eventPriceLabel: { fontSize: 9, fontWeight: '700', letterSpacing: 1, color: '#75777e', textTransform: 'uppercase' },
  eventPrice: { fontSize: 14, fontWeight: '700', color: '#735c00' },
  eventButton: { backgroundColor: '#0d1c32', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 12 },
  eventButtonText: { fontSize: 11, fontWeight: '700', color: '#fff', letterSpacing: 0.5, textTransform: 'uppercase' },
});
