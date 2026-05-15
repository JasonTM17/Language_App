import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';

const questions = [
  { id: '1', question: 'What does "Hello" mean?', options: ['Tạm biệt', 'Xin chào', 'Cảm ơn', 'Xin lỗi'], answer: 'Xin chào' },
  { id: '2', question: 'Which greeting is for morning?', options: ['Good night', 'Good morning', 'Good evening', 'Goodbye'], answer: 'Good morning' },
  { id: '3', question: 'What does こんにちは mean?', options: ['Goodbye', 'Thank you', 'Hello', 'Sorry'], answer: 'Hello' },
  { id: '4', question: '"谢谢" means...', options: ['Hello', 'Thank you', 'Goodbye', 'Sorry'], answer: 'Thank you' },
  { id: '5', question: '"감사합니다" means...', options: ['Hello', 'Sorry', 'Thank you', 'Goodbye'], answer: 'Thank you' },
];

export default function QuizScreen() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const q = questions[current];

  const handleSelect = (option: string) => {
    if (showResult) return;
    setSelected(option);
    setShowResult(true);
    if (option === q.answer) setScore(s => s + 1);
  };

  const next = () => {
    if (current < questions.length - 1) {
      setCurrent(c => c + 1);
      setSelected(null);
      setShowResult(false);
    } else {
      setFinished(true);
    }
  };

  if (finished) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.center}>
          <Text style={{ fontSize: 60 }}>{pct >= 80 ? '🏆' : '💪'}</Text>
          <Text style={styles.title}>Quiz Complete!</Text>
          <Text style={styles.scoreText}>{score}/{questions.length} correct ({pct}%)</Text>
          <TouchableOpacity style={styles.primaryBtn} onPress={() => { setCurrent(0); setScore(0); setFinished(false); setSelected(null); setShowResult(false); }}>
            <Text style={styles.primaryBtnText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Quiz</Text>
        <Text style={styles.counter}>{current + 1}/{questions.length}</Text>
      </View>

      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${((current + 1) / questions.length) * 100}%` }]} />
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.question}>{q.question}</Text>

        <View style={styles.options}>
          {q.options.map((opt) => {
            let bg = '#FFF';
            let border = '#E2E8F0';
            if (showResult) {
              if (opt === q.answer) { bg = '#DCFCE7'; border = '#22C55E'; }
              else if (opt === selected) { bg = '#FEE2E2'; border = '#EF4444'; }
            } else if (opt === selected) {
              bg = '#EEF2FF'; border = '#6366F1';
            }
            return (
              <TouchableOpacity key={opt} style={[styles.option, { backgroundColor: bg, borderColor: border }]} onPress={() => handleSelect(opt)} disabled={showResult}>
                <Text style={styles.optionText}>{opt}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {showResult && (
          <View style={[styles.feedback, { backgroundColor: selected === q.answer ? '#DCFCE7' : '#FEE2E2' }]}>
            <Text style={styles.feedbackText}>
              {selected === q.answer ? '✓ Correct!' : `✗ Answer: ${q.answer}`}
            </Text>
          </View>
        )}
      </ScrollView>

      {showResult && (
        <View style={styles.footer}>
          <TouchableOpacity style={styles.primaryBtn} onPress={next}>
            <Text style={styles.primaryBtnText}>{current < questions.length - 1 ? 'Next →' : 'See Results'}</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 16 },
  headerTitle: { fontSize: 20, fontWeight: '700', color: '#1E293B' },
  counter: { fontSize: 14, color: '#64748B', fontWeight: '500' },
  progressBar: { height: 4, backgroundColor: '#E2E8F0', marginHorizontal: 20, marginTop: 12, borderRadius: 2 },
  progressFill: { height: '100%', backgroundColor: '#6366F1', borderRadius: 2 },
  content: { flex: 1, padding: 20 },
  question: { fontSize: 20, fontWeight: '600', color: '#1E293B', marginBottom: 24, lineHeight: 28 },
  options: { gap: 12 },
  option: { padding: 16, borderRadius: 12, borderWidth: 2 },
  optionText: { fontSize: 16, fontWeight: '500', color: '#1E293B' },
  feedback: { marginTop: 16, padding: 12, borderRadius: 12 },
  feedbackText: { fontSize: 14, fontWeight: '600', color: '#1E293B' },
  footer: { padding: 20 },
  title: { fontSize: 24, fontWeight: '700', color: '#1E293B', marginTop: 16 },
  scoreText: { fontSize: 16, color: '#64748B', marginTop: 8 },
  primaryBtn: { backgroundColor: '#6366F1', paddingHorizontal: 32, paddingVertical: 16, borderRadius: 12, width: '100%', alignItems: 'center', marginTop: 16 },
  primaryBtnText: { color: '#FFF', fontSize: 16, fontWeight: '600' },
});
