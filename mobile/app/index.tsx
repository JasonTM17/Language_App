import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧', lessons: 12 },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵', lessons: 10 },
  { code: 'zh', name: 'Chinese', flag: '🇨🇳', lessons: 10 },
  { code: 'ko', name: 'Korean', flag: '🇰🇷', lessons: 10 },
];

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Welcome back 👋</Text>
            <Text style={styles.name}>Nguyen Van A</Text>
          </View>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>N</Text>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={[styles.statCard, { backgroundColor: '#FFF3E0' }]}>
            <Text style={styles.statIcon}>🔥</Text>
            <Text style={styles.statValue}>7</Text>
            <Text style={styles.statLabel}>Streak</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: '#E3F2FD' }]}>
            <Text style={styles.statIcon}>⭐</Text>
            <Text style={styles.statValue}>120</Text>
            <Text style={styles.statLabel}>XP</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: '#E8F5E9' }]}>
            <Text style={styles.statIcon}>📚</Text>
            <Text style={styles.statValue}>5</Text>
            <Text style={styles.statLabel}>Lessons</Text>
          </View>
        </View>

        {/* Today's Goal */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today&apos;s Goal</Text>
          <View style={styles.goalCard}>
            <View style={styles.goalRow}>
              <Text style={styles.goalText}>Complete 1 lesson</Text>
              <Text style={styles.goalProgress}>0/1</Text>
            </View>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '0%' }]} />
            </View>
          </View>
        </View>

        {/* Languages */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Languages</Text>
          {languages.map((lang) => (
            <TouchableOpacity key={lang.code} style={styles.langCard}>
              <Text style={styles.langFlag}>{lang.flag}</Text>
              <View style={styles.langInfo}>
                <Text style={styles.langName}>{lang.name}</Text>
                <Text style={styles.langLessons}>{lang.lessons} lessons</Text>
              </View>
              <Text style={styles.arrow}>→</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            <TouchableOpacity style={[styles.actionCard, { backgroundColor: '#EDE7F6' }]}>
              <Text style={styles.actionIcon}>🃏</Text>
              <Text style={styles.actionLabel}>Flashcards</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionCard, { backgroundColor: '#FCE4EC' }]}>
              <Text style={styles.actionIcon}>❓</Text>
              <Text style={styles.actionLabel}>Quiz</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionCard, { backgroundColor: '#E0F7FA' }]}>
              <Text style={styles.actionIcon}>🤖</Text>
              <Text style={styles.actionLabel}>AI Tutor</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionCard, { backgroundColor: '#FFF8E1' }]}>
              <Text style={styles.actionIcon}>🎙️</Text>
              <Text style={styles.actionLabel}>Speak</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 20, paddingBottom: 10 },
  greeting: { fontSize: 14, color: '#64748B' },
  name: { fontSize: 22, fontWeight: '700', color: '#1E293B', marginTop: 2 },
  avatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#6366F1', justifyContent: 'center', alignItems: 'center' },
  avatarText: { color: '#FFF', fontSize: 18, fontWeight: '600' },
  statsRow: { flexDirection: 'row', paddingHorizontal: 20, gap: 12, marginTop: 16 },
  statCard: { flex: 1, padding: 16, borderRadius: 16, alignItems: 'center' },
  statIcon: { fontSize: 24, marginBottom: 4 },
  statValue: { fontSize: 20, fontWeight: '700', color: '#1E293B' },
  statLabel: { fontSize: 12, color: '#64748B', marginTop: 2 },
  section: { paddingHorizontal: 20, marginTop: 24 },
  sectionTitle: { fontSize: 18, fontWeight: '600', color: '#1E293B', marginBottom: 12 },
  goalCard: { backgroundColor: '#FFF', padding: 16, borderRadius: 16, borderWidth: 1, borderColor: '#E2E8F0' },
  goalRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  goalText: { fontSize: 14, fontWeight: '500', color: '#334155' },
  goalProgress: { fontSize: 14, color: '#64748B' },
  progressBar: { height: 8, backgroundColor: '#E2E8F0', borderRadius: 4 },
  progressFill: { height: '100%', backgroundColor: '#6366F1', borderRadius: 4 },
  langCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', padding: 16, borderRadius: 16, marginBottom: 8, borderWidth: 1, borderColor: '#E2E8F0' },
  langFlag: { fontSize: 32, marginRight: 12 },
  langInfo: { flex: 1 },
  langName: { fontSize: 16, fontWeight: '600', color: '#1E293B' },
  langLessons: { fontSize: 12, color: '#64748B', marginTop: 2 },
  arrow: { fontSize: 18, color: '#94A3B8' },
  actionsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  actionCard: { width: '47%', padding: 20, borderRadius: 16, alignItems: 'center' },
  actionIcon: { fontSize: 28, marginBottom: 8 },
  actionLabel: { fontSize: 13, fontWeight: '500', color: '#334155' },
});
