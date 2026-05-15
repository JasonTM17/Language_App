import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';

const sampleCards = [
  { id: '1', word: 'Hello', meaning: 'Xin chào', example: 'Hello, how are you?' },
  { id: '2', word: 'Thank you', meaning: 'Cảm ơn', example: 'Thank you for your help.' },
  { id: '3', word: 'Goodbye', meaning: 'Tạm biệt', example: 'Goodbye, see you tomorrow!' },
  { id: '4', word: 'こんにちは', meaning: 'Xin chào', example: 'こんにちは、元気ですか？' },
  { id: '5', word: '你好', meaning: 'Xin chào', example: '你好，你叫什么名字？' },
];

export default function FlashcardsScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [stats, setStats] = useState({ known: 0, unknown: 0 });

  const card = sampleCards[currentIndex];

  const handleReview = (known: boolean) => {
    setStats(prev => ({ known: prev.known + (known ? 1 : 0), unknown: prev.unknown + (known ? 0 : 1) }));
    setFlipped(false);
    if (currentIndex < sampleCards.length - 1) setCurrentIndex(prev => prev + 1);
  };

  if (currentIndex >= sampleCards.length) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.center}>
          <Text style={{ fontSize: 60 }}>🎉</Text>
          <Text style={styles.title}>Session Complete!</Text>
          <Text style={styles.subtitle}>Known: {stats.known} | Review: {stats.unknown}</Text>
          <TouchableOpacity style={styles.primaryBtn} onPress={() => { setCurrentIndex(0); setStats({ known: 0, unknown: 0 }); }}>
            <Text style={styles.primaryBtnText}>Practice Again</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Flashcards</Text>
        <Text style={styles.counter}>{currentIndex + 1}/{sampleCards.length}</Text>
      </View>

      {/* Progress */}
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${(currentIndex / sampleCards.length) * 100}%` }]} />
      </View>

      {/* Card */}
      <TouchableOpacity style={styles.card} onPress={() => setFlipped(!flipped)} activeOpacity={0.9}>
        {!flipped ? (
          <View style={styles.cardContent}>
            <Text style={styles.cardWord}>{card.word}</Text>
            <Text style={styles.tapHint}>Tap to reveal</Text>
          </View>
        ) : (
          <View style={[styles.cardContent, styles.cardBack]}>
            <Text style={styles.cardMeaning}>{card.meaning}</Text>
            <Text style={styles.cardExample}>{card.example}</Text>
          </View>
        )}
      </TouchableOpacity>

      {/* Actions */}
      <View style={styles.actions}>
        <TouchableOpacity style={[styles.actionBtn, styles.unknownBtn]} onPress={() => handleReview(false)}>
          <Text style={styles.unknownText}>✗ Don't Know</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionBtn, styles.knownBtn]} onPress={() => handleReview(true)}>
          <Text style={styles.knownText}>✓ Know It</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 16 },
  headerTitle: { fontSize: 20, fontWeight: '700', color: '#1E293B' },
  counter: { fontSize: 14, color: '#64748B' },
  title: { fontSize: 24, fontWeight: '700', color: '#1E293B', marginTop: 16 },
  subtitle: { fontSize: 16, color: '#64748B', marginTop: 8 },
  progressBar: { height: 4, backgroundColor: '#E2E8F0', marginHorizontal: 20, marginTop: 12, borderRadius: 2 },
  progressFill: { height: '100%', backgroundColor: '#6366F1', borderRadius: 2 },
  card: { flex: 1, marginHorizontal: 20, marginVertical: 24, borderRadius: 24, backgroundColor: '#FFF', borderWidth: 2, borderColor: '#E2E8F0', justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 12, elevation: 5 },
  cardContent: { alignItems: 'center', padding: 32 },
  cardBack: { backgroundColor: '#F0F4FF' },
  cardWord: { fontSize: 36, fontWeight: '700', color: '#1E293B', textAlign: 'center' },
  cardMeaning: { fontSize: 28, fontWeight: '700', color: '#6366F1', textAlign: 'center' },
  cardExample: { fontSize: 16, color: '#64748B', marginTop: 16, textAlign: 'center', fontStyle: 'italic' },
  tapHint: { fontSize: 14, color: '#94A3B8', marginTop: 16 },
  actions: { flexDirection: 'row', paddingHorizontal: 20, paddingBottom: 24, gap: 12 },
  actionBtn: { flex: 1, paddingVertical: 16, borderRadius: 12, alignItems: 'center' },
  unknownBtn: { borderWidth: 2, borderColor: '#FCA5A5', backgroundColor: '#FEF2F2' },
  knownBtn: { backgroundColor: '#22C55E' },
  unknownText: { fontSize: 16, fontWeight: '600', color: '#DC2626' },
  knownText: { fontSize: 16, fontWeight: '600', color: '#FFF' },
  primaryBtn: { marginTop: 24, backgroundColor: '#6366F1', paddingHorizontal: 32, paddingVertical: 14, borderRadius: 12 },
  primaryBtnText: { color: '#FFF', fontSize: 16, fontWeight: '600' },
});
