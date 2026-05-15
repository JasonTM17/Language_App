import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProgressScreen() {
  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const activity = [3, 5, 2, 7, 4, 1, 6];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Your Progress</Text>

        {/* Stats */}
        <View style={styles.statsGrid}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>2</Text>
            <Text style={styles.statLabel}>Level</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={[styles.statValue, { color: '#F59E0B' }]}>7</Text>
            <Text style={styles.statLabel}>Streak</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={[styles.statValue, { color: '#6366F1' }]}>120</Text>
            <Text style={styles.statLabel}>XP</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={[styles.statValue, { color: '#22C55E' }]}>5</Text>
            <Text style={styles.statLabel}>Lessons</Text>
          </View>
        </View>

        {/* Weekly Chart */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Weekly Activity</Text>
          <View style={styles.chart}>
            {weekDays.map((day, i) => (
              <View key={day} style={styles.chartCol}>
                <View style={styles.barContainer}>
                  <View style={[styles.bar, { height: `${(activity[i] / 7) * 100}%` }]} />
                </View>
                <Text style={styles.dayLabel}>{day}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Level Progress */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Level Progress</Text>
          <View style={styles.levelRow}>
            <View style={styles.levelBadge}>
              <Text style={styles.levelNum}>2</Text>
            </View>
            <View style={styles.levelInfo}>
              <Text style={styles.levelText}>Level 2</Text>
              <Text style={styles.levelSub}>20/100 XP to next level</Text>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: '20%' }]} />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  title: { fontSize: 22, fontWeight: '700', color: '#1E293B', paddingHorizontal: 20, paddingTop: 20 },
  statsGrid: { flexDirection: 'row', paddingHorizontal: 20, gap: 8, marginTop: 16 },
  statBox: { flex: 1, backgroundColor: '#FFF', padding: 14, borderRadius: 12, alignItems: 'center', borderWidth: 1, borderColor: '#E2E8F0' },
  statValue: { fontSize: 22, fontWeight: '700', color: '#1E293B' },
  statLabel: { fontSize: 11, color: '#64748B', marginTop: 2 },
  card: { marginHorizontal: 20, marginTop: 16, backgroundColor: '#FFF', borderRadius: 16, padding: 16, borderWidth: 1, borderColor: '#E2E8F0' },
  cardTitle: { fontSize: 16, fontWeight: '600', color: '#1E293B', marginBottom: 16 },
  chart: { flexDirection: 'row', justifyContent: 'space-between', height: 120 },
  chartCol: { flex: 1, alignItems: 'center' },
  barContainer: { flex: 1, justifyContent: 'flex-end', width: 20 },
  bar: { width: '100%', backgroundColor: '#6366F1', borderRadius: 4 },
  dayLabel: { fontSize: 11, color: '#64748B', marginTop: 6 },
  levelRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  levelBadge: { width: 48, height: 48, borderRadius: 12, backgroundColor: '#6366F1', justifyContent: 'center', alignItems: 'center' },
  levelNum: { color: '#FFF', fontSize: 20, fontWeight: '700' },
  levelInfo: { flex: 1 },
  levelText: { fontSize: 15, fontWeight: '600', color: '#1E293B' },
  levelSub: { fontSize: 12, color: '#64748B', marginTop: 2 },
  progressBar: { height: 6, backgroundColor: '#E2E8F0', borderRadius: 3, marginTop: 8 },
  progressFill: { height: '100%', backgroundColor: '#6366F1', borderRadius: 3 },
});
