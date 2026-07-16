import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const LOYALTY_HISTORY = [
  { id: '1', date: '15 июл', description: 'Бронирование The Azure Retreat', points: 2550, type: 'earn' as const },
  { id: '2', date: '10 июл', description: 'Приветственный бонус', points: 1000, type: 'earn' as const },
  { id: '3', date: '5 июл', description: 'SPA-процедуры', points: 500, type: 'burn' as const },
  { id: '4', date: '28 июн', description: 'Ужин в ресторане "Ciel"', points: 350, type: 'earn' as const },
  { id: '5', date: '20 июн', description: 'Трансфер из аэропорта', points: 200, type: 'burn' as const },
];

const LEVELS = [
  { name: 'Silver', min: 0, max: 5000 },
  { name: 'Gold', min: 5000, max: 15000 },
  { name: 'Platinum', min: 15000, max: 30000 },
  { name: 'Lumina Circle', min: 30000, max: Infinity },
];

const currentPoints = 12450;
const currentTier = 'Gold';

function getNextTier(tier: string) {
  const idx = LEVELS.findIndex(l => l.name === tier);
  if (idx === -1 || idx >= LEVELS.length - 1) return null;
  return LEVELS[idx + 1];
}

function getProgress(tier: string, points: number) {
  const idx = LEVELS.findIndex(l => l.name === tier);
  if (idx === -1) return 1;
  const cur = LEVELS[idx];
  const next = LEVELS[idx + 1];
  if (!next) return 1;
  return (points - cur.min) / (next.min - cur.min);
}

export default function BonusesScreen() {
  const nextTier = getNextTier(currentTier);
  const progress = getProgress(currentTier, currentPoints);

  const usePoints = () => {
    Alert.alert('Использование баллов', 'Вы можете обменять баллы на: SPA-процедуры, Upgrade номера, Ужин в ресторане. Функция откроется в ближайшее время.', [{ text: 'OK' }]);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerLabel}>Программа лояльности</Text>
        <Text style={styles.headerTitle}>Мои бонусы</Text>
      </View>

      <View style={styles.loyaltyCard}>
        <View style={styles.cardInner}>
          <View style={styles.cardRow}>
            <View>
              <Text style={styles.cardBrand}>LUMINA CLUB</Text>
              <Text style={styles.cardTier}>{currentTier}</Text>
            </View>
            <Text style={styles.cardEmoji}>⭐</Text>
          </View>
          <View style={styles.cardPoints}>
            <View>
              <Text style={styles.cardPointsLabel}>Клубные баллы</Text>
              <Text style={styles.cardPointsValue}>{currentPoints.toLocaleString()} PTS</Text>
            </View>
            <TouchableOpacity style={styles.cardButton} activeOpacity={0.8} onPress={usePoints}>
              <Text style={styles.cardButtonText}>Использовать</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.cardCircle} />
      </View>

      {nextTier && (
        <View style={styles.progressSection}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressLabel}>До уровня {nextTier.name}</Text>
            <Text style={styles.progressValue}>{nextTier.min - currentPoints} баллов</Text>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${Math.min(progress * 100, 100)}%` }]} />
          </View>
        </View>
      )}

      <View style={styles.historySection}>
        <Text style={styles.historyTitle}>История операций</Text>
        {LOYALTY_HISTORY.map((item) => (
          <View key={item.id} style={styles.historyItem}>
            <View style={[styles.historyIcon, { backgroundColor: item.type === 'earn' ? 'rgba(254,214,91,0.2)' : 'rgba(197,198,205,0.2)' }]}>
              <Text style={styles.historyIconText}>{item.type === 'earn' ? '➕' : '➖'}</Text>
            </View>
            <View style={styles.historyInfo}>
              <Text style={styles.historyDesc}>{item.description}</Text>
              <Text style={styles.historyDate}>{item.date}</Text>
            </View>
            <Text style={[styles.historyPoints, { color: item.type === 'earn' ? '#735c00' : '#75777e' }]}>
              {item.type === 'earn' ? '+' : '-'}{item.points}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fbf9f8', paddingTop: 64, paddingHorizontal: 20, paddingBottom: 112 },
  header: { marginBottom: 32 },
  headerLabel: { fontSize: 11, fontWeight: '700', letterSpacing: 2, color: '#75777e', textTransform: 'uppercase', marginBottom: 4 },
  headerTitle: { fontSize: 28, fontWeight: '700', color: '#000', letterSpacing: -0.5 },
  loyaltyCard: { backgroundColor: '#0d1c32', borderRadius: 24, padding: 24, marginBottom: 32, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', shadowColor: '#0d1c32', shadowOffset: { width: 0, height: 15 }, shadowOpacity: 0.2, shadowRadius: 30 },
  cardInner: { position: 'relative', zIndex: 10 },
  cardRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 },
  cardBrand: { fontSize: 10, fontWeight: '700', letterSpacing: 1, color: '#76849f', textTransform: 'uppercase' },
  cardTier: { fontSize: 20, fontWeight: '700', color: '#fff', marginTop: 2 },
  cardEmoji: { fontSize: 24 },
  cardPoints: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', paddingTop: 16, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.1)' },
  cardPointsLabel: { fontSize: 9, fontWeight: '700', letterSpacing: 1, color: '#76849f', textTransform: 'uppercase' },
  cardPointsValue: { fontSize: 22, fontWeight: '700', color: '#fff', letterSpacing: 0.5 },
  cardButton: { backgroundColor: '#fed65b', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 12 },
  cardButtonText: { fontSize: 10, fontWeight: '700', color: '#745c00', letterSpacing: 1, textTransform: 'uppercase' },
  cardCircle: { position: 'absolute', right: -64, bottom: -64, width: 192, height: 192, borderRadius: 96, backgroundColor: 'rgba(255,255,255,0.05)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)' },
  progressSection: { marginBottom: 32 },
  progressHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  progressLabel: { fontSize: 13, fontWeight: '600', color: '#44474d' },
  progressValue: { fontSize: 13, color: '#75777e' },
  progressBar: { height: 8, backgroundColor: '#e4e2e2', borderRadius: 4, overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 4, backgroundColor: '#735c00' },
  historySection: { marginBottom: 32 },
  historyTitle: { fontSize: 20, fontWeight: '700', color: '#000', marginBottom: 20 },
  historyItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: 'rgba(197,198,205,0.1)' },
  historyIcon: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  historyIconText: { fontSize: 16 },
  historyInfo: { flex: 1 },
  historyDesc: { fontSize: 14, fontWeight: '600', color: '#000' },
  historyDate: { fontSize: 11, color: '#75777e', marginTop: 2 },
  historyPoints: { fontSize: 14, fontWeight: '700' },
});
