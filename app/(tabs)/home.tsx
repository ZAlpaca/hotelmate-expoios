import { View, Text, FlatList, TouchableOpacity, RefreshControl, StyleSheet, Alert, Image } from 'react-native';
import { useState, useCallback } from 'react';
import { useAuth } from '../_layout';

const PROMOTIONS = [
  { id: '1', title: 'Распродажа выходного дня', description: 'Забронируйте проживание на ближайшие выходные и получите скидку 20% на люксы категории Premium.', discount: '-20%', badge: 'Акция', date: '2 ч. назад', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600' },
  { id: '2', title: 'Дегустация вин', description: 'Приглашаем вас в четверг на вечер коллекционных вин в нашем лобби-баре.', discount: '', badge: 'Событие', date: 'Вчера', image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600' },
  { id: '3', title: 'SPA-ритуалы', description: 'Новые ритуалы на основе натуральных масел из Прованса.', discount: '', badge: 'Новинка', date: '3 дня назад', image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600' },
  { id: '4', title: 'Раннее бронирование', description: 'Спланируйте отдых заранее и получите до 30% скидки при бронировании за 60 дней.', discount: '-30%', badge: 'Скидка', date: '5 дней назад', image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600' },
];

export default function HomeScreen() {
  const { user } = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = useCallback(() => { setRefreshing(true); setTimeout(() => setRefreshing(false), 1000); }, []);

  const handleDetails = (item: typeof PROMOTIONS[0]) => {
    Alert.alert(item.title, `${item.description}\n\n${item.discount ? 'Скидка: ' + item.discount : ''}`, [{ text: 'OK' }]);
  };

  const renderPromotion = ({ item }: { item: typeof PROMOTIONS[0] }) => (
    <TouchableOpacity activeOpacity={0.95} style={styles.card}>
      <View style={styles.imageArea}>
        <Image source={{ uri: item.image }} style={styles.cardImage} />
        <View style={styles.imageOverlay} />
        <View style={styles.badge}><Text style={styles.badgeText}>{item.badge}</Text></View>
      </View>
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardDate}>{item.date}</Text>
        </View>
        <Text style={styles.cardDescription}>{item.description}</Text>
        <View style={styles.cardFooter}>
          {item.discount ? <Text style={styles.discount}>{item.discount}</Text> : <View />}
          <TouchableOpacity style={styles.cardButton} activeOpacity={0.8} onPress={() => handleDetails(item)}>
            <Text style={styles.cardButtonText}>Подробнее</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={PROMOTIONS}
        renderItem={renderPromotion}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#000" />}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.headerLabel}>Рады видеть вас снова</Text>
            <Text style={styles.headerTitle}>Добро пожаловать, {user.name}</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fbf9f8' },
  list: { paddingHorizontal: 20, paddingTop: 64, paddingBottom: 112 },
  header: { marginBottom: 32, marginTop: 16 },
  headerLabel: { fontSize: 11, fontWeight: '700', letterSpacing: 2, color: '#75777e', textTransform: 'uppercase', marginBottom: 4 },
  headerTitle: { fontSize: 28, fontWeight: '700', color: '#000', letterSpacing: -0.5 },
  card: { marginBottom: 20, backgroundColor: '#f5f3f3', borderRadius: 32, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(197,198,205,0.15)', shadowColor: '#0d1c32', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.04, shadowRadius: 25 },
  cardImage: { width: '100%', height: '100%', position: 'absolute' },
  imageArea: { height: 160, overflow: 'hidden', padding: 16 },
  imageOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(13,28,50,0.2)' },
  badge: { backgroundColor: 'rgba(255,255,255,0.95)', borderRadius: 100, paddingHorizontal: 16, paddingVertical: 6, alignSelf: 'flex-start' },
  badgeText: { fontSize: 10, fontWeight: '700', letterSpacing: 1, color: '#000', textTransform: 'uppercase' },
  cardContent: { padding: 24 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 },
  cardTitle: { fontSize: 18, fontWeight: '700', color: '#000', flex: 1, marginRight: 16 },
  cardDate: { fontSize: 11, color: '#75777e' },
  cardDescription: { fontSize: 14, color: '#44474d', lineHeight: 20, marginBottom: 16 },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 16, borderTopWidth: 1, borderTopColor: 'rgba(197,198,205,0.1)' },
  discount: { fontSize: 14, fontWeight: '700', color: '#735c00' },
  cardButton: { backgroundColor: '#000', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 12 },
  cardButtonText: { fontSize: 11, fontWeight: '700', color: '#fff', letterSpacing: 0.5, textTransform: 'uppercase' },
});
