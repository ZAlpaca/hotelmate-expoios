import { View, Text, ScrollView, TouchableOpacity, Switch, Alert, StyleSheet } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import { useAuth } from '../_layout';

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const [pushEnabled, setPushEnabled] = useState(true);
  const [bookingUpdates, setBookingUpdates] = useState(true);
  const [concierge, setConcierge] = useState(false);

  const handleLogout = () => {
    Alert.alert('Выйти из профиля', 'Вы уверены?', [
      { text: 'Отмена', style: 'cancel' },
      { text: 'Выйти', style: 'destructive', onPress: () => { logout(); router.replace('/'); } },
    ]);
  };

  const settings = [
    { title: 'Push-уведомления', subtitle: 'Спецпредложения и новости', value: pushEnabled, onToggle: setPushEnabled },
    { title: 'Статус бронирования', subtitle: 'Изменения и подтверждения', value: bookingUpdates, onToggle: setBookingUpdates },
    { title: 'Консьерж-сервис', subtitle: 'Сообщения во время проживания', value: concierge, onToggle: setConcierge },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileHeader}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{user.name.charAt(0).toUpperCase()}</Text>
        </View>
        <View>
          <Text style={styles.userName}>{user.name}</Text>
          <View style={styles.userMeta}>
            <Text style={styles.userTier}>Gold Member</Text>
            <View style={styles.dot} />
            <Text style={styles.userPoints}>12 450 баллов</Text>
          </View>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Настройки уведомлений</Text>
      <View style={styles.settingsCard}>
        {settings.map((s, i) => (
          <View key={s.title} style={[styles.settingItem, i < settings.length - 1 && styles.settingBorder]}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>{s.title}</Text>
              <Text style={styles.settingSubtitle}>{s.subtitle}</Text>
            </View>
            <Switch value={s.value} onValueChange={s.onToggle} trackColor={{ false: '#e4e2e2', true: '#735c00' }} thumbColor="#fff" />
          </View>
        ))}
      </View>

      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton} activeOpacity={0.8}>
        <Text style={styles.logoutText}>Выйти из профиля</Text>
      </TouchableOpacity>

      <Text style={styles.footer}>LUMINA Hotels Group © 2026</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fbf9f8', paddingTop: 64, paddingHorizontal: 20, paddingBottom: 112 },
  profileHeader: { flexDirection: 'row', alignItems: 'center', gap: 16, marginBottom: 32 },
  avatar: { width: 64, height: 64, borderRadius: 32, backgroundColor: '#0d1c32', justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: 'rgba(197,198,205,0.3)' },
  avatarText: { fontSize: 24, fontWeight: '700', color: '#fff' },
  userName: { fontSize: 22, fontWeight: '700', color: '#000' },
  userMeta: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  userTier: { fontSize: 10, fontWeight: '700', letterSpacing: 1, color: '#735c00', textTransform: 'uppercase' },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#735c00', marginHorizontal: 8 },
  userPoints: { fontSize: 11, color: '#75777e' },
  sectionTitle: { fontSize: 20, fontWeight: '700', color: '#000', marginBottom: 20 },
  settingsCard: { backgroundColor: 'rgba(255,255,255,0.7)', borderRadius: 16, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(197,198,205,0.2)', marginBottom: 24 },
  settingItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 16 },
  settingBorder: { borderBottomWidth: 1, borderBottomColor: 'rgba(197,198,205,0.2)' },
  settingInfo: { flex: 1, marginRight: 16 },
  settingTitle: { fontSize: 14, fontWeight: '600', color: '#000' },
  settingSubtitle: { fontSize: 12, color: '#75777e', marginTop: 2 },
  logoutButton: { backgroundColor: 'rgba(255,255,255,0.7)', borderRadius: 16, borderWidth: 1, borderColor: 'rgba(186,26,26,0.2)', paddingVertical: 16, alignItems: 'center', marginBottom: 40 },
  logoutText: { fontSize: 14, fontWeight: '700', color: '#ba1a1a' },
  footer: { fontSize: 10, color: '#75777e', textAlign: 'center', letterSpacing: 0.5 },
});
