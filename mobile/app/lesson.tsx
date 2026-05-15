import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const vocabulary = [
  { word: 'Hello', reading: '', meaning: 'Xin chào', example: 'Hello, how are you?' },
  { word: 'Thank you', reading: '', meaning: 'Cảm ơn', example: 'Thank you for your help.' },
  { word: 'Goodbye', reading: '', meaning: 'Tạm biệt', example: 'Goodbye, see you tomorrow!' },
  { word: 'Please', reading: '', meaning: 'Làm ơn', example: 'Please sit down.' },
  { word: 'Sorry', reading: '', meaning: 'Xin lỗi', example: 'Sorry, I am late.' },
  { word: 'Good morning', reading: '', meaning: 'Chào buổi sáng', example: 'Good morning, teacher!' },
];

export default function LessonScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.flag}>🇬🇧</Text>
          <View>
            <Text style={styles.title}>Greetings & Introductions</Text>
            <Text style={styles.subtitle}>English • Beginner • 15 XP</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Vocabulary</Text>
          {vocabulary.map((item, i) => (
            <View key={i} style={styles.vocabCard}>
              <View style={styles.vocabHeader}>
                <Text style={styles.vocabWord}>{item.word}</Text>
                <TouchableOpacity style={styles.speakBtn}>
                  <Text>🔊</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.vocabMeaning}>{item.meaning}</Text>
              <Text style={styles.vocabExample}>{item.example}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Grammar Note</Text>
          <View style={styles.grammarCard}>
            <Text style={styles.grammarTitle}>Basic Greetings</Text>
            <Text style={styles.grammarText}>
              In English, we use different greetings depending on the time of day:{'\n\n'}
              • Good morning (before noon){'\n'}
              • Good afternoon (noon to 6pm){'\n'}
              • Good evening (after 6pm){'\n'}
              • Good night (when going to sleep)
            </Text>
          </View>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity style={styles.practiceBtn}>
            <Text style={styles.practiceBtnText}>🃏 Practice Flashcards</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quizBtn}>
            <Text style={styles.quizBtnText}>❓ Take Quiz</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.completeBtn}>
            <Text style={styles.completeBtnText}>✓ Mark as Complete</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 20, paddingTop: 20, paddingBottom: 16 },
  flag: { fontSize: 36 },
  title: { fontSize: 20, fontWeight: '700', color: '#1E293B' },
  subtitle: { fontSize: 13, color: '#64748B', marginTop: 2 },
  section: { paddingHorizontal: 20, marginTop: 16 },
  sectionTitle: { fontSize: 16, fontWeight: '600', color: '#1E293B', marginBottom: 12 },
  vocabCard: { backgroundColor: '#FFF', padding: 14, borderRadius: 12, marginBottom: 8, borderWidth: 1, borderColor: '#E2E8F0' },
  vocabHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  vocabWord: { fontSize: 17, fontWeight: '600', color: '#1E293B' },
  speakBtn: { padding: 4 },
  vocabMeaning: { fontSize: 14, color: '#6366F1', fontWeight: '500', marginTop: 4 },
  vocabExample: { fontSize: 13, color: '#64748B', fontStyle: 'italic', marginTop: 4 },
  grammarCard: { backgroundColor: '#FFF', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0' },
  grammarTitle: { fontSize: 15, fontWeight: '600', color: '#1E293B', marginBottom: 8 },
  grammarText: { fontSize: 14, color: '#475569', lineHeight: 22 },
  actions: { paddingHorizontal: 20, marginTop: 24, marginBottom: 32, gap: 10 },
  practiceBtn: { backgroundColor: '#EEF2FF', paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  practiceBtnText: { fontSize: 15, fontWeight: '600', color: '#6366F1' },
  quizBtn: { backgroundColor: '#FFF7ED', paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  quizBtnText: { fontSize: 15, fontWeight: '600', color: '#EA580C' },
  completeBtn: { backgroundColor: '#22C55E', paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  completeBtnText: { fontSize: 15, fontWeight: '600', color: '#FFF' },
});
