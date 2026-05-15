import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>N</Text>
          </View>
          <Text style={styles.name}>Nguyen Van A</Text>
          <Text style={styles.email}>user@linguaflow.app</Text>
          <Text style={styles.level}>Level 2 • 120 XP</Text>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Text style={[styles.statValue, { color: '#F59E0B' }]}>7</Text>
            <Text style={styles.statLabel}>Streak</Text>
          </View>
          <View style={styles.stat}>
            <Text style={[styles.statValue, { color: '#6366F1' }]}>120</Text>
            <Text style={styles.statLabel}>XP</Text>
          </View>
          <View style={styles.stat}>
            <Text style={[styles.statValue, { color: '#22C55E' }]}>5</Text>
            <Text style={styles.statLabel}>Lessons</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          <View style={styles.settingsList}>
            <View style={styles.settingItem}>
              <Text style={styles.settingLabel}>Notifications</Text>
              <Text style={styles.settingValue}>On</Text>
            </View>
            <View style={styles.settingItem}>
              <Text style={styles.settingLabel}>Daily Goal</Text>
              <Text style={styles.settingValue}>10 min/day</Text>
            </View>
            <View style={styles.settingItem}>
              <Text style={styles.settingLabel}>Theme</Text>
              <Text style={styles.settingValue}>System</Text>
            </View>
            <View style={styles.settingItem}>
              <Text style={styles.settingLabel}>Language</Text>
              <Text style={styles.settingValue}>Vietnamese</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.logoutBtn}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: { alignItems: 'center', paddingTop: 32, paddingBottom: 24 },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#6366F1', justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  avatarText: { color: '#FFF', fontSize: 32, fontWeight: '700' },
  name: { fontSize: 22, fontWeight: '700', color: '#1E293B' },
  email: { fontSize: 14, color: '#64748B', marginTop: 4 },
  level: { fontSize: 13, color: '#6366F1', fontWeight: '500', marginTop: 4 },
  statsRow: { flexDirection: 'row', marginHorizontal: 20, backgroundColor: '#FFF', borderRadius: 16, padding: 16, borderWidth: 1, borderColor: '#E2E8F0' },
  stat: { flex: 1, alignItems: 'center' },
  statValue: { fontSize: 22, fontWeight: '700' },
  statLabel: { fontSize: 12, color: '#64748B', marginTop: 2 },
  section: { marginTop: 24, paddingHorizontal: 20 },
  sectionTitle: { fontSize: 16, fontWeight: '600', color: '#1E293B', marginBottom: 12 },
  settingsList: { backgroundColor: '#FFF', borderRadius: 16, borderWidth: 1, borderColor: '#E2E8F0', overflow: 'hidden' },
  settingItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  settingLabel: { fontSize: 15, color: '#334155' },
  settingValue: { fontSize: 14, color: '#64748B' },
  logoutBtn: { marginHorizontal: 20, marginTop: 24, marginBottom: 40, backgroundColor: '#FEE2E2', paddingVertical: 16, borderRadius: 12, alignItems: 'center' },
  logoutText: { fontSize: 16, fontWeight: '600', color: '#DC2626' },
});
